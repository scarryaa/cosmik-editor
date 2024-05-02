// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command

use std::env;
use std::fs::{self, DirEntry};
use std::path::Path;
use std::path::PathBuf;
use tauri::menu::*;
use tauri::AppHandle;
use tauri::Manager;
use tauri_plugin_dialog::DialogExt;
use tauri_plugin_dialog::FileResponse;
use tauri_plugin_dialog::MessageDialogKind;
use tauri_plugin_shell::ShellExt;

#[derive(serde::Serialize)]
struct FileItem {
    name: String,
    is_folder: bool,
    children: Option<Vec<FileItem>>,
}

fn dir_entry_to_file_item(entry: DirEntry) -> Result<FileItem, String> {
    let path = entry.path();
    let name = entry
        .file_name()
        .into_string()
        .map_err(|os_string| format!("Failed to convert OsString to String: {:?}", os_string))?;
    let is_folder = path.is_dir();

    let children = if is_folder {
        let children_results: Result<Vec<_>, String> = fs::read_dir(path)
            .map_err(|e| e.to_string())?
            .map(|res| {
                res.map_err(|e| e.to_string())
                    .and_then(dir_entry_to_file_item)
            })
            .collect();
        Some(children_results?)
    } else {
        None
    };

    Ok(FileItem {
        name,
        is_folder,
        children,
    })
}

// Commands

#[tauri::command]
fn get_root_folder_name(path: String) -> Result<PathBuf, String> {
    let current_dir = env::current_dir().map_err(|err| err.to_string())?;
    let last_folder = current_dir
        .file_name()
        .ok_or_else(|| "No path provided".to_string())?;
    Ok(last_folder.into())
}

#[tauri::command]
fn list_files_in_dir(path: String) -> Result<Vec<FileItem>, String> {
    let path = Path::new(&path);
    if !path.is_dir() {
        return Err("Path is not a directory".to_string());
    }

    let entries_results: Result<Vec<_>, String> = fs::read_dir(path)
        .map_err(|e| e.to_string())?
        .map(|res| {
            res.map_err(|e| e.to_string())
                .and_then(dir_entry_to_file_item)
        })
        .collect();

    entries_results
}

// Handlers

fn new_file(app: &AppHandle) -> std::io::Result<()> {
    println!("New file");
    Ok(())
}

fn open_file(app: &AppHandle) -> std::io::Result<()> {
    Ok(())
}

fn open_folder(app: &AppHandle) -> Result<(), std::io::Error> {
    let app_clone = app.clone();
    app.dialog().file().pick_folder(move |folder_path| {
        if let Some(ref path) = folder_path {
            app_clone.emit("open-folder", { folder_path })
                .map_err(|_| std::io::Error::new(std::io::ErrorKind::Other, "open-folder failed"));
        };
    });
    Ok(())
}

fn save_file(app: &AppHandle) -> std::io::Result<()> {
    Ok(())
}

fn save_as_file(app: &AppHandle) -> std::io::Result<()> {
    Ok(())
}

fn quit(app: &AppHandle) -> std::io::Result<()> {
    app.exit(0);
    Ok(())
}

fn undo(app: &AppHandle) -> std::io::Result<()> {
    Ok(())
}

fn redo(app: &AppHandle) -> std::io::Result<()> {
    Ok(())
}

fn cut(app: &AppHandle) -> std::io::Result<()> {
    app.emit("cut", {})
        .map_err(|_| std::io::Error::new(std::io::ErrorKind::Other, "cut failed"))
}

fn copy(app: &AppHandle) -> std::io::Result<()> {
    app.emit("copy", {})
        .map_err(|_| std::io::Error::new(std::io::ErrorKind::Other, "copy failed"))
}

fn paste(app: &AppHandle) -> std::io::Result<()> {
    app.emit("paste", {})
        .map_err(|_| std::io::Error::new(std::io::ErrorKind::Other, "paste failed"))
}

fn select_all(app: &AppHandle) -> std::io::Result<()> {
    app.emit("select-all", {})
        .map_err(|_| std::io::Error::new(std::io::ErrorKind::Other, "select-all failed"))
}

fn toggle_fullscreen(app: &AppHandle) -> std::io::Result<()> {
    let window = app.get_webview_window("main").ok_or(std::io::Error::new(
        std::io::ErrorKind::Other,
        "Could not get main window",
    ))?;
    window
        .set_fullscreen(!window.is_fullscreen().unwrap())
        .expect("Could not toggle fullscreen");
    Ok(())
}

fn toggle_dev_tools(app: &AppHandle) -> std::io::Result<()> {
    let window = app.get_webview_window("main").ok_or(std::io::Error::new(
        std::io::ErrorKind::Other,
        "Could not get main window",
    ))?;
    if window.is_devtools_open() {
        window.close_devtools();
    } else {
        window.open_devtools();
    }
    Ok(())
}

fn toggle_sidebar(app: &AppHandle) -> std::io::Result<()> {
    Ok(())
}

fn reload(app: &AppHandle) -> std::io::Result<()> {
    app.restart();
    Ok(())
}

fn check_for_updates(app: &AppHandle) -> std::io::Result<()> {
    Ok(())
}

fn report_issue(app: &AppHandle) -> std::io::Result<()> {
    // Open an issue on GitHub
    let url = "google.com";
    let _ = app.shell().open(url, Option::default());
    Ok(())
}

fn about(app: &AppHandle) -> std::io::Result<()> {
    app.dialog()
        .message("Version 0.0.1")
        .kind(MessageDialogKind::Info)
        .title("About meteor")
        .ok_button_label("OK")
        .show(|result| match result {
            true => println!("User clicked OK"),
            false => println!("User clicked Cancel"),
        });
    Ok(())
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_clipboard_manager::init())
        .plugin(tauri_plugin_shell::init())
        .plugin(tauri_plugin_dialog::init())
        .invoke_handler(tauri::generate_handler![
            get_root_folder_name,
            list_files_in_dir
        ])
        .setup(move |app| {
            let handle = app.handle();
            let menu = Menu::new(handle)?;
            let submenu = SubmenuBuilder::new(handle, "File")
                .items(&[
                    &MenuItem::with_id(handle, "new_menu_item", "New", true, Some("CmdOrCtrl+N"))?,
                    &MenuItem::with_id(
                        handle,
                        "open_menu_item",
                        "Open File",
                        true,
                        Some("CmdOrCtrl+O"),
                    )?,
                    &MenuItem::with_id(
                        handle,
                        "open_folder_menu_item",
                        "Open Folder",
                        true,
                        Some("CmdOrCtrl+Shift+O"),
                    )?,
                    &PredefinedMenuItem::separator(handle)?,
                    &MenuItem::with_id(
                        handle,
                        "save_menu_item",
                        "Save",
                        true,
                        Some("CmdOrCtrl+S"),
                    )?,
                    &MenuItem::with_id(
                        handle,
                        "save_as_menu_item",
                        "Save As",
                        true,
                        Some("CmdOrCtrl+Shift+S"),
                    )?,
                    &PredefinedMenuItem::separator(handle)?,
                    &MenuItem::with_id(
                        handle,
                        "quit_menu_item",
                        "Quit",
                        true,
                        Some("CmdOrCtrl+Q"),
                    )?,
                ])
                .build()?;

            let submenu2 = SubmenuBuilder::new(handle, "Edit")
                .items(&[
                    &MenuItem::with_id(
                        handle,
                        "undo_menu_item",
                        "Undo",
                        true,
                        Some("CmdOrCtrl+Z"),
                    )?,
                    &MenuItem::with_id(
                        handle,
                        "redo_menu_item",
                        "Redo",
                        true,
                        Some("CmdOrCtrl+Shift+Z"),
                    )?,
                    &PredefinedMenuItem::separator(handle)?,
                    &MenuItem::with_id(handle, "cut_menu_item", "Cut", true, Some("CmdOrCtrl+X"))?,
                    &MenuItem::with_id(
                        handle,
                        "copy_menu_item",
                        "Copy",
                        true,
                        Some("CmdOrCtrl+C"),
                    )?,
                    &MenuItem::with_id(
                        handle,
                        "paste_menu_item",
                        "Paste",
                        true,
                        Some("CmdOrCtrl+V"),
                    )?,
                    &PredefinedMenuItem::separator(handle)?,
                    &MenuItem::with_id(
                        handle,
                        "select_all_menu_item",
                        "Select All",
                        true,
                        Some("CmdOrCtrl+A"),
                    )?,
                ])
                .build()?;

            let submenu3 = SubmenuBuilder::new(handle, "View")
                .items(&[
                    &MenuItem::with_id(
                        handle,
                        "reload_menu_item",
                        "Reload",
                        true,
                        Some("CmdOrCtrl+R"),
                    )?,
                    &PredefinedMenuItem::separator(handle)?,
                    &MenuItem::with_id(
                        handle,
                        "toggle_fullscreen_menu_item",
                        "Toggle Fullscreen",
                        true,
                        Some("F11"),
                    )?,
                    &MenuItem::with_id(
                        handle,
                        "toggle_developer_tools_menu_item",
                        "Toggle Developer Tools",
                        true,
                        Some("F12"),
                    )?,
                    &MenuItem::with_id(
                        handle,
                        "toggle_sidebar_menu_item",
                        "Toggle Sidebar",
                        true,
                        Some("CmdOrCtrl+Shift+S"),
                    )?,
                ])
                .build()?;

            let submenu4 = SubmenuBuilder::new(handle, "Help")
                .items(&[
                    &MenuItem::with_id(handle, "about_menu_item", "About", true, Some("F1"))?,
                    &PredefinedMenuItem::separator(handle)?,
                    &MenuItem::with_id(
                        handle,
                        "check_for_updates_menu_item",
                        "Check for Updates",
                        true,
                        Some("CmdOrCtrl+Shift+U"),
                    )?,
                    &MenuItem::with_id(
                        handle,
                        "report_issue_menu_item",
                        "Report Issue",
                        true,
                        Some("CmdOrCtrl+Shift+I"),
                    )?,
                ])
                .build()?;

            menu.append(&submenu)?;
            menu.append(&submenu2)?;
            menu.append(&submenu3)?;
            menu.append(&submenu4)?;

            app.set_menu(menu).expect("Could not set menu");

            app.on_menu_event(move |app, event| {
                if event.id() == "new_menu_item" {
                    new_file(app).expect("Could not create new file");
                } else if event.id() == "open_menu_item" {
                    open_file(app).expect("Could not open file");
                } else if event.id() == "open_folder_menu_item" {
                    open_folder(app).expect("Could not open folder");
                } else if event.id() == "save_menu_item" {
                    save_file(app).expect("Could not save file");
                } else if event.id() == "save_as_menu_item" {
                    save_as_file(app).expect("Could not save as file");
                } else if event.id() == "quit_menu_item" {
                    quit(app).expect("Could not quit");
                } else if event.id() == "undo_menu_item" {
                    undo(app).expect("Could not undo");
                } else if event.id() == "redo_menu_item" {
                    redo(app).expect("Could not redo");
                } else if event.id() == "cut_menu_item" {
                    cut(app).expect("Could not cut");
                } else if event.id() == "copy_menu_item" {
                    copy(app).expect("Could not copy");
                } else if event.id() == "paste_menu_item" {
                    paste(app).expect("Could not paste");
                } else if event.id() == "select_all_menu_item" {
                    select_all(app).expect("Could not select all");
                } else if event.id() == "toggle_fullscreen_menu_item" {
                    toggle_fullscreen(app).expect("Could not toggle fullscreen");
                } else if event.id() == "toggle_developer_tools_menu_item" {
                    toggle_dev_tools(app).expect("Could not toggle developer tools");
                } else if event.id() == "toggle_sidebar_menu_item" {
                    toggle_sidebar(app).expect("Could not toggle sidebar");
                } else if event.id() == "reload_menu_item" {
                    reload(app).expect("Could not reload app");
                } else if event.id() == "check_for_updates_menu_item" {
                    check_for_updates(app).expect("Could not check for updates");
                } else if event.id() == "report_issue_menu_item" {
                    report_issue(app).expect("Could not report issue");
                } else if event.id() == "about_menu_item" {
                    about(app).expect("Could not show about dialog");
                }
            });
            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("An error occurred while running Tauri application");
}
