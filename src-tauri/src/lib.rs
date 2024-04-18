// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command

use tauri::menu::*;
use tauri::AppHandle;
use tauri::Manager;
use tauri_plugin_dialog::DialogExt;
use tauri_plugin_dialog::MessageDialogKind;
use tauri_plugin_shell::ShellExt;

#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

fn new_file() -> std::io::Result<()> {
    println!("New file");
    Ok(())
}

fn open_file() -> std::io::Result<()> {
    Ok(())
}

fn save_file() -> std::io::Result<()> {
    Ok(())
}

fn save_as_file() -> std::io::Result<()> {
    Ok(())
}

fn quit() -> std::io::Result<()> {
    std::process::exit(0);
}

fn undo() -> std::io::Result<()> {
    Ok(())
}

fn redo() -> std::io::Result<()> {
    Ok(())
}

fn cut() -> std::io::Result<()> {
    Ok(())
}

fn copy() -> std::io::Result<()> {
    Ok(())
}

fn paste() -> std::io::Result<()> {
    Ok(())
}

fn select_all() -> std::io::Result<()> {
    Ok(())
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

fn toggle_sidebar() -> std::io::Result<()> {
    Ok(())
}

fn reload(app: &AppHandle) -> std::io::Result<()> {
    app.restart();
    Ok(())
}

fn check_for_updates() -> std::io::Result<()> {
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
        .title("About cosmik-editor")
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
        .plugin(tauri_plugin_shell::init())
        .plugin(tauri_plugin_dialog::init())
        .invoke_handler(tauri::generate_handler![greet])
        .setup(move |app| {
            let handle = app.handle();
            let menu = Menu::new(handle)?;
            let submenu = SubmenuBuilder::new(handle, "File")
                .items(&[
                    &MenuItem::with_id(handle, "new_menu_item", "New", true, Some("CmdOrCtrl+N"))?,
                    &MenuItem::with_id(
                        handle,
                        "open_menu_item",
                        "Open",
                        true,
                        Some("CmdOrCtrl+O"),
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
                    new_file().expect("Could not create new file");
                } else if event.id() == "open_menu_item" {
                    open_file().expect("Could not open file");
                } else if event.id() == "save_menu_item" {
                    save_file().expect("Could not save file");
                } else if event.id() == "save_as_menu_item" {
                    save_as_file().expect("Could not save as file");
                } else if event.id() == "quit_menu_item" {
                    quit().expect("Could not quit");
                } else if event.id() == "undo_menu_item" {
                    undo().expect("Could not undo");
                } else if event.id() == "redo_menu_item" {
                    redo().expect("Could not redo");
                } else if event.id() == "cut_menu_item" {
                    cut().expect("Could not cut");
                } else if event.id() == "copy_menu_item" {
                    copy().expect("Could not copy");
                } else if event.id() == "paste_menu_item" {
                    paste().expect("Could not paste");
                } else if event.id() == "select_all_menu_item" {
                    select_all().expect("Could not select all");
                } else if event.id() == "toggle_fullscreen_menu_item" {
                    toggle_fullscreen(app).expect("Could not toggle fullscreen");
                } else if event.id() == "toggle_developer_tools_menu_item" {
                    toggle_dev_tools(app).expect("Could not toggle developer tools");
                } else if event.id() == "toggle_sidebar_menu_item" {
                    toggle_sidebar().expect("Could not toggle sidebar");
                } else if event.id() == "reload_menu_item" {
                    reload(app).expect("Could not reload app");
                } else if event.id() == "check_for_updates_menu_item" {
                    check_for_updates().expect("Could not check for updates");
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
