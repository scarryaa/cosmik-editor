const __vite__fileDeps=["./angular-html-CCA6uK5u.js","./html-Eq4sA2a8.js","./javascript-C67l1L3o.js","./css-DoNn9y_q.js","./angular-ts-BdzUJqpd.js","./scss-Ce0o3RlH.js","./apl-C9W6vCle.js","./xml-CGBdWXsr.js","./java-D1WhEMP8.js","./json-B3_XiHYH.js","./asciidoc-sdyL2GNQ.js","./yaml-CdzeB0Js.js","./csv-SV4Sx2_F.js","./c-RparLEUA.js","./clojure-DUldyaQj.js","./coffee-CI2tvHVN.js","./cpp-DFohBy7Y.js","./glsl-vKfMnumi.js","./sql-yVRMvi0O.js","./csharp-DhI_1ny9.js","./diff-VMUPACBq.js","./docker-t1MdAjrc.js","./elixir-DuNB1BBS.js","./elm-CrGdvw7C.js","./erlang-C0ORVSrU.js","./go-B3ORrHWL.js","./groovy-xt9ETOUK.js","./haskell-UXfZSk_5.js","./jsx-Dhek_lNz.js","./julia-HEFZpZq1.js","./python-DdAFQc43.js","./r-VExt3r4_.js","./kotlin-CWqfBwk5.js","./less-DL22pY4I.js","./make-CH8ivb4o.js","./objective-c-DOS22jA9.js","./ocaml-qBzckQCJ.js","./perl-CzuAIuGO.js","./ruby-5LGjs1Pm.js","./shellscript-bBop2RGH.js","./lua-pd6nIbVt.js","./rust-COW7ZJIp.js","./sass-oJwsKQdv.js","./scala-DWUNMMxx.js","./swift-CGjhQosP.js","./toml-DU9_HPOl.js","./typescript-CYliDbTU.js","./astro-DRosG70n.js","./stylus-k-WBxfe-.js","./postcss-wLX4xaF-.js","./tsx-Ds786Is9.js","./blade-DqwRBQPS.js","./cobol-CbLmteZD.js","./crystal-CRzE51zz.js","./erb-5Cd5eIHq.js","./fortran-fixed-form-DxtoEefG.js","./fortran-free-form-BoQi57qK.js","./fsharp-BO-83zgp.js","./markdown-CsacJmnW.js","./gdresource-B-Voa0yv.js","./gdshader-BO43XYMV.js","./gdscript-CccYvLzp.js","./git-commit-B_f177bH.js","./git-rebase-Ct8XKp4j.js","./glimmer-js-MozmigTL.js","./glimmer-ts-BcEBv08f.js","./graphql-YkF5oJML.js","./hack-CgVeLdAF.js","./haml-TrAu53lP.js","./handlebars-npo4hGWj.js","./html-derivative-B_UhcMkx.js","./http-Co-gn1i4.js","./hxml-Zl3a4P_8.js","./haxe-uPj594z5.js","./imba-DBVe8Aym.js","./jinja-DVZkfrpO.js","./jison-6pxZ7IDQ.js","./latex-BA3YTv27.js","./tex-0uGjJ9BI.js","./gnuplot-TLobhHSn.js","./liquid-Bqd5xN-j.js","./marko-C2AP0NfW.js","./mdc-BGgFH6aU.js","./nginx-BoKi2qIY.js","./nim-CaD7WNYr.js","./php-BhYZK4_-.js","./pug-BuUjPLGk.js","./qml-ByojCR7G.js","./razor-B3Rc5T7r.js","./rst-BpzPa-jL.js","./cmake-a-8EfZAH.js","./sas-DEQFkSQy.js","./shaderlab-eCoehSuZ.js","./hlsl-DxdRzscs.js","./shellsession-ZfIGBriP.js","./soy-uFMLDv8F.js","./sparql-Cgg-C-NB.js","./turtle-B3VrIQpU.js","./stata-DazvD6a_.js","./svelte-a8rGLUzl.js","./twig-DshGX0wd.js","./vue-BVB0WzpV.js","./jsonc-hcRuV5XG.js","./json5-D9-7wPSE.js","./vue-html-fGSNhmCZ.js","./wikitext-BSXkYJx4.js","./ini-UFCqVqOy.js","./vb-Awm61LJT.js","./xsl-D2rJ1u14.js","./bat-DH3piprL.js","./raku-B5YGNUlb.js","./powershell-Ck7-Ofz9.js","./dart-DFZ6KCMX.js","./bibtex-_nVQ7ksi.js"],__vite__mapDeps=i=>i.map(i=>__vite__fileDeps[i]);
(async ()=>{
    const sharedConfig = {
        context: undefined,
        registry: undefined
    };
    const equalFn = (a, b)=>a === b;
    const $PROXY = Symbol("solid-proxy");
    const $TRACK = Symbol("solid-track");
    const signalOptions = {
        equals: equalFn
    };
    let runEffects = runQueue;
    const STALE = 1;
    const PENDING = 2;
    const UNOWNED = {
        owned: null,
        cleanups: null,
        context: null,
        owner: null
    };
    var Owner = null;
    let Transition = null;
    let ExternalSourceConfig = null;
    let Listener = null;
    let Updates = null;
    let Effects = null;
    let ExecCount = 0;
    function createRoot(fn, detachedOwner) {
        const listener = Listener, owner = Owner, unowned = fn.length === 0, current = detachedOwner === undefined ? owner : detachedOwner, root = unowned ? UNOWNED : {
            owned: null,
            cleanups: null,
            context: current ? current.context : null,
            owner: current
        }, updateFn = unowned ? fn : ()=>fn(()=>untrack(()=>cleanNode(root)));
        Owner = root;
        Listener = null;
        try {
            return runUpdates(updateFn, true);
        } finally{
            Listener = listener;
            Owner = owner;
        }
    }
    function createSignal(value, options) {
        options = options ? Object.assign({}, signalOptions, options) : signalOptions;
        const s = {
            value,
            observers: null,
            observerSlots: null,
            comparator: options.equals || undefined
        };
        const setter = (value)=>{
            if (typeof value === "function") {
                value = value(s.value);
            }
            return writeSignal(s, value);
        };
        return [
            readSignal.bind(s),
            setter
        ];
    }
    function createRenderEffect(fn, value, options) {
        const c = createComputation(fn, value, false, STALE);
        updateComputation(c);
    }
    function createEffect(fn, value, options) {
        runEffects = runUserEffects;
        const c = createComputation(fn, value, false, STALE);
        if (!options || !options.render) c.user = true;
        Effects ? Effects.push(c) : updateComputation(c);
    }
    function createMemo(fn, value, options) {
        options = options ? Object.assign({}, signalOptions, options) : signalOptions;
        const c = createComputation(fn, value, true, 0);
        c.observers = null;
        c.observerSlots = null;
        c.comparator = options.equals || undefined;
        updateComputation(c);
        return readSignal.bind(c);
    }
    function batch(fn) {
        return runUpdates(fn, false);
    }
    function untrack(fn) {
        if (Listener === null) return fn();
        const listener = Listener;
        Listener = null;
        try {
            if (ExternalSourceConfig) ;
            return fn();
        } finally{
            Listener = listener;
        }
    }
    function on(deps, fn, options) {
        const isArray = Array.isArray(deps);
        let prevInput;
        let defer = options && options.defer;
        return (prevValue)=>{
            let input;
            if (isArray) {
                input = Array(deps.length);
                for(let i = 0; i < deps.length; i++)input[i] = deps[i]();
            } else input = deps();
            if (defer) {
                defer = false;
                return prevValue;
            }
            const result = untrack(()=>fn(input, prevInput, prevValue));
            prevInput = input;
            return result;
        };
    }
    function onMount(fn) {
        createEffect(()=>untrack(fn));
    }
    function onCleanup(fn) {
        if (Owner === null) ;
        else if (Owner.cleanups === null) Owner.cleanups = [
            fn
        ];
        else Owner.cleanups.push(fn);
        return fn;
    }
    function getListener() {
        return Listener;
    }
    function getOwner() {
        return Owner;
    }
    function runWithOwner(o, fn) {
        const prev = Owner;
        const prevListener = Listener;
        Owner = o;
        Listener = null;
        try {
            return runUpdates(fn, true);
        } catch (err) {
            handleError(err);
        } finally{
            Owner = prev;
            Listener = prevListener;
        }
    }
    function readSignal() {
        if (this.sources && (this.state)) {
            if ((this.state) === STALE) updateComputation(this);
            else {
                const updates = Updates;
                Updates = null;
                runUpdates(()=>lookUpstream(this), false);
                Updates = updates;
            }
        }
        if (Listener) {
            const sSlot = this.observers ? this.observers.length : 0;
            if (!Listener.sources) {
                Listener.sources = [
                    this
                ];
                Listener.sourceSlots = [
                    sSlot
                ];
            } else {
                Listener.sources.push(this);
                Listener.sourceSlots.push(sSlot);
            }
            if (!this.observers) {
                this.observers = [
                    Listener
                ];
                this.observerSlots = [
                    Listener.sources.length - 1
                ];
            } else {
                this.observers.push(Listener);
                this.observerSlots.push(Listener.sources.length - 1);
            }
        }
        return this.value;
    }
    function writeSignal(node, value, isComp) {
        let current = node.value;
        if (!node.comparator || !node.comparator(current, value)) {
            node.value = value;
            if (node.observers && node.observers.length) {
                runUpdates(()=>{
                    for(let i = 0; i < node.observers.length; i += 1){
                        const o = node.observers[i];
                        const TransitionRunning = Transition && Transition.running;
                        if (TransitionRunning && Transition.disposed.has(o)) ;
                        if (TransitionRunning ? !o.tState : !o.state) {
                            if (o.pure) Updates.push(o);
                            else Effects.push(o);
                            if (o.observers) markDownstream(o);
                        }
                        if (!TransitionRunning) o.state = STALE;
                    }
                    if (Updates.length > 10e5) {
                        Updates = [];
                        if (false) ;
                        throw new Error();
                    }
                }, false);
            }
        }
        return value;
    }
    function updateComputation(node) {
        if (!node.fn) return;
        cleanNode(node);
        const time = ExecCount;
        runComputation(node, node.value, time);
    }
    function runComputation(node, value, time) {
        let nextValue;
        const owner = Owner, listener = Listener;
        Listener = Owner = node;
        try {
            nextValue = node.fn(value);
        } catch (err) {
            if (node.pure) {
                {
                    node.state = STALE;
                    node.owned && node.owned.forEach(cleanNode);
                    node.owned = null;
                }
            }
            node.updatedAt = time + 1;
            return handleError(err);
        } finally{
            Listener = listener;
            Owner = owner;
        }
        if (!node.updatedAt || node.updatedAt <= time) {
            if (node.updatedAt != null && "observers" in node) {
                writeSignal(node, nextValue);
            } else node.value = nextValue;
            node.updatedAt = time;
        }
    }
    function createComputation(fn, init, pure, state = STALE, options) {
        const c = {
            fn,
            state: state,
            updatedAt: null,
            owned: null,
            sources: null,
            sourceSlots: null,
            cleanups: null,
            value: init,
            owner: Owner,
            context: Owner ? Owner.context : null,
            pure
        };
        if (Owner === null) ;
        else if (Owner !== UNOWNED) {
            {
                if (!Owner.owned) Owner.owned = [
                    c
                ];
                else Owner.owned.push(c);
            }
        }
        return c;
    }
    function runTop(node) {
        if ((node.state) === 0) return;
        if ((node.state) === PENDING) return lookUpstream(node);
        if (node.suspense && untrack(node.suspense.inFallback)) return node.suspense.effects.push(node);
        const ancestors = [
            node
        ];
        while((node = node.owner) && (!node.updatedAt || node.updatedAt < ExecCount)){
            if (node.state) ancestors.push(node);
        }
        for(let i = ancestors.length - 1; i >= 0; i--){
            node = ancestors[i];
            if ((node.state) === STALE) {
                updateComputation(node);
            } else if ((node.state) === PENDING) {
                const updates = Updates;
                Updates = null;
                runUpdates(()=>lookUpstream(node, ancestors[0]), false);
                Updates = updates;
            }
        }
    }
    function runUpdates(fn, init) {
        if (Updates) return fn();
        let wait = false;
        if (!init) Updates = [];
        if (Effects) wait = true;
        else Effects = [];
        ExecCount++;
        try {
            const res = fn();
            completeUpdates(wait);
            return res;
        } catch (err) {
            if (!wait) Effects = null;
            Updates = null;
            handleError(err);
        }
    }
    function completeUpdates(wait) {
        if (Updates) {
            runQueue(Updates);
            Updates = null;
        }
        if (wait) return;
        const e = Effects;
        Effects = null;
        if (e.length) runUpdates(()=>runEffects(e), false);
    }
    function runQueue(queue) {
        for(let i = 0; i < queue.length; i++)runTop(queue[i]);
    }
    function runUserEffects(queue) {
        let i, userLength = 0;
        for(i = 0; i < queue.length; i++){
            const e = queue[i];
            if (!e.user) runTop(e);
            else queue[userLength++] = e;
        }
        for(i = 0; i < userLength; i++)runTop(queue[i]);
    }
    function lookUpstream(node, ignore) {
        node.state = 0;
        for(let i = 0; i < node.sources.length; i += 1){
            const source = node.sources[i];
            if (source.sources) {
                const state = source.state;
                if (state === STALE) {
                    if (source !== ignore && (!source.updatedAt || source.updatedAt < ExecCount)) runTop(source);
                } else if (state === PENDING) lookUpstream(source, ignore);
            }
        }
    }
    function markDownstream(node) {
        for(let i = 0; i < node.observers.length; i += 1){
            const o = node.observers[i];
            if (!o.state) {
                o.state = PENDING;
                if (o.pure) Updates.push(o);
                else Effects.push(o);
                o.observers && markDownstream(o);
            }
        }
    }
    function cleanNode(node) {
        let i;
        if (node.sources) {
            while(node.sources.length){
                const source = node.sources.pop(), index = node.sourceSlots.pop(), obs = source.observers;
                if (obs && obs.length) {
                    const n = obs.pop(), s = source.observerSlots.pop();
                    if (index < obs.length) {
                        n.sourceSlots[s] = index;
                        obs[index] = n;
                        source.observerSlots[index] = s;
                    }
                }
            }
        }
        if (node.owned) {
            for(i = node.owned.length - 1; i >= 0; i--)cleanNode(node.owned[i]);
            node.owned = null;
        }
        if (node.cleanups) {
            for(i = node.cleanups.length - 1; i >= 0; i--)node.cleanups[i]();
            node.cleanups = null;
        }
        node.state = 0;
    }
    function castError(err) {
        if (err instanceof Error) return err;
        return new Error(typeof err === "string" ? err : "Unknown error", {
            cause: err
        });
    }
    function handleError(err, owner = Owner) {
        const error = castError(err);
        throw error;
    }
    const FALLBACK = Symbol("fallback");
    function dispose(d) {
        for(let i = 0; i < d.length; i++)d[i]();
    }
    function mapArray(list, mapFn, options = {}) {
        let items = [], mapped = [], disposers = [], len = 0, indexes = mapFn.length > 1 ? [] : null;
        onCleanup(()=>dispose(disposers));
        return ()=>{
            let newItems = list() || [], i, j;
            newItems[$TRACK];
            return untrack(()=>{
                let newLen = newItems.length, newIndices, newIndicesNext, temp, tempdisposers, tempIndexes, start, end, newEnd, item;
                if (newLen === 0) {
                    if (len !== 0) {
                        dispose(disposers);
                        disposers = [];
                        items = [];
                        mapped = [];
                        len = 0;
                        indexes && (indexes = []);
                    }
                    if (options.fallback) {
                        items = [
                            FALLBACK
                        ];
                        mapped[0] = createRoot((disposer)=>{
                            disposers[0] = disposer;
                            return options.fallback();
                        });
                        len = 1;
                    }
                } else if (len === 0) {
                    mapped = new Array(newLen);
                    for(j = 0; j < newLen; j++){
                        items[j] = newItems[j];
                        mapped[j] = createRoot(mapper);
                    }
                    len = newLen;
                } else {
                    temp = new Array(newLen);
                    tempdisposers = new Array(newLen);
                    indexes && (tempIndexes = new Array(newLen));
                    for(start = 0, end = Math.min(len, newLen); start < end && items[start] === newItems[start]; start++);
                    for(end = len - 1, newEnd = newLen - 1; end >= start && newEnd >= start && items[end] === newItems[newEnd]; end--, newEnd--){
                        temp[newEnd] = mapped[end];
                        tempdisposers[newEnd] = disposers[end];
                        indexes && (tempIndexes[newEnd] = indexes[end]);
                    }
                    newIndices = new Map();
                    newIndicesNext = new Array(newEnd + 1);
                    for(j = newEnd; j >= start; j--){
                        item = newItems[j];
                        i = newIndices.get(item);
                        newIndicesNext[j] = i === undefined ? -1 : i;
                        newIndices.set(item, j);
                    }
                    for(i = start; i <= end; i++){
                        item = items[i];
                        j = newIndices.get(item);
                        if (j !== undefined && j !== -1) {
                            temp[j] = mapped[i];
                            tempdisposers[j] = disposers[i];
                            indexes && (tempIndexes[j] = indexes[i]);
                            j = newIndicesNext[j];
                            newIndices.set(item, j);
                        } else disposers[i]();
                    }
                    for(j = start; j < newLen; j++){
                        if (j in temp) {
                            mapped[j] = temp[j];
                            disposers[j] = tempdisposers[j];
                            if (indexes) {
                                indexes[j] = tempIndexes[j];
                                indexes[j](j);
                            }
                        } else mapped[j] = createRoot(mapper);
                    }
                    mapped = mapped.slice(0, (len = newLen));
                    items = newItems.slice(0);
                }
                return mapped;
            });
            function mapper(disposer) {
                disposers[j] = disposer;
                if (indexes) {
                    const [s, set] = createSignal(j);
                    indexes[j] = set;
                    return mapFn(newItems[j], s);
                }
                return mapFn(newItems[j]);
            }
        };
    }
    function createComponent(Comp, props) {
        return untrack(()=>Comp(props || {}));
    }
    function trueFn() {
        return true;
    }
    const propTraps = {
        get (_, property, receiver) {
            if (property === $PROXY) return receiver;
            return _.get(property);
        },
        has (_, property) {
            if (property === $PROXY) return true;
            return _.has(property);
        },
        set: trueFn,
        deleteProperty: trueFn,
        getOwnPropertyDescriptor (_, property) {
            return {
                configurable: true,
                enumerable: true,
                get () {
                    return _.get(property);
                },
                set: trueFn,
                deleteProperty: trueFn
            };
        },
        ownKeys (_) {
            return _.keys();
        }
    };
    function resolveSource(s) {
        return !(s = typeof s === "function" ? s() : s) ? {} : s;
    }
    function resolveSources() {
        for(let i = 0, length = this.length; i < length; ++i){
            const v = this[i]();
            if (v !== undefined) return v;
        }
    }
    function mergeProps(...sources) {
        let proxy = false;
        for(let i = 0; i < sources.length; i++){
            const s = sources[i];
            proxy = proxy || (!!s && $PROXY in s);
            sources[i] = typeof s === "function" ? ((proxy = true), createMemo(s)) : s;
        }
        if (proxy) {
            return new Proxy({
                get (property) {
                    for(let i = sources.length - 1; i >= 0; i--){
                        const v = resolveSource(sources[i])[property];
                        if (v !== undefined) return v;
                    }
                },
                has (property) {
                    for(let i = sources.length - 1; i >= 0; i--){
                        if (property in resolveSource(sources[i])) return true;
                    }
                    return false;
                },
                keys () {
                    const keys = [];
                    for(let i = 0; i < sources.length; i++)keys.push(...Object.keys(resolveSource(sources[i])));
                    return [
                        ...new Set(keys)
                    ];
                }
            }, propTraps);
        }
        const sourcesMap = {};
        const defined = Object.create(null);
        for(let i = sources.length - 1; i >= 0; i--){
            const source = sources[i];
            if (!source) continue;
            const sourceKeys = Object.getOwnPropertyNames(source);
            for(let i = sourceKeys.length - 1; i >= 0; i--){
                const key = sourceKeys[i];
                if (key === "__proto__" || key === "constructor") continue;
                const desc = Object.getOwnPropertyDescriptor(source, key);
                if (!defined[key]) {
                    defined[key] = desc.get ? {
                        enumerable: true,
                        configurable: true,
                        get: resolveSources.bind((sourcesMap[key] = [
                            desc.get.bind(source)
                        ]))
                    } : desc.value !== undefined ? desc : undefined;
                } else {
                    const sources = sourcesMap[key];
                    if (sources) {
                        if (desc.get) sources.push(desc.get.bind(source));
                        else if (desc.value !== undefined) sources.push(()=>desc.value);
                    }
                }
            }
        }
        const target = {};
        const definedKeys = Object.keys(defined);
        for(let i = definedKeys.length - 1; i >= 0; i--){
            const key = definedKeys[i], desc = defined[key];
            if (desc && desc.get) Object.defineProperty(target, key, desc);
            else target[key] = desc ? desc.value : undefined;
        }
        return target;
    }
    function splitProps(props, ...keys) {
        if ($PROXY in props) {
            const blocked = new Set(keys.length > 1 ? keys.flat() : keys[0]);
            const res = keys.map((k)=>{
                return new Proxy({
                    get (property) {
                        return k.includes(property) ? props[property] : undefined;
                    },
                    has (property) {
                        return k.includes(property) && property in props;
                    },
                    keys () {
                        return k.filter((property)=>property in props);
                    }
                }, propTraps);
            });
            res.push(new Proxy({
                get (property) {
                    return blocked.has(property) ? undefined : props[property];
                },
                has (property) {
                    return blocked.has(property) ? false : property in props;
                },
                keys () {
                    return Object.keys(props).filter((k)=>!blocked.has(k));
                }
            }, propTraps));
            return res;
        }
        const otherObject = {};
        const objects = keys.map(()=>({}));
        for (const propName of Object.getOwnPropertyNames(props)){
            const desc = Object.getOwnPropertyDescriptor(props, propName);
            const isDefaultDesc = !desc.get && !desc.set && desc.enumerable && desc.writable && desc.configurable;
            let blocked = false;
            let objectIndex = 0;
            for (const k of keys){
                if (k.includes(propName)) {
                    blocked = true;
                    isDefaultDesc ? (objects[objectIndex][propName] = desc.value) : Object.defineProperty(objects[objectIndex], propName, desc);
                }
                ++objectIndex;
            }
            if (!blocked) {
                isDefaultDesc ? (otherObject[propName] = desc.value) : Object.defineProperty(otherObject, propName, desc);
            }
        }
        return [
            ...objects,
            otherObject
        ];
    }
    const narrowedError = (name)=>`Stale read from <${name}>.`;
    function For(props) {
        const fallback = "fallback" in props && {
            fallback: ()=>props.fallback
        };
        return createMemo(mapArray(()=>props.each, props.children, fallback || undefined));
    }
    function Show(props) {
        const keyed = props.keyed;
        const condition = createMemo(()=>props.when, undefined, {
            equals: (a, b)=>(keyed ? a === b : !a === !b)
        });
        return createMemo(()=>{
            const c = condition();
            if (c) {
                const child = props.children;
                const fn = typeof child === "function" && child.length > 0;
                return fn ? untrack(()=>child(keyed ? c : ()=>{
                        if (!untrack(condition)) throw narrowedError("Show");
                        return props.when;
                    })) : child;
            }
            return props.fallback;
        }, undefined, undefined);
    }
    const ChildProperties = new Set([
        "innerHTML",
        "textContent",
        "innerText",
        "children"
    ]);
    const Aliases = Object.assign(Object.create(null), {
        className: "class",
        htmlFor: "for"
    });
    const DelegatedEvents = new Set([
        "beforeinput",
        "click",
        "dblclick",
        "contextmenu",
        "focusin",
        "focusout",
        "input",
        "keydown",
        "keyup",
        "mousedown",
        "mousemove",
        "mouseout",
        "mouseover",
        "mouseup",
        "pointerdown",
        "pointermove",
        "pointerout",
        "pointerover",
        "pointerup",
        "touchend",
        "touchmove",
        "touchstart"
    ]);
    const SVGNamespace = {
        xlink: "http://www.w3.org/1999/xlink",
        xml: "http://www.w3.org/XML/1998/namespace"
    };
    function reconcileArrays(parentNode, a, b) {
        let bLength = b.length, aEnd = a.length, bEnd = bLength, aStart = 0, bStart = 0, after = a[aEnd - 1].nextSibling, map = null;
        while(aStart < aEnd || bStart < bEnd){
            if (a[aStart] === b[bStart]) {
                aStart++;
                bStart++;
                continue;
            }
            while(a[aEnd - 1] === b[bEnd - 1]){
                aEnd--;
                bEnd--;
            }
            if (aEnd === aStart) {
                const node = bEnd < bLength ? (bStart ? b[bStart - 1].nextSibling : b[bEnd - bStart]) : after;
                while(bStart < bEnd)parentNode.insertBefore(b[bStart++], node);
            } else if (bEnd === bStart) {
                while(aStart < aEnd){
                    if (!map || !map.has(a[aStart])) a[aStart].remove();
                    aStart++;
                }
            } else if (a[aStart] === b[bEnd - 1] && b[bStart] === a[aEnd - 1]) {
                const node = a[--aEnd].nextSibling;
                parentNode.insertBefore(b[bStart++], a[aStart++].nextSibling);
                parentNode.insertBefore(b[--bEnd], node);
                a[aEnd] = b[bEnd];
            } else {
                if (!map) {
                    map = new Map();
                    let i = bStart;
                    while(i < bEnd)map.set(b[i], i++);
                }
                const index = map.get(a[aStart]);
                if (index != null) {
                    if (bStart < index && index < bEnd) {
                        let i = aStart, sequence = 1, t;
                        while(++i < aEnd && i < bEnd){
                            if ((t = map.get(a[i])) == null || t !== index + sequence) break;
                            sequence++;
                        }
                        if (sequence > index - bStart) {
                            const node = a[aStart];
                            while(bStart < index)parentNode.insertBefore(b[bStart++], node);
                        } else parentNode.replaceChild(b[bStart++], a[aStart++]);
                    } else aStart++;
                } else a[aStart++].remove();
            }
        }
    }
    const $$EVENTS = "_$DX_DELEGATE";
    function render(code, element, init, options = {}) {
        let disposer;
        createRoot((dispose)=>{
            disposer = dispose;
            element === document ? code() : insert(element, code(), element.firstChild ? null : undefined, init);
        }, options.owner);
        return ()=>{
            disposer();
            element.textContent = "";
        };
    }
    function template(html, isCE, isSVG) {
        let node;
        const create = ()=>{
            const t = document.createElement("template");
            t.innerHTML = html;
            return t.content.firstChild;
        };
        const fn = ()=>(node || (node = create())).cloneNode(true);
        fn.cloneNode = fn;
        return fn;
    }
    function delegateEvents(eventNames, document = window.document) {
        const e = document[$$EVENTS] || (document[$$EVENTS] = new Set());
        for(let i = 0, l = eventNames.length; i < l; i++){
            const name = eventNames[i];
            if (!e.has(name)) {
                e.add(name);
                document.addEventListener(name, eventHandler);
            }
        }
    }
    function setAttribute(node, name, value) {
        if (value == null) node.removeAttribute(name);
        else node.setAttribute(name, value);
    }
    function setAttributeNS(node, namespace, name, value) {
        if (value == null) node.removeAttributeNS(namespace, name);
        else node.setAttributeNS(namespace, name, value);
    }
    function className(node, value) {
        if (value == null) node.removeAttribute("class");
        else node.className = value;
    }
    function addEventListener(node, name, handler, delegate) {
        if (delegate) {
            if (Array.isArray(handler)) {
                node[`$$${name}`] = handler[0];
                node[`$$${name}Data`] = handler[1];
            } else node[`$$${name}`] = handler;
        } else if (Array.isArray(handler)) {
            const handlerFn = handler[0];
            node.addEventListener(name, (handler[0] = (e)=>handlerFn.call(node, handler[1], e)));
        } else node.addEventListener(name, handler);
    }
    function classList(node, value, prev = {}) {
        const classKeys = Object.keys(value || {}), prevKeys = Object.keys(prev);
        let i, len;
        for(i = 0, len = prevKeys.length; i < len; i++){
            const key = prevKeys[i];
            if (!key || key === "undefined" || value[key]) continue;
            toggleClassKey(node, key, false);
            delete prev[key];
        }
        for(i = 0, len = classKeys.length; i < len; i++){
            const key = classKeys[i], classValue = !!value[key];
            if (!key || key === "undefined" || prev[key] === classValue || !classValue) continue;
            toggleClassKey(node, key, true);
            prev[key] = classValue;
        }
        return prev;
    }
    function style(node, value, prev) {
        if (!value) return prev ? setAttribute(node, "style") : value;
        const nodeStyle = node.style;
        if (typeof value === "string") return (nodeStyle.cssText = value);
        typeof prev === "string" && (nodeStyle.cssText = prev = undefined);
        prev || (prev = {});
        value || (value = {});
        let v, s;
        for(s in prev){
            value[s] == null && nodeStyle.removeProperty(s);
            delete prev[s];
        }
        for(s in value){
            v = value[s];
            if (v !== prev[s]) {
                nodeStyle.setProperty(s, v);
                prev[s] = v;
            }
        }
        return prev;
    }
    function spread(node, props = {}, isSVG, skipChildren) {
        const prevProps = {};
        createRenderEffect(()=>typeof props.ref === "function" ? use(props.ref, node) : (props.ref = node));
        createRenderEffect(()=>assign(node, props, isSVG, true, prevProps, true));
        return prevProps;
    }
    function use(fn, element, arg) {
        return untrack(()=>fn(element, arg));
    }
    function insert(parent, accessor, marker, initial) {
        if (marker !== undefined && !initial) initial = [];
        if (typeof accessor !== "function") return insertExpression(parent, accessor, initial, marker);
        createRenderEffect((current)=>insertExpression(parent, accessor(), current, marker), initial);
    }
    function assign(node, props, isSVG, skipChildren, prevProps = {}, skipRef = false) {
        props || (props = {});
        for(const prop in prevProps){
            if (!(prop in props)) {
                if (prop === "children") continue;
                prevProps[prop] = assignProp(node, prop, null, prevProps[prop], isSVG, skipRef);
            }
        }
        for(const prop in props){
            if (prop === "children") {
                continue;
            }
            const value = props[prop];
            prevProps[prop] = assignProp(node, prop, value, prevProps[prop], isSVG, skipRef);
        }
    }
    function toPropertyName(name) {
        return name.toLowerCase().replace(/-([a-z])/g, (_, w)=>w.toUpperCase());
    }
    function toggleClassKey(node, key, value) {
        const classNames = key.trim().split(/\s+/);
        for(let i = 0, nameLen = classNames.length; i < nameLen; i++)node.classList.toggle(classNames[i], value);
    }
    function assignProp(node, prop, value, prev, isSVG, skipRef) {
        let isCE, isProp, isChildProp, forceProp;
        if (prop === "style") return style(node, value, prev);
        if (prop === "classList") return classList(node, value, prev);
        if (value === prev) return prev;
        if (prop === "ref") {
            if (!skipRef) value(node);
        } else if (prop.slice(0, 3) === "on:") {
            const e = prop.slice(3);
            prev && node.removeEventListener(e, prev);
            value && node.addEventListener(e, value);
        } else if (prop.slice(0, 10) === "oncapture:") {
            const e = prop.slice(10);
            prev && node.removeEventListener(e, prev, true);
            value && node.addEventListener(e, value, true);
        } else if (prop.slice(0, 2) === "on") {
            const name = prop.slice(2).toLowerCase();
            const delegate = DelegatedEvents.has(name);
            if (!delegate && prev) {
                const h = Array.isArray(prev) ? prev[0] : prev;
                node.removeEventListener(name, h);
            }
            if (delegate || value) {
                addEventListener(node, name, value, delegate);
                delegate && delegateEvents([
                    name
                ]);
            }
        } else if (prop.slice(0, 5) === "attr:") {
            setAttribute(node, prop.slice(5), value);
        } else if ((forceProp = prop.slice(0, 5) === "prop:") || (isChildProp = ChildProperties.has(prop)) || (!isSVG) || (isCE = node.nodeName.includes("-"))) {
            if (forceProp) {
                prop = prop.slice(5);
                isProp = true;
            }
            if (prop === "class" || prop === "className") className(node, value);
            else if (isCE && !isProp && !isChildProp) node[toPropertyName(prop)] = value;
            else node[prop] = value;
        } else {
            const ns = prop.indexOf(":") > -1 && SVGNamespace[prop.split(":")[0]];
            if (ns) setAttributeNS(node, ns, prop, value);
            else setAttribute(node, Aliases[prop] || prop, value);
        }
        return value;
    }
    function eventHandler(e) {
        const key = `$$${e.type}`;
        let node = (e.composedPath && e.composedPath()[0]) || e.target;
        if (e.target !== node) {
            Object.defineProperty(e, "target", {
                configurable: true,
                value: node
            });
        }
        Object.defineProperty(e, "currentTarget", {
            configurable: true,
            get () {
                return node || document;
            }
        });
        while(node){
            const handler = node[key];
            if (handler && !node.disabled) {
                const data = node[`${key}Data`];
                data !== undefined ? handler.call(node, data, e) : handler.call(node, e);
                if (e.cancelBubble) return;
            }
            node = node._$host || node.parentNode || node.host;
        }
    }
    function insertExpression(parent, value, current, marker, unwrapArray) {
        while(typeof current === "function")current = current();
        if (value === current) return current;
        const t = typeof value, multi = marker !== undefined;
        parent = (multi && current[0] && current[0].parentNode) || parent;
        if (t === "string" || t === "number") {
            if (t === "number") value = value.toString();
            if (multi) {
                let node = current[0];
                if (node && node.nodeType === 3) {
                    node.data !== value && (node.data = value);
                } else node = document.createTextNode(value);
                current = cleanChildren(parent, current, marker, node);
            } else {
                if (current !== "" && typeof current === "string") {
                    current = parent.firstChild.data = value;
                } else current = parent.textContent = value;
            }
        } else if (value == null || t === "boolean") {
            current = cleanChildren(parent, current, marker);
        } else if (t === "function") {
            createRenderEffect(()=>{
                let v = value();
                while(typeof v === "function")v = v();
                current = insertExpression(parent, v, current, marker);
            });
            return ()=>current;
        } else if (Array.isArray(value)) {
            const array = [];
            const currentArray = current && Array.isArray(current);
            if (normalizeIncomingArray(array, value, current, unwrapArray)) {
                createRenderEffect(()=>(current = insertExpression(parent, array, current, marker, true)));
                return ()=>current;
            }
            if (array.length === 0) {
                current = cleanChildren(parent, current, marker);
                if (multi) return current;
            } else if (currentArray) {
                if (current.length === 0) {
                    appendNodes(parent, array, marker);
                } else reconcileArrays(parent, current, array);
            } else {
                current && cleanChildren(parent);
                appendNodes(parent, array);
            }
            current = array;
        } else if (value.nodeType) {
            if (Array.isArray(current)) {
                if (multi) return (current = cleanChildren(parent, current, marker, value));
                cleanChildren(parent, current, null, value);
            } else if (current == null || current === "" || !parent.firstChild) {
                parent.appendChild(value);
            } else parent.replaceChild(value, parent.firstChild);
            current = value;
        } else ;
        return current;
    }
    function normalizeIncomingArray(normalized, array, current, unwrap) {
        let dynamic = false;
        for(let i = 0, len = array.length; i < len; i++){
            let item = array[i], prev = current && current[normalized.length], t;
            if (item == null || item === true || item === false) ;
            else if ((t = typeof item) === "object" && item.nodeType) {
                normalized.push(item);
            } else if (Array.isArray(item)) {
                dynamic = normalizeIncomingArray(normalized, item, prev) || dynamic;
            } else if (t === "function") {
                if (unwrap) {
                    while(typeof item === "function")item = item();
                    dynamic = normalizeIncomingArray(normalized, Array.isArray(item) ? item : [
                        item
                    ], Array.isArray(prev) ? prev : [
                        prev
                    ]) || dynamic;
                } else {
                    normalized.push(item);
                    dynamic = true;
                }
            } else {
                const value = String(item);
                if (prev && prev.nodeType === 3 && prev.data === value) normalized.push(prev);
                else normalized.push(document.createTextNode(value));
            }
        }
        return dynamic;
    }
    function appendNodes(parent, array, marker = null) {
        for(let i = 0, len = array.length; i < len; i++)parent.insertBefore(array[i], marker);
    }
    function cleanChildren(parent, current, marker, replacement) {
        if (marker === undefined) return (parent.textContent = "");
        const node = replacement || document.createTextNode("");
        if (current.length) {
            let inserted = false;
            for(let i = current.length - 1; i >= 0; i--){
                const el = current[i];
                if (node !== el) {
                    const isParent = el.parentNode === parent;
                    if (!inserted && !i) isParent ? parent.replaceChild(node, el) : parent.insertBefore(node, marker);
                    else isParent && el.remove();
                } else inserted = true;
            }
        } else parent.insertBefore(node, marker);
        return [
            node
        ];
    }
    const isServer = false;
    const SVG_NAMESPACE = "http://www.w3.org/2000/svg";
    function createElement(tagName, isSVG = false) {
        return isSVG ? document.createElementNS(SVG_NAMESPACE, tagName) : document.createElement(tagName);
    }
    function Portal(props) {
        const { useShadow } = props, marker = document.createTextNode(""), mount = ()=>props.mount || document.body, owner = getOwner();
        let content;
        let hydrating = !!sharedConfig.context;
        createEffect(()=>{
            content || (content = runWithOwner(owner, ()=>createMemo(()=>props.children)));
            const el = mount();
            if (el instanceof HTMLHeadElement) {
                const [clean, setClean] = createSignal(false);
                const cleanup = ()=>setClean(true);
                createRoot((dispose)=>insert(el, ()=>(!clean() ? content() : dispose()), null));
                onCleanup(cleanup);
            } else {
                const container = createElement(props.isSVG ? "g" : "div", props.isSVG), renderRoot = useShadow && container.attachShadow ? container.attachShadow({
                    mode: "open"
                }) : container;
                Object.defineProperty(container, "_$host", {
                    get () {
                        return marker.parentNode;
                    },
                    configurable: true
                });
                insert(renderRoot, content);
                el.appendChild(container);
                props.ref && props.ref(container);
                onCleanup(()=>el.removeChild(container));
            }
        }, undefined, {
            render: !hydrating
        });
        return marker;
    }
    const $RAW = Symbol("store-raw"), $NODE = Symbol("store-node"), $HAS = Symbol("store-has"), $SELF = Symbol("store-self");
    function wrap$1(value) {
        let p = value[$PROXY];
        if (!p) {
            Object.defineProperty(value, $PROXY, {
                value: (p = new Proxy(value, proxyTraps$1))
            });
            if (!Array.isArray(value)) {
                const keys = Object.keys(value), desc = Object.getOwnPropertyDescriptors(value);
                for(let i = 0, l = keys.length; i < l; i++){
                    const prop = keys[i];
                    if (desc[prop].get) {
                        Object.defineProperty(value, prop, {
                            enumerable: desc[prop].enumerable,
                            get: desc[prop].get.bind(p)
                        });
                    }
                }
            }
        }
        return p;
    }
    function isWrappable(obj) {
        let proto;
        return (obj != null && typeof obj === "object" && (obj[$PROXY] || !(proto = Object.getPrototypeOf(obj)) || proto === Object.prototype || Array.isArray(obj)));
    }
    function unwrap(item, set = new Set()) {
        let result, unwrapped, v, prop;
        if ((result = item != null && item[$RAW])) return result;
        if (!isWrappable(item) || set.has(item)) return item;
        if (Array.isArray(item)) {
            if (Object.isFrozen(item)) item = item.slice(0);
            else set.add(item);
            for(let i = 0, l = item.length; i < l; i++){
                v = item[i];
                if ((unwrapped = unwrap(v, set)) !== v) item[i] = unwrapped;
            }
        } else {
            if (Object.isFrozen(item)) item = Object.assign({}, item);
            else set.add(item);
            const keys = Object.keys(item), desc = Object.getOwnPropertyDescriptors(item);
            for(let i = 0, l = keys.length; i < l; i++){
                prop = keys[i];
                if (desc[prop].get) continue;
                v = item[prop];
                if ((unwrapped = unwrap(v, set)) !== v) item[prop] = unwrapped;
            }
        }
        return item;
    }
    function getNodes(target, symbol) {
        let nodes = target[symbol];
        if (!nodes) Object.defineProperty(target, symbol, {
            value: (nodes = Object.create(null))
        });
        return nodes;
    }
    function getNode(nodes, property, value) {
        if (nodes[property]) return nodes[property];
        const [s, set] = createSignal(value, {
            equals: false,
            internal: true
        });
        s.$ = set;
        return (nodes[property] = s);
    }
    function proxyDescriptor$1(target, property) {
        const desc = Reflect.getOwnPropertyDescriptor(target, property);
        if (!desc || desc.get || !desc.configurable || property === $PROXY || property === $NODE) return desc;
        delete desc.value;
        delete desc.writable;
        desc.get = ()=>target[$PROXY][property];
        return desc;
    }
    function trackSelf(target) {
        getListener() && getNode(getNodes(target, $NODE), $SELF)();
    }
    function ownKeys(target) {
        trackSelf(target);
        return Reflect.ownKeys(target);
    }
    const proxyTraps$1 = {
        get (target, property, receiver) {
            if (property === $RAW) return target;
            if (property === $PROXY) return receiver;
            if (property === $TRACK) {
                trackSelf(target);
                return receiver;
            }
            const nodes = getNodes(target, $NODE);
            const tracked = nodes[property];
            let value = tracked ? tracked() : target[property];
            if (property === $NODE || property === $HAS || property === "__proto__") return value;
            if (!tracked) {
                const desc = Object.getOwnPropertyDescriptor(target, property);
                if (getListener() && (typeof value !== "function" || target.hasOwnProperty(property)) && !(desc && desc.get)) value = getNode(nodes, property, value)();
            }
            return isWrappable(value) ? wrap$1(value) : value;
        },
        has (target, property) {
            if (property === $RAW || property === $PROXY || property === $TRACK || property === $NODE || property === $HAS || property === "__proto__") return true;
            getListener() && getNode(getNodes(target, $HAS), property)();
            return property in target;
        },
        set () {
            return true;
        },
        deleteProperty () {
            return true;
        },
        ownKeys: ownKeys,
        getOwnPropertyDescriptor: proxyDescriptor$1
    };
    function setProperty(state, property, value, deleting = false) {
        if (!deleting && state[property] === value) return;
        const prev = state[property], len = state.length;
        if (value === undefined) {
            delete state[property];
            if (state[$HAS] && state[$HAS][property] && prev !== undefined) state[$HAS][property].$();
        } else {
            state[property] = value;
            if (state[$HAS] && state[$HAS][property] && prev === undefined) state[$HAS][property].$();
        }
        let nodes = getNodes(state, $NODE), node;
        if ((node = getNode(nodes, property, prev))) node.$(()=>value);
        if (Array.isArray(state) && state.length !== len) {
            for(let i = state.length; i < len; i++)(node = nodes[i]) && node.$();
            (node = getNode(nodes, "length", len)) && node.$(state.length);
        }
        (node = nodes[$SELF]) && node.$();
    }
    function mergeStoreNode(state, value) {
        const keys = Object.keys(value);
        for(let i = 0; i < keys.length; i += 1){
            const key = keys[i];
            setProperty(state, key, value[key]);
        }
    }
    function updateArray(current, next) {
        if (typeof next === "function") next = next(current);
        next = unwrap(next);
        if (Array.isArray(next)) {
            if (current === next) return;
            let i = 0, len = next.length;
            for(; i < len; i++){
                const value = next[i];
                if (current[i] !== value) setProperty(current, i, value);
            }
            setProperty(current, "length", len);
        } else mergeStoreNode(current, next);
    }
    function updatePath(current, path, traversed = []) {
        let part, prev = current;
        if (path.length > 1) {
            part = path.shift();
            const partType = typeof part, isArray = Array.isArray(current);
            if (Array.isArray(part)) {
                for(let i = 0; i < part.length; i++){
                    updatePath(current, [
                        part[i]
                    ].concat(path), traversed);
                }
                return;
            } else if (isArray && partType === "function") {
                for(let i = 0; i < current.length; i++){
                    if (part(current[i], i)) updatePath(current, [
                        i
                    ].concat(path), traversed);
                }
                return;
            } else if (isArray && partType === "object") {
                const { from = 0, to = current.length - 1, by = 1 } = part;
                for(let i = from; i <= to; i += by){
                    updatePath(current, [
                        i
                    ].concat(path), traversed);
                }
                return;
            } else if (path.length > 1) {
                updatePath(current[part], path, [
                    part
                ].concat(traversed));
                return;
            }
            prev = current[part];
            traversed = [
                part
            ].concat(traversed);
        }
        let value = path[0];
        if (typeof value === "function") {
            value = value(prev, traversed);
            if (value === prev) return;
        }
        if (part === undefined && value == undefined) return;
        value = unwrap(value);
        if (part === undefined || (isWrappable(prev) && isWrappable(value) && !Array.isArray(value))) {
            mergeStoreNode(prev, value);
        } else setProperty(current, part, value);
    }
    function createStore(...[store, options]) {
        const unwrappedStore = unwrap(store || {});
        const isArray = Array.isArray(unwrappedStore);
        const wrappedStore = wrap$1(unwrappedStore);
        function setStore(...args) {
            batch(()=>{
                isArray && args.length === 1 ? updateArray(unwrappedStore, args[0]) : updatePath(unwrappedStore, args);
            });
        }
        return [
            wrappedStore,
            setStore
        ];
    }
    class PieceTable {
        originalBuffer;
        addBuffer;
        table;
        cachedLength = null;
        constructor(text){
            this.originalBuffer = text;
            this.addBuffer = "";
            this.table = [
                {
                    buffer: "original",
                    start: 0,
                    length: text.length
                }
            ];
            this.cachedLength = text.length;
        }
        extractText(startIndex, endIndex) {
            let result = "";
            let currentPos = 0;
            for (const piece of this.table){
                const buffer = piece.buffer === "original" ? this.originalBuffer : this.addBuffer;
                const pieceStart = currentPos;
                const pieceEnd = currentPos + piece.length;
                if (pieceEnd > startIndex && pieceStart < endIndex) {
                    const start = Math.max(startIndex, pieceStart);
                    const end = Math.min(endIndex, pieceEnd);
                    result += buffer.substring(piece.start + (start - pieceStart), piece.start + (end - pieceStart));
                }
                currentPos += piece.length;
                if (currentPos >= endIndex) break;
            }
            return result;
        }
        updateCachedLength() {
            let length = 0;
            for (const piece of this.table){
                length += piece.length;
            }
            this.cachedLength = length;
        }
        insert(text, index) {
            this.addBuffer += text;
            const newPiece = {
                buffer: "add",
                start: this.addBuffer.length - text.length,
                length: text.length
            };
            let offset = 0;
            for(let i = 0; i < this.table.length; i++){
                const piece = this.table[i];
                const pieceEnd = offset + piece.length;
                if (index <= pieceEnd) {
                    const remainderLength = pieceEnd - index;
                    piece.length -= remainderLength;
                    this.table.splice(i + 1, 0, newPiece, {
                        buffer: piece.buffer,
                        start: piece.start + piece.length,
                        length: remainderLength
                    });
                    break;
                }
                offset += piece.length;
            }
            this.updateCachedLength();
        }
        length() {
            if (this.cachedLength !== null) {
                return this.cachedLength;
            }
            this.updateCachedLength();
            return this.cachedLength;
        }
        restoreText(newText) {
            this.originalBuffer = newText;
            this.addBuffer = "";
            this.table = [
                {
                    buffer: "original",
                    start: 0,
                    length: newText.length
                }
            ];
            this.updateCachedLength();
        }
        delete(startIndex, length) {
            let offset = 0;
            let newLength = length;
            for(let i = 0; i < this.table.length && newLength > 0; i++){
                const piece = this.table[i];
                const pieceEnd = offset + piece.length;
                if (pieceEnd > startIndex) {
                    const deleteFrom = Math.max(startIndex - offset, 0);
                    const deleteTo = Math.min(pieceEnd - offset, deleteFrom + newLength);
                    if (deleteFrom === 0 && deleteTo === piece.length) {
                        this.table.splice(i, 1);
                        i--;
                    } else if (deleteFrom === 0) {
                        piece.start += deleteTo;
                        piece.length -= deleteTo;
                    } else if (deleteTo === piece.length) {
                        piece.length = deleteFrom;
                    } else {
                        const newPiece = {
                            buffer: piece.buffer,
                            start: piece.start + deleteTo,
                            length: piece.length - deleteTo
                        };
                        piece.length = deleteFrom;
                        this.table.splice(i + 1, 0, newPiece);
                    }
                    newLength -= deleteTo - deleteFrom;
                }
                offset += piece.length;
            }
            this.updateCachedLength();
        }
        getText() {
            let text = "";
            for (const piece of this.table){
                const buffer = piece.buffer === "original" ? this.originalBuffer : this.addBuffer;
                text += buffer.substring(piece.start, piece.start + piece.length);
            }
            return text;
        }
    }
    const [parserTree, setParserTree] = createSignal({});
    const [state$2, setState$2] = createStore({
        pieceTables: new Map(),
        activePieceTableId: null
    });
    const PieceTableStore = {
        get pieceTables () {
            return state$2.pieceTables;
        },
        get activePieceTable () {
            return state$2.pieceTables.get(state$2.activePieceTableId);
        },
        get activePieceTableId () {
            return state$2.activePieceTableId;
        },
        setActivePieceTable (id) {
            setState$2("activePieceTableId", id);
        },
        addPieceTable (id, pieceTable) {
            setState$2("pieceTables", new Map([
                ...state$2.pieceTables,
                [
                    id,
                    pieceTable
                ]
            ]));
        },
        removePieceTable (id) {
            setState$2("pieceTables", (prevPieceTables)=>{
                const newPieceTables = new Map(prevPieceTables);
                newPieceTables.delete(id);
                return newPieceTables;
            });
        },
        getPieceTable (id) {
            return state$2.pieceTables.get(id);
        }
    };
    var TabState = ((TabState2)=>{
        TabState2[TabState2["Modified"] = 0] = "Modified";
        TabState2[TabState2["Untracked"] = 1] = "Untracked";
        TabState2[TabState2["Deleted"] = 2] = "Deleted";
        return TabState2;
    })(TabState || {});
    const [state$1, setState$1] = createStore({
        tabs: [],
        activeTabId: null,
        lastActiveTabs: []
    });
    const TabStore = {
        get tabs () {
            return state$1.tabs;
        },
        get activeTab () {
            return state$1.tabs.find((tab)=>tab.id === state$1.activeTabId) || null;
        },
        get lastActiveTab () {
            const lastActiveTabId = state$1.lastActiveTabs[state$1.lastActiveTabs.length - 1];
            return state$1.tabs.find((tab)=>tab.id === lastActiveTabId) || null;
        },
        getTabState (tabId) {
            return state$1.tabs.find((t)=>t.id === tabId)?.state;
        },
        openTab (tab) {
            setState$1("tabs", (tabs)=>{
                const tabExists = tabs.some((t)=>t.id === tab.id);
                if (!tabExists) {
                    return [
                        ...tabs.map((t)=>({
                                ...t,
                                active: false
                            })),
                        {
                            ...tab,
                            active: true,
                            modified: false,
                            saved: true,
                            content: "",
                            cursor: {
                                line: 0,
                                character: 0
                            },
                            scrollX: 0,
                            scrollY: 0
                        }
                    ];
                }
                this.addToLastActiveTabs(tab.id);
                return tabs.map((t)=>({
                        ...t,
                        active: t.id === tab.id
                    }));
            });
            this.setActiveTab(tab.id);
            const editor = EditorStore.getActiveEditor();
            if (editor) {
                editor.setContent("");
            }
        },
        closeTab (tabId) {
            setState$1("tabs", (tabs)=>tabs.filter((tab)=>tab.id !== tabId));
            if (state$1.activeTabId === tabId) {
                this.removeFromLastActiveTabs(tabId);
                const lastActiveTabId = state$1.lastActiveTabs[state$1.lastActiveTabs.length - 1] || null;
                this.setActiveTab(lastActiveTabId);
                PieceTableStore.removePieceTable(tabId);
            }
        },
        activateTab (tabId) {
            const currentTab = this.activeTab;
            if (currentTab) {
                const editor = EditorStore.getActiveEditor();
                if (editor) {
                    const cursor = editor.cursorAt(0);
                    this.updateTab(currentTab.id, {
                        cursor
                    });
                }
            }
            setState$1("tabs", (tabs)=>tabs.map((tab)=>({
                        ...tab,
                        active: tab.id === tabId
                    })));
            this.setActiveTab(tabId);
        },
        async setActiveTab (tabId) {
            if (state$1.activeTabId !== tabId) {
                setState$1("activeTabId", tabId);
                if (tabId) {
                    this.addToLastActiveTabs(tabId);
                    const editor = EditorStore.getActiveEditor();
                    if (editor) {
                        const activeTab = this.activeTab;
                        if (activeTab) {
                            if (!PieceTableStore.getPieceTable(tabId)) {
                                PieceTableStore.addPieceTable(tabId, new PieceTable(activeTab.content || ""));
                            }
                            editor.setPieceTable(PieceTableStore.getPieceTable(tabId));
                            editor.cursorAt(0).moveTo(activeTab.cursor.character, activeTab.cursor.line, editor.lineLength(activeTab.cursor.line), editor.totalLines());
                        }
                    }
                }
                setParserTree({});
                window.api.parseRequest(EditorStore.getActiveEditor().getText());
                window.dispatchEvent(new CustomEvent("tabOpened", {
                    detail: {
                        tabId
                    }
                }));
            }
        },
        getTabContent (tabId) {
            return state$1.tabs.find((t)=>t.id === tabId)?.content || "";
        },
        updateTabContent () {
            createEffect(()=>{
                const activeTab = this.activeTab;
                const editor = EditorStore.getActiveEditor();
                if (activeTab && editor) {
                    this.updateTab(activeTab.id, {
                        content: editor.getText()
                    });
                }
            });
        },
        updateTab (tabId, updates) {
            setState$1("tabs", (tabs)=>tabs.map((tab)=>tab.id === tabId ? {
                        ...tab,
                        ...updates
                    } : tab));
        },
        setTabState (tabId, tabState) {
            this.updateTab(tabId, {
                state: tabState
            });
        },
        setTabSaved (tabId, saved) {
            this.updateTab(tabId, {
                saved
            });
        },
        addToLastActiveTabs (tabId) {
            setState$1("lastActiveTabs", (lastActiveTabs)=>{
                const newLastActiveTabs = [
                    ...lastActiveTabs,
                    tabId
                ].filter((id, index, self)=>self.indexOf(id) === index);
                return newLastActiveTabs;
            });
        },
        removeFromLastActiveTabs (tabId) {
            setState$1("lastActiveTabs", (lastActiveTabs)=>lastActiveTabs.filter((id)=>id !== tabId));
        }
    };
    const [state, setState] = createStore({
        tabContents: {},
        editors: [],
        activeEditorId: null
    });
    const EditorStore = {
        getTabContent (tabId) {
            return state.tabContents[tabId] || "";
        },
        updateTabContent (tabId, content) {
            setState("tabContents", {
                ...state.tabContents,
                [tabId]: content
            });
            TabStore.updateTab(tabId, {
                content,
                state: TabStore.getTabState(tabId)
            });
        },
        saveTab (tabId) {
            TabStore.setTabSaved(tabId, true);
        },
        getEditors () {
            return state.editors;
        },
        getEditor (id) {
            return state.editors.find((e)=>e.id === id);
        },
        addEditor (editor) {
            setState("editors", [
                ...state.editors,
                editor
            ]);
        },
        removeEditor (id) {
            setState("editors", state.editors.filter((e)=>e.id !== id));
        },
        getActiveEditor () {
            return state.editors.find((e)=>e.id === state.activeEditorId);
        },
        setActiveEditor (id) {
            setState("activeEditorId", id);
        },
        getActiveEditorId () {
            return state.activeEditorId;
        },
        setActiveEditorId (id) {
            setState("activeEditorId", id);
        },
        setEditorContent (id, content) {
            const editor = state.editors.find((e)=>e.id === id);
            if (editor) {
                editor.setContent(content);
            }
        }
    };
    const [store, setStore] = createStore({
        fileContent: "",
        folderContent: {
            root: "",
            folders: [],
            files: []
        },
        selectedItems: [],
        firstSelectedIndex: null,
        lastSelectedIndex: null
    });
    const [openFolders, setOpenFolders] = createStore(JSON.parse(localStorage.getItem("openFolders") || "[]"));
    const setFileContent = (content)=>{
        setStore("fileContent", content);
    };
    const setFolderContent = (content)=>{
        setStore("folderContent", content);
    };
    const setSelectedItems = (folders)=>{
        setStore("selectedItems", folders);
    };
    const useFileStore = ()=>store;
    var _tmpl$$l = template(`<svg stroke-width=0>`);
    function IconTemplate(iconSrc, props) {
        const mergedProps = mergeProps(iconSrc.a, props);
        const [_, svgProps] = splitProps(mergedProps, [
            "src"
        ]);
        const [content, setContent] = createSignal("");
        const rawContent = createMemo(()=>props.title ? `${iconSrc.c}<title>${props.title}</title>` : iconSrc.c);
        createEffect(()=>setContent(rawContent()));
        onCleanup(()=>{
            setContent("");
        });
        return (()=>{
            var _el$ = _tmpl$$l();
            spread(_el$, mergeProps({
                get stroke () {
                    return iconSrc.a?.stroke;
                },
                get color () {
                    return props.color || "currentColor";
                },
                get fill () {
                    return props.color || "currentColor";
                },
                get style () {
                    return {
                        ...props.style,
                        overflow: "visible"
                    };
                }
            }, svgProps, {
                get height () {
                    return props.size || "1em";
                },
                get width () {
                    return props.size || "1em";
                },
                "xmlns": "http://www.w3.org/2000/svg",
                get innerHTML () {
                    return content();
                }
            }), true);
            insert(_el$, ()=>isServer);
            return _el$;
        })();
    }
    function VsChevronDown(props) {
        return IconTemplate({
            a: {
                "fill": "currentColor",
                "viewBox": "0 0 16 16"
            },
            c: '<path fill-rule="evenodd" d="m7.976 10.072 4.357-4.357.62.618L8.284 11h-.618L3 6.333l.619-.618 4.357 4.357z" clip-rule="evenodd"/>'
        }, props);
    }
    function VsChevronRight(props) {
        return IconTemplate({
            a: {
                "fill": "currentColor",
                "viewBox": "0 0 16 16"
            },
            c: '<path fill-rule="evenodd" d="M10.072 8.024 5.715 3.667l.618-.62L11 7.716v.618L6.333 13l-.618-.619 4.357-4.357z" clip-rule="evenodd"/>'
        }, props);
    }
    function VsChevronUp(props) {
        return IconTemplate({
            a: {
                "fill": "currentColor",
                "viewBox": "0 0 16 16"
            },
            c: '<path fill-rule="evenodd" d="m8.024 5.928-4.357 4.357-.62-.618L7.716 5h.618L13 9.667l-.619.618-4.357-4.357z" clip-rule="evenodd"/>'
        }, props);
    }
    function VsClose(props) {
        return IconTemplate({
            a: {
                "fill": "currentColor",
                "viewBox": "0 0 16 16"
            },
            c: '<path fill-rule="evenodd" d="m8 8.707 3.646 3.647.708-.707L8.707 8l3.647-3.646-.707-.708L8 7.293 4.354 3.646l-.707.708L7.293 8l-3.646 3.646.707.708L8 8.707z" clip-rule="evenodd"/>'
        }, props);
    }
    function VsCollapseAll(props) {
        return IconTemplate({
            a: {
                "fill": "currentColor",
                "viewBox": "0 0 16 16"
            },
            c: '<path d="M9 9H4v1h5V9z"/><path fill-rule="evenodd" d="m5 3 1-1h7l1 1v7l-1 1h-2v2l-1 1H3l-1-1V6l1-1h2V3zm1 2h4l1 1v4h2V3H6v2zm4 1H3v7h7V6z" clip-rule="evenodd"/>'
        }, props);
    }
    function VsDebug(props) {
        return IconTemplate({
            a: {
                "fill": "currentColor",
                "viewBox": "0 0 24 24"
            },
            c: '<path d="m3.463 12.86-.005-.07.005.07zm7.264.69-3.034-3.049 1.014-1.014 3.209 3.225 3.163-3.163 1.014 1.014-3.034 3.034 3.034 3.05-1.014 1.014-3.209-3.225L8.707 17.6l-1.014-1.014 3.034-3.034z"/><path fill-rule="evenodd" d="M16.933 5.003V6h1.345l2.843-2.842 1.014 1.014-2.692 2.691.033.085a13.75 13.75 0 0 1 .885 4.912c0 .335-.011.667-.034.995l-.005.075h3.54v1.434h-3.72l-.01.058c-.303 1.653-.891 3.16-1.692 4.429l-.06.094 3.423 3.44-1.017 1.012-3.274-3.29-.099.11c-1.479 1.654-3.395 2.646-5.483 2.646-2.12 0-4.063-1.023-5.552-2.723l-.098-.113-3.209 3.208-1.014-1.014 3.366-3.365-.059-.095c-.772-1.25-1.34-2.725-1.636-4.34l-.01-.057H0V12.93h3.538l-.005-.075a14.23 14.23 0 0 1-.034-.995c0-1.743.31-3.39.863-4.854l.032-.084-2.762-2.776L2.65 3.135 5.5 6h1.427v-.997a5.003 5.003 0 0 1 10.006 0zm-8.572 0V6H15.5v-.997a3.569 3.569 0 0 0-7.138 0zm9.8 2.522-.034-.09H5.733l-.034.09a12.328 12.328 0 0 0-.766 4.335c0 2.76.862 5.201 2.184 6.92 1.32 1.716 3.036 2.649 4.813 2.649 1.777 0 3.492-.933 4.813-2.65 1.322-1.718 2.184-4.16 2.184-6.919 0-1.574-.28-3.044-.766-4.335z" clip-rule="evenodd"/>'
        }, props);
    }
    function VsExtensions(props) {
        return IconTemplate({
            a: {
                "fill": "currentColor",
                "viewBox": "0 0 24 24"
            },
            c: '<path fill-rule="evenodd" d="M13.5 1.5 15 0h7.5L24 1.5V9l-1.5 1.5H15L13.5 9V1.5zm1.5 0V9h7.5V1.5H15zM0 15V6l1.5-1.5H9L10.5 6v7.5H18l1.5 1.5v7.5L18 24H1.5L0 22.5V15zm9-1.5V6H1.5v7.5H9zM9 15H1.5v7.5H9V15zm1.5 7.5H18V15h-7.5v7.5z" clip-rule="evenodd"/>'
        }, props);
    }
    function VsFile(props) {
        return IconTemplate({
            a: {
                "fill": "currentColor",
                "viewBox": "0 0 16 16"
            },
            c: '<path fill-rule="evenodd" d="m13.71 4.29-3-3L10 1H4L3 2v12l1 1h9l1-1V5l-.29-.71zM13 14H4V2h5v4h4v8zm-3-9V2l3 3h-3z" clip-rule="evenodd"/>'
        }, props);
    }
    function VsFiles(props) {
        return IconTemplate({
            a: {
                "fill": "currentColor",
                "viewBox": "0 0 24 24"
            },
            c: '<path d="M17.5 0h-9L7 1.5V6H2.5L1 7.5v15.07L2.5 24h12.07L16 22.57V18h4.7l1.3-1.43V4.5L17.5 0zm0 2.12 2.38 2.38H17.5V2.12zm-3 20.38h-12v-15H7v9.07L8.5 18h6v4.5zm6-6h-12v-15H16V6h4.5v10.5z"/>'
        }, props);
    }
    function VsNewFile(props) {
        return IconTemplate({
            a: {
                "fill": "currentColor",
                "viewBox": "0 0 16 16"
            },
            c: '<path fill-rule="evenodd" d="m9.5 1.1 3.4 3.5.1.4v2h-1V6H8V2H3v11h4v1H2.5l-.5-.5v-12l.5-.5h6.7l.3.1zM9 2v3h2.9L9 2zm4 14h-1v-3H9v-1h3V9h1v3h3v1h-3v3z" clip-rule="evenodd"/>'
        }, props);
    }
    function VsNewFolder(props) {
        return IconTemplate({
            a: {
                "fill": "currentColor",
                "viewBox": "0 0 16 16"
            },
            c: '<path fill-rule="evenodd" d="M14.5 2H7.71l-.85-.85L6.51 1h-5l-.5.5v11l.5.5H7v-1H1.99V6h4.49l.35-.15.86-.86H14v1.5l-.001.51h1.011V2.5L14.5 2zm-.51 2h-6.5l-.35.15-.86.86H2v-3h4.29l.85.85.36.15H14l-.01.99zM13 16h-1v-3H9v-1h3V9h1v3h3v1h-3v3z" clip-rule="evenodd"/>'
        }, props);
    }
    function VsRefresh(props) {
        return IconTemplate({
            a: {
                "fill": "currentColor",
                "viewBox": "0 0 16 16"
            },
            c: '<path fill-rule="evenodd" d="M4.681 3H2V2h3.5l.5.5V6H5V4a5 5 0 1 0 4.53-.761l.302-.954A6 6 0 1 1 4.681 3z" clip-rule="evenodd"/>'
        }, props);
    }
    function VsSearch(props) {
        return IconTemplate({
            a: {
                "fill": "currentColor",
                "viewBox": "0 0 24 24"
            },
            c: '<path d="M15.25 0a8.25 8.25 0 0 0-6.18 13.72L1 22.88l1.12 1 8.05-9.12A8.251 8.251 0 1 0 15.25.01V0zm0 15a6.75 6.75 0 1 1 0-13.5 6.75 6.75 0 0 1 0 13.5z"/>'
        }, props);
    }
    function VsSourceControl(props) {
        return IconTemplate({
            a: {
                "fill": "currentColor",
                "viewBox": "0 0 24 24"
            },
            c: '<path d="M21.007 8.222A3.738 3.738 0 0 0 15.045 5.2a3.737 3.737 0 0 0 1.156 6.583 2.988 2.988 0 0 1-2.668 1.67h-2.99a4.456 4.456 0 0 0-2.989 1.165V7.4a3.737 3.737 0 1 0-1.494 0v9.117a3.776 3.776 0 1 0 1.816.099 2.99 2.99 0 0 1 2.668-1.667h2.99a4.484 4.484 0 0 0 4.223-3.039 3.736 3.736 0 0 0 3.25-3.687zM4.565 3.738a2.242 2.242 0 1 1 4.484 0 2.242 2.242 0 0 1-4.484 0zm4.484 16.441a2.242 2.242 0 1 1-4.484 0 2.242 2.242 0 0 1 4.484 0zm8.221-9.715a2.242 2.242 0 1 1 0-4.485 2.242 2.242 0 0 1 0 4.485z"/>'
        }, props);
    }
    const indent$1 = "_indent_wfw31_5";
    const file = "_file_wfw31_1";
    const selected$1 = "_selected_wfw31_44";
    const ignored$1 = "_ignored_wfw31_48";
    const styles$g = {
        "file-container": "_file-container_wfw31_1",
        indent: indent$1,
        file: file,
        "file-name": "_file-name_wfw31_30",
        selected: selected$1,
        ignored: ignored$1
    };
    const tooltip = "_tooltip_1q8ek_1";
    const hidden = "_hidden_1q8ek_19";
    const styles$f = {
        tooltip: tooltip,
        hidden: hidden
    };
    var _tmpl$$k = template(`<div>`);
    const Tooltip = (props)=>{
        const [visible, setVisible] = createSignal(false);
        const [position, setPosition] = createSignal({
            top: 0,
            left: 0
        });
        let showTimeoutId;
        let hideTimeoutId;
        let shouldUpdatePosition = true;
        const updatePosition = (event)=>{
            if (shouldUpdatePosition) {
                setPosition({
                    top: event.clientY + 10,
                    left: event.clientX + 15
                });
            }
        };
        const showTooltip = (event)=>{
            clearTimeout(hideTimeoutId);
            const delay = props.showDelay || 0;
            updatePosition(event);
            showTimeoutId = setTimeout(()=>{
                setVisible(true);
                shouldUpdatePosition = false;
            }, delay);
        };
        const hideTooltip = ()=>{
            clearTimeout(showTimeoutId);
            const delay = props.hideDelay || 0;
            hideTimeoutId = setTimeout(()=>{
                setVisible(false);
                shouldUpdatePosition = true;
            }, delay);
        };
        const handleClick = ()=>{
            clearTimeout(showTimeoutId);
            clearTimeout(hideTimeoutId);
            setVisible(false);
        };
        onCleanup(()=>{
            clearTimeout(showTimeoutId);
            clearTimeout(hideTimeoutId);
        });
        return ((()=>{
            var _el$ = _tmpl$$k();
            _el$.addEventListener("blur", hideTooltip);
            _el$.$$click = handleClick;
            _el$.$$mousemove = updatePosition;
            _el$.addEventListener("focus", (e)=>showTooltip(e));
            _el$.addEventListener("mouseleave", hideTooltip);
            _el$.addEventListener("mouseenter", showTooltip);
            insert(_el$, ()=>props.children, null);
            insert(_el$, createComponent(Portal, {
                get children () {
                    var _el$2 = _tmpl$$k();
                    _el$2.style.setProperty("position", "fixed");
                    insert(_el$2, ()=>props.content);
                    createRenderEffect((_p$)=>{
                        var _v$ = `${styles$f.tooltip} ${!visible() ? styles$f.hidden : ""}`, _v$2 = `${position().top}px`, _v$3 = `${position().left}px`;
                        _v$ !== _p$.e && className(_el$2, _p$.e = _v$);
                        _v$2 !== _p$.t && ((_p$.t = _v$2) != null ? _el$2.style.setProperty("top", _v$2) : _el$2.style.removeProperty("top"));
                        _v$3 !== _p$.a && ((_p$.a = _v$3) != null ? _el$2.style.setProperty("left", _v$3) : _el$2.style.removeProperty("left"));
                        return _p$;
                    }, {
                        e: void 0,
                        t: void 0,
                        a: void 0
                    });
                    return _el$2;
                }
            }), null);
            return _el$;
        })());
    };
    delegateEvents([
        "mousemove",
        "click"
    ]);
    var _tmpl$$j = template(`<div><span>`), _tmpl$2$9 = template(`<div>`);
    const FileItem = (props)=>{
        const fileStore = useFileStore();
        const indentSize = 8;
        const currentIndent = props.indentLevel * indentSize;
        const selected = createMemo(()=>fileStore.selectedItems.includes(props.file));
        const fileName = createMemo(()=>props.file.split("/").pop());
        const handleFileClick = async (e)=>{
            if (e.ctrlKey) {
                toggleFileSelect(props.file);
            } else {
                deselectAllAndSelectItem(props.file);
            }
            TabStore.openTab({
                id: props.file,
                name: props.file.split("/").pop(),
                state: TabState.Untracked,
                editorId: EditorStore.getActiveEditorId()
            });
            const contents = await window.api.getFileContents(props.file);
            EditorStore.setEditorContent("editor1", contents);
            TabStore.updateTab(props.file, {
                content: contents
            });
        };
        const deselectAllAndSelectItem = (file)=>{
            setSelectedItems([
                file
            ]);
        };
        const toggleFileSelect = (file)=>{
            if (selected()) {
                setSelectedItems(fileStore.selectedItems.filter((_file)=>_file !== file));
            } else {
                setSelectedItems([
                    ...fileStore.selectedItems,
                    props.file
                ]);
            }
        };
        return (()=>{
            var _el$ = _tmpl$2$9();
            _el$.$$click = handleFileClick;
            insert(_el$, createComponent(Tooltip, {
                get content () {
                    return props.file;
                },
                showDelay: 500,
                get children () {
                    var _el$2 = _tmpl$$j(), _el$3 = _el$2.firstChild;
                    `${currentIndent}px` != null ? _el$2.style.setProperty("padding-left", `${currentIndent}px`) : _el$2.style.removeProperty("padding-left");
                    insert(_el$2, createComponent(VsFile, {}), _el$3);
                    insert(_el$3, fileName);
                    createRenderEffect((_p$)=>{
                        var _v$ = styles$g.file, _v$2 = styles$g["file-name"];
                        _v$ !== _p$.e && className(_el$2, _p$.e = _v$);
                        _v$2 !== _p$.t && className(_el$3, _p$.t = _v$2);
                        return _p$;
                    }, {
                        e: void 0,
                        t: void 0
                    });
                    return _el$2;
                }
            }));
            createRenderEffect((_p$)=>{
                var _v$3 = `${styles$g["file-container"]} ${selected() ? styles$g.selected : ""} ${props.isIgnored ? styles$g.ignored : ""}`, _v$4 = props.classList;
                _v$3 !== _p$.e && className(_el$, _p$.e = _v$3);
                _p$.t = classList(_el$, _v$4, _p$.t);
                return _p$;
            }, {
                e: void 0,
                t: void 0
            });
            return _el$;
        })();
    };
    delegateEvents([
        "click"
    ]);
    const ignored = "_ignored_1w1py_5";
    const indent = "_indent_1w1py_8";
    const folder = "_folder_1w1py_1";
    const selected = "_selected_1w1py_47";
    const styles$e = {
        "folder-container": "_folder-container_1w1py_1",
        ignored: ignored,
        indent: indent,
        folder: folder,
        "folder-name": "_folder-name_1w1py_33",
        selected: selected
    };
    var _tmpl$$i = template(`<div><span></span><span>`), _tmpl$2$8 = template(`<div>`);
    const FolderItem = (props)=>{
        const indentSize = 8;
        const currentIndent = props.indentLevel * indentSize;
        const [contents, setContents] = createSignal({
            files: [],
            folders: []
        });
        const fileStore = useFileStore();
        const selected = createMemo(()=>fileStore.selectedItems.includes(props.path));
        const isOpen = createMemo(()=>openFolders.includes(props.path));
        const fetchContents = async (path)=>{
            const response = await window.api.getFolderContents(path);
            return {
                files: response.files,
                folders: response.folders.map((folder)=>({
                        name: folder,
                        contents: null
                    }))
            };
        };
        const setIsOpen = async ()=>{
            if (!isOpen()) {
                setOpenFolders([
                    ...openFolders,
                    props.path
                ]);
                if (contents().files.length === 0 && contents().folders.length === 0) {
                    const response = await fetchContents(props.path);
                    setContents(response);
                }
            } else {
                setOpenFolders(openFolders.filter((folder)=>folder !== props.path));
            }
        };
        const toggleFolder = async ()=>{
            await setIsOpen();
        };
        const handleFolderClick = (e)=>{
            if (e.ctrlKey) {
                toggleFolderSelect(props.path);
            } else {
                deselectAllFoldersAndSelect(props.path);
                toggleFolder();
            }
        };
        const deselectAllFoldersAndSelect = (path)=>{
            setSelectedItems([
                path
            ]);
        };
        const toggleFolderSelect = (path)=>{
            if (fileStore.selectedItems.includes(path)) {
                setSelectedItems(fileStore.selectedItems.filter((folder)=>folder !== path));
            } else {
                setSelectedItems([
                    ...fileStore.selectedItems,
                    path
                ]);
            }
        };
        createEffect(async ()=>{
            if (isOpen() && contents().files.length === 0 && contents().folders.length === 0) {
                const response = await fetchContents(props.path);
                setContents(response);
                for (const folder of response.folders){
                    const childPath = `${props.path}/${folder.name}`;
                    if (openFolders.includes(childPath)) {
                        const childResponse = await fetchContents(childPath);
                        setContents((prevContents)=>({
                                files: prevContents.files,
                                folders: prevContents.folders.map((f)=>f.name === folder.name ? {
                                        ...f,
                                        contents: childResponse
                                    } : f)
                            }));
                    }
                }
            }
        });
        return (()=>{
            var _el$ = _tmpl$2$8();
            insert(_el$, createComponent(Tooltip, {
                get content () {
                    return props.path;
                },
                showDelay: 500,
                get children () {
                    var _el$2 = _tmpl$$i(), _el$3 = _el$2.firstChild, _el$4 = _el$3.nextSibling;
                    _el$2.$$click = handleFolderClick;
                    `${currentIndent}px` != null ? _el$2.style.setProperty("padding-left", `${currentIndent}px`) : _el$2.style.removeProperty("padding-left");
                    insert(_el$3, (()=>{
                        var _c$ = createMemo(()=>!!isOpen());
                        return ()=>_c$() ? createComponent(VsChevronDown, {
                                style: {
                                    margin: 0,
                                    padding: 0
                                }
                            }) : createComponent(VsChevronRight, {
                                style: {
                                    margin: 0,
                                    padding: 0
                                }
                            });
                    })());
                    insert(_el$4, ()=>props.folder);
                    createRenderEffect((_p$)=>{
                        var _v$ = `${styles$e.folder} ${selected() ? styles$e.selected : ""} ${props.isIgnored ? styles$e.ignored : ""}`, _v$2 = styles$e["folder-name"];
                        _v$ !== _p$.e && className(_el$2, _p$.e = _v$);
                        _v$2 !== _p$.t && className(_el$4, _p$.t = _v$2);
                        return _p$;
                    }, {
                        e: void 0,
                        t: void 0
                    });
                    return _el$2;
                }
            }), null);
            insert(_el$, (()=>{
                var _c$2 = createMemo(()=>!!isOpen());
                return ()=>_c$2() && (()=>{
                        var _el$5 = _tmpl$2$8();
                        insert(_el$5, createComponent(For, {
                            get each () {
                                return contents().folders;
                            },
                            children: (folder)=>createComponent(FolderItem, {
                                    get isIgnored () {
                                        return props.isIgnored;
                                    },
                                    get folder () {
                                        return folder.name;
                                    },
                                    get path () {
                                        return `${props.path}/${folder.name}`;
                                    },
                                    get indentLevel () {
                                        return props.indentLevel + 1;
                                    }
                                })
                        }), null);
                        insert(_el$5, createComponent(For, {
                            get each () {
                                return contents().files;
                            },
                            children: (file)=>createComponent(FileItem, {
                                    get isIgnored () {
                                        return props.isIgnored;
                                    },
                                    file,
                                    get indentLevel () {
                                        return props.indentLevel + 1;
                                    }
                                })
                        }), null);
                        return _el$5;
                    })();
            })(), null);
            createRenderEffect((_p$)=>{
                var _v$3 = `${styles$e["folder-container"]}`, _v$4 = props.folder;
                _v$3 !== _p$.e && className(_el$, _p$.e = _v$3);
                _v$4 !== _p$.t && setAttribute(_el$, "data-path", _p$.t = _v$4);
                return _p$;
            }, {
                e: void 0,
                t: void 0
            });
            return _el$;
        })();
    };
    delegateEvents([
        "click"
    ]);
    const explorer = "_explorer_psqxo_1";
    const rotateDown = "_rotateDown_psqxo_72";
    const rotateRight = "_rotateRight_psqxo_76";
    const spacer = "_spacer_psqxo_80";
    const styles$d = {
        "explorer-container": "_explorer-container_psqxo_1",
        "explorer-content": "_explorer-content_psqxo_13",
        "explorer-actions": "_explorer-actions_psqxo_18",
        explorer: explorer,
        "explorer-content-header": "_explorer-content-header_psqxo_52",
        "explorer-content-title": "_explorer-content-title_psqxo_62",
        rotateDown: rotateDown,
        rotateRight: rotateRight,
        spacer: spacer,
        "header-gradient": "_header-gradient_psqxo_85",
        "explorer-action": "_explorer-action_psqxo_18"
    };
    var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};
    function getDefaultExportFromCjs(x) {
        return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
    }
    var define_process_env_default = {};
    function makeArray(subject) {
        return Array.isArray(subject) ? subject : [
            subject
        ];
    }
    const EMPTY = "";
    const SPACE = " ";
    const ESCAPE = "\\";
    const REGEX_TEST_BLANK_LINE = /^\s+$/;
    const REGEX_INVALID_TRAILING_BACKSLASH = /(?:[^\\]|^)\\$/;
    const REGEX_REPLACE_LEADING_EXCAPED_EXCLAMATION = /^\\!/;
    const REGEX_REPLACE_LEADING_EXCAPED_HASH = /^\\#/;
    const REGEX_SPLITALL_CRLF = /\r?\n/g;
    const REGEX_TEST_INVALID_PATH = /^\.*\/|^\.+$/;
    const SLASH = "/";
    let TMP_KEY_IGNORE = "node-ignore";
    if (typeof Symbol !== "undefined") {
        TMP_KEY_IGNORE = Symbol.for("node-ignore");
    }
    const KEY_IGNORE = TMP_KEY_IGNORE;
    const define = (object, key, value)=>Object.defineProperty(object, key, {
            value
        });
    const REGEX_REGEXP_RANGE = /([0-z])-([0-z])/g;
    const RETURN_FALSE = ()=>false;
    const sanitizeRange = (range)=>range.replace(REGEX_REGEXP_RANGE, (match, from, to)=>from.charCodeAt(0) <= to.charCodeAt(0) ? match : EMPTY);
    const cleanRangeBackSlash = (slashes)=>{
        const { length } = slashes;
        return slashes.slice(0, length - length % 2);
    };
    const REPLACERS = [
        [
            /^\uFEFF/,
            ()=>EMPTY
        ],
        [
            /\\?\s+$/,
            (match)=>match.indexOf("\\") === 0 ? SPACE : EMPTY
        ],
        [
            /\\\s/g,
            ()=>SPACE
        ],
        [
            /[\\$.|*+(){^]/g,
            (match)=>`\\${match}`
        ],
        [
            /(?!\\)\?/g,
            ()=>"[^/]"
        ],
        [
            /^\//,
            ()=>"^"
        ],
        [
            /\//g,
            ()=>"\\/"
        ],
        [
            /^\^*\\\*\\\*\\\//,
            ()=>"^(?:.*\\/)?"
        ],
        [
            /^(?=[^^])/,
            function startingReplacer() {
                return !/\/(?!$)/.test(this) ? "(?:^|\\/)" : "^";
            }
        ],
        [
            /\\\/\\\*\\\*(?=\\\/|$)/g,
            (_, index, str)=>index + 6 < str.length ? "(?:\\/[^\\/]+)*" : "\\/.+"
        ],
        [
            /(^|[^\\]+)(\\\*)+(?=.+)/g,
            (_, p1, p2)=>{
                const unescaped = p2.replace(/\\\*/g, "[^\\/]*");
                return p1 + unescaped;
            }
        ],
        [
            /\\\\\\(?=[$.|*+(){^])/g,
            ()=>ESCAPE
        ],
        [
            /\\\\/g,
            ()=>ESCAPE
        ],
        [
            /(\\)?\[([^\]/]*?)(\\*)($|\])/g,
            (match, leadEscape, range, endEscape, close)=>leadEscape === ESCAPE ? `\\[${range}${cleanRangeBackSlash(endEscape)}${close}` : close === "]" ? endEscape.length % 2 === 0 ? `[${sanitizeRange(range)}${endEscape}]` : "[]" : "[]"
        ],
        [
            /(?:[^*])$/,
            (match)=>/\/$/.test(match) ? `${match}$` : `${match}(?=$|\\/$)`
        ],
        [
            /(\^|\\\/)?\\\*$/,
            (_, p1)=>{
                const prefix = p1 ? `${p1}[^/]+` : "[^/]*";
                return `${prefix}(?=$|\\/$)`;
            }
        ]
    ];
    const regexCache = Object.create(null);
    const makeRegex = (pattern, ignoreCase)=>{
        let source = regexCache[pattern];
        if (!source) {
            source = REPLACERS.reduce((prev, current)=>prev.replace(current[0], current[1].bind(pattern)), pattern);
            regexCache[pattern] = source;
        }
        return ignoreCase ? new RegExp(source, "i") : new RegExp(source);
    };
    const isString = (subject)=>typeof subject === "string";
    const checkPattern = (pattern)=>pattern && isString(pattern) && !REGEX_TEST_BLANK_LINE.test(pattern) && !REGEX_INVALID_TRAILING_BACKSLASH.test(pattern) && pattern.indexOf("#") !== 0;
    const splitPattern = (pattern)=>pattern.split(REGEX_SPLITALL_CRLF);
    class IgnoreRule {
        constructor(origin, pattern, negative, regex){
            this.origin = origin;
            this.pattern = pattern;
            this.negative = negative;
            this.regex = regex;
        }
    }
    const createRule = (pattern, ignoreCase)=>{
        const origin = pattern;
        let negative = false;
        if (pattern.indexOf("!") === 0) {
            negative = true;
            pattern = pattern.substr(1);
        }
        pattern = pattern.replace(REGEX_REPLACE_LEADING_EXCAPED_EXCLAMATION, "!").replace(REGEX_REPLACE_LEADING_EXCAPED_HASH, "#");
        const regex = makeRegex(pattern, ignoreCase);
        return new IgnoreRule(origin, pattern, negative, regex);
    };
    const throwError = (message, Ctor)=>{
        throw new Ctor(message);
    };
    const checkPath = (path, originalPath, doThrow)=>{
        if (!isString(path)) {
            return doThrow(`path must be a string, but got \`${originalPath}\``, TypeError);
        }
        if (!path) {
            return doThrow(`path must not be empty`, TypeError);
        }
        if (checkPath.isNotRelative(path)) {
            const r = "`path.relative()`d";
            return doThrow(`path should be a ${r} string, but got "${originalPath}"`, RangeError);
        }
        return true;
    };
    const isNotRelative = (path)=>REGEX_TEST_INVALID_PATH.test(path);
    checkPath.isNotRelative = isNotRelative;
    checkPath.convert = (p)=>p;
    class Ignore {
        constructor({ ignorecase = true, ignoreCase = ignorecase, allowRelativePaths = false } = {}){
            define(this, KEY_IGNORE, true);
            this._rules = [];
            this._ignoreCase = ignoreCase;
            this._allowRelativePaths = allowRelativePaths;
            this._initCache();
        }
        _initCache() {
            this._ignoreCache = Object.create(null);
            this._testCache = Object.create(null);
        }
        _addPattern(pattern) {
            if (pattern && pattern[KEY_IGNORE]) {
                this._rules = this._rules.concat(pattern._rules);
                this._added = true;
                return;
            }
            if (checkPattern(pattern)) {
                const rule = createRule(pattern, this._ignoreCase);
                this._added = true;
                this._rules.push(rule);
            }
        }
        add(pattern) {
            this._added = false;
            makeArray(isString(pattern) ? splitPattern(pattern) : pattern).forEach(this._addPattern, this);
            if (this._added) {
                this._initCache();
            }
            return this;
        }
        addPattern(pattern) {
            return this.add(pattern);
        }
        _testOne(path, checkUnignored) {
            let ignored = false;
            let unignored = false;
            this._rules.forEach((rule)=>{
                const { negative } = rule;
                if (unignored === negative && ignored !== unignored || negative && !ignored && !unignored && !checkUnignored) {
                    return;
                }
                const matched = rule.regex.test(path);
                if (matched) {
                    ignored = !negative;
                    unignored = negative;
                }
            });
            return {
                ignored,
                unignored
            };
        }
        _test(originalPath, cache, checkUnignored, slices) {
            const path = originalPath && checkPath.convert(originalPath);
            checkPath(path, originalPath, this._allowRelativePaths ? RETURN_FALSE : throwError);
            return this._t(path, cache, checkUnignored, slices);
        }
        _t(path, cache, checkUnignored, slices) {
            if (path in cache) {
                return cache[path];
            }
            if (!slices) {
                slices = path.split(SLASH);
            }
            slices.pop();
            if (!slices.length) {
                return cache[path] = this._testOne(path, checkUnignored);
            }
            const parent = this._t(slices.join(SLASH) + SLASH, cache, checkUnignored, slices);
            return cache[path] = parent.ignored ? parent : this._testOne(path, checkUnignored);
        }
        ignores(path) {
            return this._test(path, this._ignoreCache, false).ignored;
        }
        createFilter() {
            return (path)=>!this.ignores(path);
        }
        filter(paths) {
            return makeArray(paths).filter(this.createFilter());
        }
        test(path) {
            return this._test(path, this._testCache, true);
        }
    }
    const factory = (options)=>new Ignore(options);
    const isPathValid = (path)=>checkPath(path && checkPath.convert(path), path, RETURN_FALSE);
    factory.isPathValid = isPathValid;
    factory.default = factory;
    var ignore = factory;
    if (typeof process !== "undefined" && (define_process_env_default && define_process_env_default.IGNORE_TEST_WIN32 || process.platform === "win32")) {
        const makePosix = (str)=>/^\\\\\?\\/.test(str) || /["<>|\u0000-\u001F]+/u.test(str) ? str : str.replace(/\\/g, "/");
        checkPath.convert = makePosix;
        const REGIX_IS_WINDOWS_PATH_ABSOLUTE = /^[a-z]:\//i;
        checkPath.isNotRelative = (path)=>REGIX_IS_WINDOWS_PATH_ABSOLUTE.test(path) || isNotRelative(path);
    }
    const ignore$1 = getDefaultExportFromCjs(ignore);
    var _tmpl$$h = template(`<div>`), _tmpl$2$7 = template(`<div><div><h3></h3></div><div><button type=button></button><button type=button></button><button type=button></button><button type=button>`), _tmpl$3$2 = template(`<div><div>`);
    const Explorer = ()=>{
        const [rootOpen, setRootOpen] = createSignal(true);
        const [explorerHeight, setExplorerHeight] = createSignal(null);
        const fileStore = useFileStore();
        const [explorerScroll, setExplorerScroll] = createSignal(0);
        const [gitIgnoreContent, setGitIgnoreContent] = createSignal("");
        const [ignoredFiles, setIgnoredFiles] = createSignal(new Set());
        let explorerRef;
        let headerRef;
        const api = window.api;
        const projectRoot = fileStore.folderContent.root;
        const readGitignoreFile = async (path)=>{
            return await api.sendReadFileRequest(path);
        };
        const parseGitignore = (content)=>{
            const ig = ignore$1();
            ig.add(content.split("\n").map((line)=>line.replaceAll("/", "")));
            return ig;
        };
        const watchGitignoreFile = async (gitignorePath)=>{
            await api.fsWatch(gitignorePath);
            api.onFileChanged(async (_, filename)=>{
                if (filename === gitignorePath) {
                    const newContent = await readGitignoreFile(gitignorePath);
                    setGitIgnoreContent(newContent);
                }
            });
        };
        createEffect(async ()=>{
            if (gitIgnoreContent()) {
                const ig = parseGitignore(gitIgnoreContent());
                const updateIgnoredFiles = ()=>{
                    const allFiles = [
                        ...fileStore.folderContent.files,
                        ...fileStore.folderContent.folders
                    ];
                    const ignoredSet = new Set();
                    for (const file of allFiles){
                        const relativePath = api.relativePath(projectRoot, file);
                        if (ig.ignores(relativePath)) {
                            ignoredSet.add(file);
                        }
                    }
                    setIgnoredFiles(ignoredSet);
                };
                updateIgnoredFiles();
            }
        });
        createEffect(async ()=>{
            const gitignorePath = api.joinPath(projectRoot, ".gitignore");
            const gitignoreContent = await readGitignoreFile(gitignorePath);
            setGitIgnoreContent(gitignoreContent);
            watchGitignoreFile(gitignorePath);
            api.onFileRead((_, response)=>{
                if (response.path === gitignorePath) {
                    setGitIgnoreContent(response.data);
                }
            });
        });
        createEffect(()=>{
            api.onFileOpened((_, response)=>{
                setFileContent(response.data);
                TabStore.openTab({
                    editorId: "editor1",
                    id: response.path,
                    name: response.path.split("/").pop(),
                    state: TabState.Untracked
                });
            });
            api.onFolderOpened(async (_, response)=>{
                if (!response || !response.files) {
                    console.error("Invalid folder response:", response);
                    return;
                }
                await fetchAndSetFolderContents(response);
                setTimeout(()=>{
                    updateExplorerHeight();
                }, 0);
            });
        });
        const fetchAndSetFolderContents = async (response)=>{
            const files = [];
            const folders = [];
            if (!response.files) return;
            const fullPaths = await Promise.all(response.files.map(async (file)=>{
                const fullPath = api.joinPath(response.path, file);
                const isDirectory = await api.isDirectory(fullPath);
                return {
                    name: file,
                    path: fullPath,
                    isDirectory
                };
            }));
            for (const result of fullPaths){
                if (result.isDirectory) {
                    folders.push(result.name);
                } else {
                    files.push(result.path);
                }
            }
            setFolderContent({
                root: response.path,
                folders,
                files
            });
        };
        const handleNewFolderClick = ()=>{
            const lastSelectedFolder = fileStore.selectedItems.filter((item)=>item.endsWith("/")).slice(-1)[0];
            if (lastSelectedFolder) {
                const folderPath = lastSelectedFolder;
                const newFolderName = "newfolder/";
                const newFolderPath = `${folderPath}${newFolderName}`;
                api.createFolder(newFolderPath).catch((error)=>{
                    console.error(`Failed to create folder: ${newFolderPath}`, error);
                });
            } else {
                const lastSelectedFile = fileStore.selectedItems.filter((item)=>!item.endsWith("/")).slice(-1)[0];
                if (lastSelectedFile) {
                    const parentFolderPath = lastSelectedFile.substring(0, lastSelectedFile.lastIndexOf("/") + 1);
                    const newFolderName = "newfolder/";
                    const newFolderPath = `${parentFolderPath}${newFolderName}`;
                    api.createFolder(newFolderPath).then(()=>{
                        console.info(`Folder created successfully at ${newFolderPath}`);
                    }).catch((error)=>{
                        console.error(`Failed to create folder: ${newFolderPath}`, error);
                    });
                } else {
                    console.error("No folder or file selected");
                }
            }
        };
        const handleNewFileClick = (e)=>{
            const lastSelectedFolder = fileStore.selectedItems.filter((item)=>item.endsWith("/")).slice(-1)[0];
            if (lastSelectedFolder) {
                const folderPath = lastSelectedFolder;
                const newFileName = "newfile";
                const newFilePath = `${folderPath}${newFileName}`;
                api.createFile(newFilePath).then(()=>{
                    console.info(`File created successfully at ${newFilePath}`);
                }).catch((error)=>{
                    console.error(`Failed to create file: ${newFilePath}`, error);
                });
            } else {
                const lastSelectedFile = fileStore.selectedItems.filter((item)=>!item.endsWith("/")).slice(-1)[0];
                if (lastSelectedFile) {
                    const parentFolderPath = lastSelectedFile.substring(0, lastSelectedFile.lastIndexOf("/") + 1);
                    const newFileName = "newfile";
                    const newFilePath = `${parentFolderPath}${newFileName}`;
                    api.createFile(newFilePath).then(()=>{
                        console.info(`File created successfully at ${newFilePath}`);
                    }).catch((error)=>{
                        console.error(`Failed to create file: ${newFilePath}`, error);
                    });
                } else {
                    console.error("No folder or file selected");
                }
            }
        };
        const clearOpenFolders = (e)=>{
            e.preventDefault();
            e.stopPropagation();
            setOpenFolders([]);
        };
        const refreshFolders = async ()=>{
            fetchAndSetFolderContents({
                path: fileStore.folderContent.root,
                files: [
                    ...fileStore.folderContent.folders,
                    ...fileStore.folderContent.files
                ]
            });
            toggleRootOpen();
        };
        const toggleRootOpen = ()=>{
            setRootOpen(!rootOpen());
            if (!rootOpen()) setExplorerScroll(0);
        };
        const updateExplorerHeight = ()=>{
            if (explorerRef && headerRef) {
                const availableHeight = document.querySelector("#Files")?.clientHeight - 62;
                setExplorerHeight(availableHeight);
            }
        };
        onMount(()=>{
            updateExplorerHeight();
            window.addEventListener("resize", updateExplorerHeight);
            onCleanup(()=>{
                window.removeEventListener("resize", updateExplorerHeight);
            });
        });
        const renderExplorerContent = ()=>{
            return (()=>{
                var _el$ = _tmpl$$h();
                insert(_el$, (()=>{
                    var _c$ = createMemo(()=>fileStore.folderContent.root.length !== 0);
                    return ()=>_c$() && (()=>{
                            var _el$2 = _tmpl$2$7(), _el$3 = _el$2.firstChild, _el$4 = _el$3.firstChild, _el$5 = _el$3.nextSibling, _el$6 = _el$5.firstChild, _el$7 = _el$6.nextSibling, _el$8 = _el$7.nextSibling, _el$9 = _el$8.nextSibling;
                            var _ref$ = headerRef;
                            typeof _ref$ === "function" ? use(_ref$, _el$2) : headerRef = _el$2;
                            _el$2.$$click = toggleRootOpen;
                            insert(_el$2, createComponent(VsChevronDown, {
                                get ["class"] () {
                                    return rootOpen() ? styles$d.rotateDown : styles$d.rotateRight;
                                }
                            }), _el$3);
                            insert(_el$4, ()=>fileStore.folderContent.root.split("/").pop());
                            _el$6.$$click = (e)=>handleNewFileClick();
                            insert(_el$6, createComponent(VsNewFile, {
                                "font-size": "16"
                            }));
                            _el$7.$$click = (e)=>handleNewFolderClick();
                            insert(_el$7, createComponent(VsNewFolder, {
                                "font-size": "16"
                            }));
                            _el$8.$$click = ()=>refreshFolders();
                            insert(_el$8, createComponent(VsRefresh, {
                                "font-size": "16"
                            }));
                            _el$9.$$click = (e)=>clearOpenFolders(e);
                            insert(_el$9, createComponent(VsCollapseAll, {
                                "font-size": "16"
                            }));
                            createRenderEffect((_p$)=>{
                                var _v$ = `${styles$d["explorer-content-header"]} ${explorerScroll() !== 0 && rootOpen() ? styles$d["header-gradient"] : ""}`, _v$2 = styles$d["explorer-content-title"], _v$3 = styles$d["explorer-actions"], _v$4 = `${styles$d["explorer-action"]} no-button-style`, _v$5 = `${styles$d["explorer-action"]} no-button-style`, _v$6 = `${styles$d["explorer-action"]} no-button-style`, _v$7 = `${styles$d["explorer-action"]} no-button-style`;
                                _v$ !== _p$.e && className(_el$2, _p$.e = _v$);
                                _v$2 !== _p$.t && className(_el$3, _p$.t = _v$2);
                                _v$3 !== _p$.a && className(_el$5, _p$.a = _v$3);
                                _v$4 !== _p$.o && className(_el$6, _p$.o = _v$4);
                                _v$5 !== _p$.i && className(_el$7, _p$.i = _v$5);
                                _v$6 !== _p$.n && className(_el$8, _p$.n = _v$6);
                                _v$7 !== _p$.s && className(_el$9, _p$.s = _v$7);
                                return _p$;
                            }, {
                                e: void 0,
                                t: void 0,
                                a: void 0,
                                o: void 0,
                                i: void 0,
                                n: void 0,
                                s: void 0
                            });
                            return _el$2;
                        })();
                })(), null);
                insert(_el$, (()=>{
                    var _c$2 = createMemo(()=>!!rootOpen());
                    return ()=>_c$2() && (()=>{
                            var _el$10 = _tmpl$3$2(), _el$11 = _el$10.firstChild;
                            _el$10.addEventListener("scroll", (event)=>setExplorerScroll(event.target.scrollTop));
                            var _ref$2 = explorerRef;
                            typeof _ref$2 === "function" ? use(_ref$2, _el$10) : explorerRef = _el$10;
                            _el$10.style.setProperty("overflow-y", "auto");
                            insert(_el$10, createComponent(For, {
                                get each () {
                                    return fileStore.folderContent.folders;
                                },
                                children: (folder)=>createComponent(FolderItem, {
                                        folder,
                                        get path () {
                                            return `${fileStore.folderContent.root}/${folder}/`;
                                        },
                                        indentLevel: 1,
                                        get isIgnored () {
                                            return ignoredFiles().has(api.relativePath(projectRoot, api.joinPath(fileStore.folderContent.root, folder)));
                                        }
                                    })
                            }), _el$11);
                            insert(_el$10, createComponent(For, {
                                get each () {
                                    return fileStore.folderContent.files;
                                },
                                children: (file)=>createComponent(FileItem, {
                                        get isIgnored () {
                                            return ignoredFiles().has(file);
                                        },
                                        file,
                                        indentLevel: 1
                                    })
                            }), _el$11);
                            createRenderEffect((_p$)=>{
                                var _v$8 = styles$d.explorer, _v$9 = explorerHeight() ? `${explorerHeight()}px` : "auto", _v$10 = styles$d.spacer;
                                _v$8 !== _p$.e && className(_el$10, _p$.e = _v$8);
                                _v$9 !== _p$.t && ((_p$.t = _v$9) != null ? _el$10.style.setProperty("height", _v$9) : _el$10.style.removeProperty("height"));
                                _v$10 !== _p$.a && className(_el$11, _p$.a = _v$10);
                                return _p$;
                            }, {
                                e: void 0,
                                t: void 0,
                                a: void 0
                            });
                            return _el$10;
                        })();
                })(), null);
                createRenderEffect(()=>className(_el$, styles$d["explorer-content"]));
                return _el$;
            })();
        };
        return (()=>{
            var _el$12 = _tmpl$$h();
            _el$12.style.setProperty("width", "100%");
            insert(_el$12, renderExplorerContent);
            return _el$12;
        })();
    };
    delegateEvents([
        "click"
    ]);
    var _tmpl$$g = template(`<h2>Extensions`);
    const Extensions = ()=>{
        return _tmpl$$g();
    };
    var _tmpl$$f = template(`<h2>Run And Debug`);
    const RunAndDebug = ()=>{
        return _tmpl$$f();
    };
    const styles$c = {
        "search-container": "_search-container_jl6en_1",
        "search-bar": "_search-bar_jl6en_10",
        "search-input": "_search-input_jl6en_14",
        "search-results": "_search-results_jl6en_26",
        "no-results": "_no-results_jl6en_37",
        "search-result": "_search-result_jl6en_26",
        "result-match-data": "_result-match-data_jl6en_63",
        "result-ref-chevron": "_result-ref-chevron_jl6en_66",
        "result-ref": "_result-ref_jl6en_66",
        "result-ref-container": "_result-ref-container_jl6en_77",
        "result-ref-name": "_result-ref-name_jl6en_83",
        "result-match-count": "_result-match-count_jl6en_88",
        "match-context": "_match-context_jl6en_96"
    };
    var lodash = {
        exports: {}
    };
    lodash.exports;
    (function(module, exports) {
        (function() {
            var undefined$1;
            var VERSION = '4.17.21';
            var LARGE_ARRAY_SIZE = 200;
            var CORE_ERROR_TEXT = 'Unsupported core-js use. Try https://npms.io/search?q=ponyfill.', FUNC_ERROR_TEXT = 'Expected a function', INVALID_TEMPL_VAR_ERROR_TEXT = 'Invalid `variable` option passed into `_.template`';
            var HASH_UNDEFINED = '__lodash_hash_undefined__';
            var MAX_MEMOIZE_SIZE = 500;
            var PLACEHOLDER = '__lodash_placeholder__';
            var CLONE_DEEP_FLAG = 1, CLONE_FLAT_FLAG = 2, CLONE_SYMBOLS_FLAG = 4;
            var COMPARE_PARTIAL_FLAG = 1, COMPARE_UNORDERED_FLAG = 2;
            var WRAP_BIND_FLAG = 1, WRAP_BIND_KEY_FLAG = 2, WRAP_CURRY_BOUND_FLAG = 4, WRAP_CURRY_FLAG = 8, WRAP_CURRY_RIGHT_FLAG = 16, WRAP_PARTIAL_FLAG = 32, WRAP_PARTIAL_RIGHT_FLAG = 64, WRAP_ARY_FLAG = 128, WRAP_REARG_FLAG = 256, WRAP_FLIP_FLAG = 512;
            var DEFAULT_TRUNC_LENGTH = 30, DEFAULT_TRUNC_OMISSION = '...';
            var HOT_COUNT = 800, HOT_SPAN = 16;
            var LAZY_FILTER_FLAG = 1, LAZY_MAP_FLAG = 2, LAZY_WHILE_FLAG = 3;
            var INFINITY = 1 / 0, MAX_SAFE_INTEGER = 9007199254740991, MAX_INTEGER = 1.7976931348623157e+308, NAN = 0 / 0;
            var MAX_ARRAY_LENGTH = 4294967295, MAX_ARRAY_INDEX = MAX_ARRAY_LENGTH - 1, HALF_MAX_ARRAY_LENGTH = MAX_ARRAY_LENGTH >>> 1;
            var wrapFlags = [
                [
                    'ary',
                    WRAP_ARY_FLAG
                ],
                [
                    'bind',
                    WRAP_BIND_FLAG
                ],
                [
                    'bindKey',
                    WRAP_BIND_KEY_FLAG
                ],
                [
                    'curry',
                    WRAP_CURRY_FLAG
                ],
                [
                    'curryRight',
                    WRAP_CURRY_RIGHT_FLAG
                ],
                [
                    'flip',
                    WRAP_FLIP_FLAG
                ],
                [
                    'partial',
                    WRAP_PARTIAL_FLAG
                ],
                [
                    'partialRight',
                    WRAP_PARTIAL_RIGHT_FLAG
                ],
                [
                    'rearg',
                    WRAP_REARG_FLAG
                ]
            ];
            var argsTag = '[object Arguments]', arrayTag = '[object Array]', asyncTag = '[object AsyncFunction]', boolTag = '[object Boolean]', dateTag = '[object Date]', domExcTag = '[object DOMException]', errorTag = '[object Error]', funcTag = '[object Function]', genTag = '[object GeneratorFunction]', mapTag = '[object Map]', numberTag = '[object Number]', nullTag = '[object Null]', objectTag = '[object Object]', promiseTag = '[object Promise]', proxyTag = '[object Proxy]', regexpTag = '[object RegExp]', setTag = '[object Set]', stringTag = '[object String]', symbolTag = '[object Symbol]', undefinedTag = '[object Undefined]', weakMapTag = '[object WeakMap]', weakSetTag = '[object WeakSet]';
            var arrayBufferTag = '[object ArrayBuffer]', dataViewTag = '[object DataView]', float32Tag = '[object Float32Array]', float64Tag = '[object Float64Array]', int8Tag = '[object Int8Array]', int16Tag = '[object Int16Array]', int32Tag = '[object Int32Array]', uint8Tag = '[object Uint8Array]', uint8ClampedTag = '[object Uint8ClampedArray]', uint16Tag = '[object Uint16Array]', uint32Tag = '[object Uint32Array]';
            var reEmptyStringLeading = /\b__p \+= '';/g, reEmptyStringMiddle = /\b(__p \+=) '' \+/g, reEmptyStringTrailing = /(__e\(.*?\)|\b__t\)) \+\n'';/g;
            var reEscapedHtml = /&(?:amp|lt|gt|quot|#39);/g, reUnescapedHtml = /[&<>"']/g, reHasEscapedHtml = RegExp(reEscapedHtml.source), reHasUnescapedHtml = RegExp(reUnescapedHtml.source);
            var reEscape = /<%-([\s\S]+?)%>/g, reEvaluate = /<%([\s\S]+?)%>/g, reInterpolate = /<%=([\s\S]+?)%>/g;
            var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/, reIsPlainProp = /^\w*$/, rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;
            var reRegExpChar = /[\\^$.*+?()[\]{}|]/g, reHasRegExpChar = RegExp(reRegExpChar.source);
            var reTrimStart = /^\s+/;
            var reWhitespace = /\s/;
            var reWrapComment = /\{(?:\n\/\* \[wrapped with .+\] \*\/)?\n?/, reWrapDetails = /\{\n\/\* \[wrapped with (.+)\] \*/, reSplitDetails = /,? & /;
            var reAsciiWord = /[^\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\x7f]+/g;
            var reForbiddenIdentifierChars = /[()=,{}\[\]\/\s]/;
            var reEscapeChar = /\\(\\)?/g;
            var reEsTemplate = /\$\{([^\\}]*(?:\\.[^\\}]*)*)\}/g;
            var reFlags = /\w*$/;
            var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;
            var reIsBinary = /^0b[01]+$/i;
            var reIsHostCtor = /^\[object .+?Constructor\]$/;
            var reIsOctal = /^0o[0-7]+$/i;
            var reIsUint = /^(?:0|[1-9]\d*)$/;
            var reLatin = /[\xc0-\xd6\xd8-\xf6\xf8-\xff\u0100-\u017f]/g;
            var reNoMatch = /($^)/;
            var reUnescapedString = /['\n\r\u2028\u2029\\]/g;
            var rsAstralRange = '\\ud800-\\udfff', rsComboMarksRange = '\\u0300-\\u036f', reComboHalfMarksRange = '\\ufe20-\\ufe2f', rsComboSymbolsRange = '\\u20d0-\\u20ff', rsComboRange = rsComboMarksRange + reComboHalfMarksRange + rsComboSymbolsRange, rsDingbatRange = '\\u2700-\\u27bf', rsLowerRange = 'a-z\\xdf-\\xf6\\xf8-\\xff', rsMathOpRange = '\\xac\\xb1\\xd7\\xf7', rsNonCharRange = '\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf', rsPunctuationRange = '\\u2000-\\u206f', rsSpaceRange = ' \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000', rsUpperRange = 'A-Z\\xc0-\\xd6\\xd8-\\xde', rsVarRange = '\\ufe0e\\ufe0f', rsBreakRange = rsMathOpRange + rsNonCharRange + rsPunctuationRange + rsSpaceRange;
            var rsApos = "['\u2019]", rsAstral = '[' + rsAstralRange + ']', rsBreak = '[' + rsBreakRange + ']', rsCombo = '[' + rsComboRange + ']', rsDigits = '\\d+', rsDingbat = '[' + rsDingbatRange + ']', rsLower = '[' + rsLowerRange + ']', rsMisc = '[^' + rsAstralRange + rsBreakRange + rsDigits + rsDingbatRange + rsLowerRange + rsUpperRange + ']', rsFitz = '\\ud83c[\\udffb-\\udfff]', rsModifier = '(?:' + rsCombo + '|' + rsFitz + ')', rsNonAstral = '[^' + rsAstralRange + ']', rsRegional = '(?:\\ud83c[\\udde6-\\uddff]){2}', rsSurrPair = '[\\ud800-\\udbff][\\udc00-\\udfff]', rsUpper = '[' + rsUpperRange + ']', rsZWJ = '\\u200d';
            var rsMiscLower = '(?:' + rsLower + '|' + rsMisc + ')', rsMiscUpper = '(?:' + rsUpper + '|' + rsMisc + ')', rsOptContrLower = '(?:' + rsApos + '(?:d|ll|m|re|s|t|ve))?', rsOptContrUpper = '(?:' + rsApos + '(?:D|LL|M|RE|S|T|VE))?', reOptMod = rsModifier + '?', rsOptVar = '[' + rsVarRange + ']?', rsOptJoin = '(?:' + rsZWJ + '(?:' + [
                rsNonAstral,
                rsRegional,
                rsSurrPair
            ].join('|') + ')' + rsOptVar + reOptMod + ')*', rsOrdLower = '\\d*(?:1st|2nd|3rd|(?![123])\\dth)(?=\\b|[A-Z_])', rsOrdUpper = '\\d*(?:1ST|2ND|3RD|(?![123])\\dTH)(?=\\b|[a-z_])', rsSeq = rsOptVar + reOptMod + rsOptJoin, rsEmoji = '(?:' + [
                rsDingbat,
                rsRegional,
                rsSurrPair
            ].join('|') + ')' + rsSeq, rsSymbol = '(?:' + [
                rsNonAstral + rsCombo + '?',
                rsCombo,
                rsRegional,
                rsSurrPair,
                rsAstral
            ].join('|') + ')';
            var reApos = RegExp(rsApos, 'g');
            var reComboMark = RegExp(rsCombo, 'g');
            var reUnicode = RegExp(rsFitz + '(?=' + rsFitz + ')|' + rsSymbol + rsSeq, 'g');
            var reUnicodeWord = RegExp([
                rsUpper + '?' + rsLower + '+' + rsOptContrLower + '(?=' + [
                    rsBreak,
                    rsUpper,
                    '$'
                ].join('|') + ')',
                rsMiscUpper + '+' + rsOptContrUpper + '(?=' + [
                    rsBreak,
                    rsUpper + rsMiscLower,
                    '$'
                ].join('|') + ')',
                rsUpper + '?' + rsMiscLower + '+' + rsOptContrLower,
                rsUpper + '+' + rsOptContrUpper,
                rsOrdUpper,
                rsOrdLower,
                rsDigits,
                rsEmoji
            ].join('|'), 'g');
            var reHasUnicode = RegExp('[' + rsZWJ + rsAstralRange + rsComboRange + rsVarRange + ']');
            var reHasUnicodeWord = /[a-z][A-Z]|[A-Z]{2}[a-z]|[0-9][a-zA-Z]|[a-zA-Z][0-9]|[^a-zA-Z0-9 ]/;
            var contextProps = [
                'Array',
                'Buffer',
                'DataView',
                'Date',
                'Error',
                'Float32Array',
                'Float64Array',
                'Function',
                'Int8Array',
                'Int16Array',
                'Int32Array',
                'Map',
                'Math',
                'Object',
                'Promise',
                'RegExp',
                'Set',
                'String',
                'Symbol',
                'TypeError',
                'Uint8Array',
                'Uint8ClampedArray',
                'Uint16Array',
                'Uint32Array',
                'WeakMap',
                '_',
                'clearTimeout',
                'isFinite',
                'parseInt',
                'setTimeout'
            ];
            var templateCounter = -1;
            var typedArrayTags = {};
            typedArrayTags[float32Tag] = typedArrayTags[float64Tag] = typedArrayTags[int8Tag] = typedArrayTags[int16Tag] = typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] = typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] = typedArrayTags[uint32Tag] = true;
            typedArrayTags[argsTag] = typedArrayTags[arrayTag] = typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] = typedArrayTags[dataViewTag] = typedArrayTags[dateTag] = typedArrayTags[errorTag] = typedArrayTags[funcTag] = typedArrayTags[mapTag] = typedArrayTags[numberTag] = typedArrayTags[objectTag] = typedArrayTags[regexpTag] = typedArrayTags[setTag] = typedArrayTags[stringTag] = typedArrayTags[weakMapTag] = false;
            var cloneableTags = {};
            cloneableTags[argsTag] = cloneableTags[arrayTag] = cloneableTags[arrayBufferTag] = cloneableTags[dataViewTag] = cloneableTags[boolTag] = cloneableTags[dateTag] = cloneableTags[float32Tag] = cloneableTags[float64Tag] = cloneableTags[int8Tag] = cloneableTags[int16Tag] = cloneableTags[int32Tag] = cloneableTags[mapTag] = cloneableTags[numberTag] = cloneableTags[objectTag] = cloneableTags[regexpTag] = cloneableTags[setTag] = cloneableTags[stringTag] = cloneableTags[symbolTag] = cloneableTags[uint8Tag] = cloneableTags[uint8ClampedTag] = cloneableTags[uint16Tag] = cloneableTags[uint32Tag] = true;
            cloneableTags[errorTag] = cloneableTags[funcTag] = cloneableTags[weakMapTag] = false;
            var deburredLetters = {
                '\xc0': 'A',
                '\xc1': 'A',
                '\xc2': 'A',
                '\xc3': 'A',
                '\xc4': 'A',
                '\xc5': 'A',
                '\xe0': 'a',
                '\xe1': 'a',
                '\xe2': 'a',
                '\xe3': 'a',
                '\xe4': 'a',
                '\xe5': 'a',
                '\xc7': 'C',
                '\xe7': 'c',
                '\xd0': 'D',
                '\xf0': 'd',
                '\xc8': 'E',
                '\xc9': 'E',
                '\xca': 'E',
                '\xcb': 'E',
                '\xe8': 'e',
                '\xe9': 'e',
                '\xea': 'e',
                '\xeb': 'e',
                '\xcc': 'I',
                '\xcd': 'I',
                '\xce': 'I',
                '\xcf': 'I',
                '\xec': 'i',
                '\xed': 'i',
                '\xee': 'i',
                '\xef': 'i',
                '\xd1': 'N',
                '\xf1': 'n',
                '\xd2': 'O',
                '\xd3': 'O',
                '\xd4': 'O',
                '\xd5': 'O',
                '\xd6': 'O',
                '\xd8': 'O',
                '\xf2': 'o',
                '\xf3': 'o',
                '\xf4': 'o',
                '\xf5': 'o',
                '\xf6': 'o',
                '\xf8': 'o',
                '\xd9': 'U',
                '\xda': 'U',
                '\xdb': 'U',
                '\xdc': 'U',
                '\xf9': 'u',
                '\xfa': 'u',
                '\xfb': 'u',
                '\xfc': 'u',
                '\xdd': 'Y',
                '\xfd': 'y',
                '\xff': 'y',
                '\xc6': 'Ae',
                '\xe6': 'ae',
                '\xde': 'Th',
                '\xfe': 'th',
                '\xdf': 'ss',
                '\u0100': 'A',
                '\u0102': 'A',
                '\u0104': 'A',
                '\u0101': 'a',
                '\u0103': 'a',
                '\u0105': 'a',
                '\u0106': 'C',
                '\u0108': 'C',
                '\u010a': 'C',
                '\u010c': 'C',
                '\u0107': 'c',
                '\u0109': 'c',
                '\u010b': 'c',
                '\u010d': 'c',
                '\u010e': 'D',
                '\u0110': 'D',
                '\u010f': 'd',
                '\u0111': 'd',
                '\u0112': 'E',
                '\u0114': 'E',
                '\u0116': 'E',
                '\u0118': 'E',
                '\u011a': 'E',
                '\u0113': 'e',
                '\u0115': 'e',
                '\u0117': 'e',
                '\u0119': 'e',
                '\u011b': 'e',
                '\u011c': 'G',
                '\u011e': 'G',
                '\u0120': 'G',
                '\u0122': 'G',
                '\u011d': 'g',
                '\u011f': 'g',
                '\u0121': 'g',
                '\u0123': 'g',
                '\u0124': 'H',
                '\u0126': 'H',
                '\u0125': 'h',
                '\u0127': 'h',
                '\u0128': 'I',
                '\u012a': 'I',
                '\u012c': 'I',
                '\u012e': 'I',
                '\u0130': 'I',
                '\u0129': 'i',
                '\u012b': 'i',
                '\u012d': 'i',
                '\u012f': 'i',
                '\u0131': 'i',
                '\u0134': 'J',
                '\u0135': 'j',
                '\u0136': 'K',
                '\u0137': 'k',
                '\u0138': 'k',
                '\u0139': 'L',
                '\u013b': 'L',
                '\u013d': 'L',
                '\u013f': 'L',
                '\u0141': 'L',
                '\u013a': 'l',
                '\u013c': 'l',
                '\u013e': 'l',
                '\u0140': 'l',
                '\u0142': 'l',
                '\u0143': 'N',
                '\u0145': 'N',
                '\u0147': 'N',
                '\u014a': 'N',
                '\u0144': 'n',
                '\u0146': 'n',
                '\u0148': 'n',
                '\u014b': 'n',
                '\u014c': 'O',
                '\u014e': 'O',
                '\u0150': 'O',
                '\u014d': 'o',
                '\u014f': 'o',
                '\u0151': 'o',
                '\u0154': 'R',
                '\u0156': 'R',
                '\u0158': 'R',
                '\u0155': 'r',
                '\u0157': 'r',
                '\u0159': 'r',
                '\u015a': 'S',
                '\u015c': 'S',
                '\u015e': 'S',
                '\u0160': 'S',
                '\u015b': 's',
                '\u015d': 's',
                '\u015f': 's',
                '\u0161': 's',
                '\u0162': 'T',
                '\u0164': 'T',
                '\u0166': 'T',
                '\u0163': 't',
                '\u0165': 't',
                '\u0167': 't',
                '\u0168': 'U',
                '\u016a': 'U',
                '\u016c': 'U',
                '\u016e': 'U',
                '\u0170': 'U',
                '\u0172': 'U',
                '\u0169': 'u',
                '\u016b': 'u',
                '\u016d': 'u',
                '\u016f': 'u',
                '\u0171': 'u',
                '\u0173': 'u',
                '\u0174': 'W',
                '\u0175': 'w',
                '\u0176': 'Y',
                '\u0177': 'y',
                '\u0178': 'Y',
                '\u0179': 'Z',
                '\u017b': 'Z',
                '\u017d': 'Z',
                '\u017a': 'z',
                '\u017c': 'z',
                '\u017e': 'z',
                '\u0132': 'IJ',
                '\u0133': 'ij',
                '\u0152': 'Oe',
                '\u0153': 'oe',
                '\u0149': "'n",
                '\u017f': 's'
            };
            var htmlEscapes = {
                '&': '&amp;',
                '<': '&lt;',
                '>': '&gt;',
                '"': '&quot;',
                "'": '&#39;'
            };
            var htmlUnescapes = {
                '&amp;': '&',
                '&lt;': '<',
                '&gt;': '>',
                '&quot;': '"',
                '&#39;': "'"
            };
            var stringEscapes = {
                '\\': '\\',
                "'": "'",
                '\n': 'n',
                '\r': 'r',
                '\u2028': 'u2028',
                '\u2029': 'u2029'
            };
            var freeParseFloat = parseFloat, freeParseInt = parseInt;
            var freeGlobal = typeof commonjsGlobal == 'object' && commonjsGlobal && commonjsGlobal.Object === Object && commonjsGlobal;
            var freeSelf = typeof self == 'object' && self && self.Object === Object && self;
            var root = freeGlobal || freeSelf || Function('return this')();
            var freeExports = exports && !exports.nodeType && exports;
            var freeModule = freeExports && 'object' == 'object' && module && !module.nodeType && module;
            var moduleExports = freeModule && freeModule.exports === freeExports;
            var freeProcess = moduleExports && freeGlobal.process;
            var nodeUtil = (function() {
                try {
                    var types = freeModule && freeModule.require && freeModule.require('util').types;
                    if (types) {
                        return types;
                    }
                    return freeProcess && freeProcess.binding && freeProcess.binding('util');
                } catch (e) {}
            }());
            var nodeIsArrayBuffer = nodeUtil && nodeUtil.isArrayBuffer, nodeIsDate = nodeUtil && nodeUtil.isDate, nodeIsMap = nodeUtil && nodeUtil.isMap, nodeIsRegExp = nodeUtil && nodeUtil.isRegExp, nodeIsSet = nodeUtil && nodeUtil.isSet, nodeIsTypedArray = nodeUtil && nodeUtil.isTypedArray;
            function apply(func, thisArg, args) {
                switch(args.length){
                    case 0:
                        return func.call(thisArg);
                    case 1:
                        return func.call(thisArg, args[0]);
                    case 2:
                        return func.call(thisArg, args[0], args[1]);
                    case 3:
                        return func.call(thisArg, args[0], args[1], args[2]);
                }
                return func.apply(thisArg, args);
            }
            function arrayAggregator(array, setter, iteratee, accumulator) {
                var index = -1, length = array == null ? 0 : array.length;
                while(++index < length){
                    var value = array[index];
                    setter(accumulator, value, iteratee(value), array);
                }
                return accumulator;
            }
            function arrayEach(array, iteratee) {
                var index = -1, length = array == null ? 0 : array.length;
                while(++index < length){
                    if (iteratee(array[index], index, array) === false) {
                        break;
                    }
                }
                return array;
            }
            function arrayEachRight(array, iteratee) {
                var length = array == null ? 0 : array.length;
                while(length--){
                    if (iteratee(array[length], length, array) === false) {
                        break;
                    }
                }
                return array;
            }
            function arrayEvery(array, predicate) {
                var index = -1, length = array == null ? 0 : array.length;
                while(++index < length){
                    if (!predicate(array[index], index, array)) {
                        return false;
                    }
                }
                return true;
            }
            function arrayFilter(array, predicate) {
                var index = -1, length = array == null ? 0 : array.length, resIndex = 0, result = [];
                while(++index < length){
                    var value = array[index];
                    if (predicate(value, index, array)) {
                        result[resIndex++] = value;
                    }
                }
                return result;
            }
            function arrayIncludes(array, value) {
                var length = array == null ? 0 : array.length;
                return !!length && baseIndexOf(array, value, 0) > -1;
            }
            function arrayIncludesWith(array, value, comparator) {
                var index = -1, length = array == null ? 0 : array.length;
                while(++index < length){
                    if (comparator(value, array[index])) {
                        return true;
                    }
                }
                return false;
            }
            function arrayMap(array, iteratee) {
                var index = -1, length = array == null ? 0 : array.length, result = Array(length);
                while(++index < length){
                    result[index] = iteratee(array[index], index, array);
                }
                return result;
            }
            function arrayPush(array, values) {
                var index = -1, length = values.length, offset = array.length;
                while(++index < length){
                    array[offset + index] = values[index];
                }
                return array;
            }
            function arrayReduce(array, iteratee, accumulator, initAccum) {
                var index = -1, length = array == null ? 0 : array.length;
                if (initAccum && length) {
                    accumulator = array[++index];
                }
                while(++index < length){
                    accumulator = iteratee(accumulator, array[index], index, array);
                }
                return accumulator;
            }
            function arrayReduceRight(array, iteratee, accumulator, initAccum) {
                var length = array == null ? 0 : array.length;
                if (initAccum && length) {
                    accumulator = array[--length];
                }
                while(length--){
                    accumulator = iteratee(accumulator, array[length], length, array);
                }
                return accumulator;
            }
            function arraySome(array, predicate) {
                var index = -1, length = array == null ? 0 : array.length;
                while(++index < length){
                    if (predicate(array[index], index, array)) {
                        return true;
                    }
                }
                return false;
            }
            var asciiSize = baseProperty('length');
            function asciiToArray(string) {
                return string.split('');
            }
            function asciiWords(string) {
                return string.match(reAsciiWord) || [];
            }
            function baseFindKey(collection, predicate, eachFunc) {
                var result;
                eachFunc(collection, function(value, key, collection) {
                    if (predicate(value, key, collection)) {
                        result = key;
                        return false;
                    }
                });
                return result;
            }
            function baseFindIndex(array, predicate, fromIndex, fromRight) {
                var length = array.length, index = fromIndex + (fromRight ? 1 : -1);
                while((fromRight ? index-- : ++index < length)){
                    if (predicate(array[index], index, array)) {
                        return index;
                    }
                }
                return -1;
            }
            function baseIndexOf(array, value, fromIndex) {
                return value === value ? strictIndexOf(array, value, fromIndex) : baseFindIndex(array, baseIsNaN, fromIndex);
            }
            function baseIndexOfWith(array, value, fromIndex, comparator) {
                var index = fromIndex - 1, length = array.length;
                while(++index < length){
                    if (comparator(array[index], value)) {
                        return index;
                    }
                }
                return -1;
            }
            function baseIsNaN(value) {
                return value !== value;
            }
            function baseMean(array, iteratee) {
                var length = array == null ? 0 : array.length;
                return length ? (baseSum(array, iteratee) / length) : NAN;
            }
            function baseProperty(key) {
                return function(object) {
                    return object == null ? undefined$1 : object[key];
                };
            }
            function basePropertyOf(object) {
                return function(key) {
                    return object == null ? undefined$1 : object[key];
                };
            }
            function baseReduce(collection, iteratee, accumulator, initAccum, eachFunc) {
                eachFunc(collection, function(value, index, collection) {
                    accumulator = initAccum ? (initAccum = false, value) : iteratee(accumulator, value, index, collection);
                });
                return accumulator;
            }
            function baseSortBy(array, comparer) {
                var length = array.length;
                array.sort(comparer);
                while(length--){
                    array[length] = array[length].value;
                }
                return array;
            }
            function baseSum(array, iteratee) {
                var result, index = -1, length = array.length;
                while(++index < length){
                    var current = iteratee(array[index]);
                    if (current !== undefined$1) {
                        result = result === undefined$1 ? current : (result + current);
                    }
                }
                return result;
            }
            function baseTimes(n, iteratee) {
                var index = -1, result = Array(n);
                while(++index < n){
                    result[index] = iteratee(index);
                }
                return result;
            }
            function baseToPairs(object, props) {
                return arrayMap(props, function(key) {
                    return [
                        key,
                        object[key]
                    ];
                });
            }
            function baseTrim(string) {
                return string ? string.slice(0, trimmedEndIndex(string) + 1).replace(reTrimStart, '') : string;
            }
            function baseUnary(func) {
                return function(value) {
                    return func(value);
                };
            }
            function baseValues(object, props) {
                return arrayMap(props, function(key) {
                    return object[key];
                });
            }
            function cacheHas(cache, key) {
                return cache.has(key);
            }
            function charsStartIndex(strSymbols, chrSymbols) {
                var index = -1, length = strSymbols.length;
                while(++index < length && baseIndexOf(chrSymbols, strSymbols[index], 0) > -1){}
                return index;
            }
            function charsEndIndex(strSymbols, chrSymbols) {
                var index = strSymbols.length;
                while(index-- && baseIndexOf(chrSymbols, strSymbols[index], 0) > -1){}
                return index;
            }
            function countHolders(array, placeholder) {
                var length = array.length, result = 0;
                while(length--){
                    if (array[length] === placeholder) {
                        ++result;
                    }
                }
                return result;
            }
            var deburrLetter = basePropertyOf(deburredLetters);
            var escapeHtmlChar = basePropertyOf(htmlEscapes);
            function escapeStringChar(chr) {
                return '\\' + stringEscapes[chr];
            }
            function getValue(object, key) {
                return object == null ? undefined$1 : object[key];
            }
            function hasUnicode(string) {
                return reHasUnicode.test(string);
            }
            function hasUnicodeWord(string) {
                return reHasUnicodeWord.test(string);
            }
            function iteratorToArray(iterator) {
                var data, result = [];
                while(!(data = iterator.next()).done){
                    result.push(data.value);
                }
                return result;
            }
            function mapToArray(map) {
                var index = -1, result = Array(map.size);
                map.forEach(function(value, key) {
                    result[++index] = [
                        key,
                        value
                    ];
                });
                return result;
            }
            function overArg(func, transform) {
                return function(arg) {
                    return func(transform(arg));
                };
            }
            function replaceHolders(array, placeholder) {
                var index = -1, length = array.length, resIndex = 0, result = [];
                while(++index < length){
                    var value = array[index];
                    if (value === placeholder || value === PLACEHOLDER) {
                        array[index] = PLACEHOLDER;
                        result[resIndex++] = index;
                    }
                }
                return result;
            }
            function setToArray(set) {
                var index = -1, result = Array(set.size);
                set.forEach(function(value) {
                    result[++index] = value;
                });
                return result;
            }
            function setToPairs(set) {
                var index = -1, result = Array(set.size);
                set.forEach(function(value) {
                    result[++index] = [
                        value,
                        value
                    ];
                });
                return result;
            }
            function strictIndexOf(array, value, fromIndex) {
                var index = fromIndex - 1, length = array.length;
                while(++index < length){
                    if (array[index] === value) {
                        return index;
                    }
                }
                return -1;
            }
            function strictLastIndexOf(array, value, fromIndex) {
                var index = fromIndex + 1;
                while(index--){
                    if (array[index] === value) {
                        return index;
                    }
                }
                return index;
            }
            function stringSize(string) {
                return hasUnicode(string) ? unicodeSize(string) : asciiSize(string);
            }
            function stringToArray(string) {
                return hasUnicode(string) ? unicodeToArray(string) : asciiToArray(string);
            }
            function trimmedEndIndex(string) {
                var index = string.length;
                while(index-- && reWhitespace.test(string.charAt(index))){}
                return index;
            }
            var unescapeHtmlChar = basePropertyOf(htmlUnescapes);
            function unicodeSize(string) {
                var result = reUnicode.lastIndex = 0;
                while(reUnicode.test(string)){
                    ++result;
                }
                return result;
            }
            function unicodeToArray(string) {
                return string.match(reUnicode) || [];
            }
            function unicodeWords(string) {
                return string.match(reUnicodeWord) || [];
            }
            var runInContext = (function runInContext(context) {
                context = context == null ? root : _.defaults(root.Object(), context, _.pick(root, contextProps));
                var Array = context.Array, Date = context.Date, Error = context.Error, Function = context.Function, Math = context.Math, Object = context.Object, RegExp = context.RegExp, String = context.String, TypeError = context.TypeError;
                var arrayProto = Array.prototype, funcProto = Function.prototype, objectProto = Object.prototype;
                var coreJsData = context['__core-js_shared__'];
                var funcToString = funcProto.toString;
                var hasOwnProperty = objectProto.hasOwnProperty;
                var idCounter = 0;
                var maskSrcKey = (function() {
                    var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || '');
                    return uid ? ('Symbol(src)_1.' + uid) : '';
                }());
                var nativeObjectToString = objectProto.toString;
                var objectCtorString = funcToString.call(Object);
                var oldDash = root._;
                var reIsNative = RegExp('^' + funcToString.call(hasOwnProperty).replace(reRegExpChar, '\\$&').replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$');
                var Buffer = moduleExports ? context.Buffer : undefined$1, Symbol = context.Symbol, Uint8Array = context.Uint8Array, allocUnsafe = Buffer ? Buffer.allocUnsafe : undefined$1, getPrototype = overArg(Object.getPrototypeOf, Object), objectCreate = Object.create, propertyIsEnumerable = objectProto.propertyIsEnumerable, splice = arrayProto.splice, spreadableSymbol = Symbol ? Symbol.isConcatSpreadable : undefined$1, symIterator = Symbol ? Symbol.iterator : undefined$1, symToStringTag = Symbol ? Symbol.toStringTag : undefined$1;
                var defineProperty = (function() {
                    try {
                        var func = getNative(Object, 'defineProperty');
                        func({}, '', {});
                        return func;
                    } catch (e) {}
                }());
                var ctxClearTimeout = context.clearTimeout !== root.clearTimeout && context.clearTimeout, ctxNow = Date && Date.now !== root.Date.now && Date.now, ctxSetTimeout = context.setTimeout !== root.setTimeout && context.setTimeout;
                var nativeCeil = Math.ceil, nativeFloor = Math.floor, nativeGetSymbols = Object.getOwnPropertySymbols, nativeIsBuffer = Buffer ? Buffer.isBuffer : undefined$1, nativeIsFinite = context.isFinite, nativeJoin = arrayProto.join, nativeKeys = overArg(Object.keys, Object), nativeMax = Math.max, nativeMin = Math.min, nativeNow = Date.now, nativeParseInt = context.parseInt, nativeRandom = Math.random, nativeReverse = arrayProto.reverse;
                var DataView = getNative(context, 'DataView'), Map = getNative(context, 'Map'), Promise = getNative(context, 'Promise'), Set = getNative(context, 'Set'), WeakMap = getNative(context, 'WeakMap'), nativeCreate = getNative(Object, 'create');
                var metaMap = WeakMap && new WeakMap;
                var realNames = {};
                var dataViewCtorString = toSource(DataView), mapCtorString = toSource(Map), promiseCtorString = toSource(Promise), setCtorString = toSource(Set), weakMapCtorString = toSource(WeakMap);
                var symbolProto = Symbol ? Symbol.prototype : undefined$1, symbolValueOf = symbolProto ? symbolProto.valueOf : undefined$1, symbolToString = symbolProto ? symbolProto.toString : undefined$1;
                function lodash(value) {
                    if (isObjectLike(value) && !isArray(value) && !(value instanceof LazyWrapper)) {
                        if (value instanceof LodashWrapper) {
                            return value;
                        }
                        if (hasOwnProperty.call(value, '__wrapped__')) {
                            return wrapperClone(value);
                        }
                    }
                    return new LodashWrapper(value);
                }
                var baseCreate = (function() {
                    function object() {}
                    return function(proto) {
                        if (!isObject(proto)) {
                            return {};
                        }
                        if (objectCreate) {
                            return objectCreate(proto);
                        }
                        object.prototype = proto;
                        var result = new object;
                        object.prototype = undefined$1;
                        return result;
                    };
                }());
                function baseLodash() {}
                function LodashWrapper(value, chainAll) {
                    this.__wrapped__ = value;
                    this.__actions__ = [];
                    this.__chain__ = !!chainAll;
                    this.__index__ = 0;
                    this.__values__ = undefined$1;
                }
                lodash.templateSettings = {
                    'escape': reEscape,
                    'evaluate': reEvaluate,
                    'interpolate': reInterpolate,
                    'variable': '',
                    'imports': {
                        '_': lodash
                    }
                };
                lodash.prototype = baseLodash.prototype;
                lodash.prototype.constructor = lodash;
                LodashWrapper.prototype = baseCreate(baseLodash.prototype);
                LodashWrapper.prototype.constructor = LodashWrapper;
                function LazyWrapper(value) {
                    this.__wrapped__ = value;
                    this.__actions__ = [];
                    this.__dir__ = 1;
                    this.__filtered__ = false;
                    this.__iteratees__ = [];
                    this.__takeCount__ = MAX_ARRAY_LENGTH;
                    this.__views__ = [];
                }
                function lazyClone() {
                    var result = new LazyWrapper(this.__wrapped__);
                    result.__actions__ = copyArray(this.__actions__);
                    result.__dir__ = this.__dir__;
                    result.__filtered__ = this.__filtered__;
                    result.__iteratees__ = copyArray(this.__iteratees__);
                    result.__takeCount__ = this.__takeCount__;
                    result.__views__ = copyArray(this.__views__);
                    return result;
                }
                function lazyReverse() {
                    if (this.__filtered__) {
                        var result = new LazyWrapper(this);
                        result.__dir__ = -1;
                        result.__filtered__ = true;
                    } else {
                        result = this.clone();
                        result.__dir__ *= -1;
                    }
                    return result;
                }
                function lazyValue() {
                    var array = this.__wrapped__.value(), dir = this.__dir__, isArr = isArray(array), isRight = dir < 0, arrLength = isArr ? array.length : 0, view = getView(0, arrLength, this.__views__), start = view.start, end = view.end, length = end - start, index = isRight ? end : (start - 1), iteratees = this.__iteratees__, iterLength = iteratees.length, resIndex = 0, takeCount = nativeMin(length, this.__takeCount__);
                    if (!isArr || (!isRight && arrLength == length && takeCount == length)) {
                        return baseWrapperValue(array, this.__actions__);
                    }
                    var result = [];
                    outer: while(length-- && resIndex < takeCount){
                        index += dir;
                        var iterIndex = -1, value = array[index];
                        while(++iterIndex < iterLength){
                            var data = iteratees[iterIndex], iteratee = data.iteratee, type = data.type, computed = iteratee(value);
                            if (type == LAZY_MAP_FLAG) {
                                value = computed;
                            } else if (!computed) {
                                if (type == LAZY_FILTER_FLAG) {
                                    continue outer;
                                } else {
                                    break outer;
                                }
                            }
                        }
                        result[resIndex++] = value;
                    }
                    return result;
                }
                LazyWrapper.prototype = baseCreate(baseLodash.prototype);
                LazyWrapper.prototype.constructor = LazyWrapper;
                function Hash(entries) {
                    var index = -1, length = entries == null ? 0 : entries.length;
                    this.clear();
                    while(++index < length){
                        var entry = entries[index];
                        this.set(entry[0], entry[1]);
                    }
                }
                function hashClear() {
                    this.__data__ = nativeCreate ? nativeCreate(null) : {};
                    this.size = 0;
                }
                function hashDelete(key) {
                    var result = this.has(key) && delete this.__data__[key];
                    this.size -= result ? 1 : 0;
                    return result;
                }
                function hashGet(key) {
                    var data = this.__data__;
                    if (nativeCreate) {
                        var result = data[key];
                        return result === HASH_UNDEFINED ? undefined$1 : result;
                    }
                    return hasOwnProperty.call(data, key) ? data[key] : undefined$1;
                }
                function hashHas(key) {
                    var data = this.__data__;
                    return nativeCreate ? (data[key] !== undefined$1) : hasOwnProperty.call(data, key);
                }
                function hashSet(key, value) {
                    var data = this.__data__;
                    this.size += this.has(key) ? 0 : 1;
                    data[key] = (nativeCreate && value === undefined$1) ? HASH_UNDEFINED : value;
                    return this;
                }
                Hash.prototype.clear = hashClear;
                Hash.prototype['delete'] = hashDelete;
                Hash.prototype.get = hashGet;
                Hash.prototype.has = hashHas;
                Hash.prototype.set = hashSet;
                function ListCache(entries) {
                    var index = -1, length = entries == null ? 0 : entries.length;
                    this.clear();
                    while(++index < length){
                        var entry = entries[index];
                        this.set(entry[0], entry[1]);
                    }
                }
                function listCacheClear() {
                    this.__data__ = [];
                    this.size = 0;
                }
                function listCacheDelete(key) {
                    var data = this.__data__, index = assocIndexOf(data, key);
                    if (index < 0) {
                        return false;
                    }
                    var lastIndex = data.length - 1;
                    if (index == lastIndex) {
                        data.pop();
                    } else {
                        splice.call(data, index, 1);
                    }
                    --this.size;
                    return true;
                }
                function listCacheGet(key) {
                    var data = this.__data__, index = assocIndexOf(data, key);
                    return index < 0 ? undefined$1 : data[index][1];
                }
                function listCacheHas(key) {
                    return assocIndexOf(this.__data__, key) > -1;
                }
                function listCacheSet(key, value) {
                    var data = this.__data__, index = assocIndexOf(data, key);
                    if (index < 0) {
                        ++this.size;
                        data.push([
                            key,
                            value
                        ]);
                    } else {
                        data[index][1] = value;
                    }
                    return this;
                }
                ListCache.prototype.clear = listCacheClear;
                ListCache.prototype['delete'] = listCacheDelete;
                ListCache.prototype.get = listCacheGet;
                ListCache.prototype.has = listCacheHas;
                ListCache.prototype.set = listCacheSet;
                function MapCache(entries) {
                    var index = -1, length = entries == null ? 0 : entries.length;
                    this.clear();
                    while(++index < length){
                        var entry = entries[index];
                        this.set(entry[0], entry[1]);
                    }
                }
                function mapCacheClear() {
                    this.size = 0;
                    this.__data__ = {
                        'hash': new Hash,
                        'map': new (Map || ListCache),
                        'string': new Hash
                    };
                }
                function mapCacheDelete(key) {
                    var result = getMapData(this, key)['delete'](key);
                    this.size -= result ? 1 : 0;
                    return result;
                }
                function mapCacheGet(key) {
                    return getMapData(this, key).get(key);
                }
                function mapCacheHas(key) {
                    return getMapData(this, key).has(key);
                }
                function mapCacheSet(key, value) {
                    var data = getMapData(this, key), size = data.size;
                    data.set(key, value);
                    this.size += data.size == size ? 0 : 1;
                    return this;
                }
                MapCache.prototype.clear = mapCacheClear;
                MapCache.prototype['delete'] = mapCacheDelete;
                MapCache.prototype.get = mapCacheGet;
                MapCache.prototype.has = mapCacheHas;
                MapCache.prototype.set = mapCacheSet;
                function SetCache(values) {
                    var index = -1, length = values == null ? 0 : values.length;
                    this.__data__ = new MapCache;
                    while(++index < length){
                        this.add(values[index]);
                    }
                }
                function setCacheAdd(value) {
                    this.__data__.set(value, HASH_UNDEFINED);
                    return this;
                }
                function setCacheHas(value) {
                    return this.__data__.has(value);
                }
                SetCache.prototype.add = SetCache.prototype.push = setCacheAdd;
                SetCache.prototype.has = setCacheHas;
                function Stack(entries) {
                    var data = this.__data__ = new ListCache(entries);
                    this.size = data.size;
                }
                function stackClear() {
                    this.__data__ = new ListCache;
                    this.size = 0;
                }
                function stackDelete(key) {
                    var data = this.__data__, result = data['delete'](key);
                    this.size = data.size;
                    return result;
                }
                function stackGet(key) {
                    return this.__data__.get(key);
                }
                function stackHas(key) {
                    return this.__data__.has(key);
                }
                function stackSet(key, value) {
                    var data = this.__data__;
                    if (data instanceof ListCache) {
                        var pairs = data.__data__;
                        if (!Map || (pairs.length < LARGE_ARRAY_SIZE - 1)) {
                            pairs.push([
                                key,
                                value
                            ]);
                            this.size = ++data.size;
                            return this;
                        }
                        data = this.__data__ = new MapCache(pairs);
                    }
                    data.set(key, value);
                    this.size = data.size;
                    return this;
                }
                Stack.prototype.clear = stackClear;
                Stack.prototype['delete'] = stackDelete;
                Stack.prototype.get = stackGet;
                Stack.prototype.has = stackHas;
                Stack.prototype.set = stackSet;
                function arrayLikeKeys(value, inherited) {
                    var isArr = isArray(value), isArg = !isArr && isArguments(value), isBuff = !isArr && !isArg && isBuffer(value), isType = !isArr && !isArg && !isBuff && isTypedArray(value), skipIndexes = isArr || isArg || isBuff || isType, result = skipIndexes ? baseTimes(value.length, String) : [], length = result.length;
                    for(var key in value){
                        if ((inherited || hasOwnProperty.call(value, key)) && !(skipIndexes && (key == 'length' || (isBuff && (key == 'offset' || key == 'parent')) || (isType && (key == 'buffer' || key == 'byteLength' || key == 'byteOffset')) || isIndex(key, length)))) {
                            result.push(key);
                        }
                    }
                    return result;
                }
                function arraySample(array) {
                    var length = array.length;
                    return length ? array[baseRandom(0, length - 1)] : undefined$1;
                }
                function arraySampleSize(array, n) {
                    return shuffleSelf(copyArray(array), baseClamp(n, 0, array.length));
                }
                function arrayShuffle(array) {
                    return shuffleSelf(copyArray(array));
                }
                function assignMergeValue(object, key, value) {
                    if ((value !== undefined$1 && !eq(object[key], value)) || (value === undefined$1 && !(key in object))) {
                        baseAssignValue(object, key, value);
                    }
                }
                function assignValue(object, key, value) {
                    var objValue = object[key];
                    if (!(hasOwnProperty.call(object, key) && eq(objValue, value)) || (value === undefined$1 && !(key in object))) {
                        baseAssignValue(object, key, value);
                    }
                }
                function assocIndexOf(array, key) {
                    var length = array.length;
                    while(length--){
                        if (eq(array[length][0], key)) {
                            return length;
                        }
                    }
                    return -1;
                }
                function baseAggregator(collection, setter, iteratee, accumulator) {
                    baseEach(collection, function(value, key, collection) {
                        setter(accumulator, value, iteratee(value), collection);
                    });
                    return accumulator;
                }
                function baseAssign(object, source) {
                    return object && copyObject(source, keys(source), object);
                }
                function baseAssignIn(object, source) {
                    return object && copyObject(source, keysIn(source), object);
                }
                function baseAssignValue(object, key, value) {
                    if (key == '__proto__' && defineProperty) {
                        defineProperty(object, key, {
                            'configurable': true,
                            'enumerable': true,
                            'value': value,
                            'writable': true
                        });
                    } else {
                        object[key] = value;
                    }
                }
                function baseAt(object, paths) {
                    var index = -1, length = paths.length, result = Array(length), skip = object == null;
                    while(++index < length){
                        result[index] = skip ? undefined$1 : get(object, paths[index]);
                    }
                    return result;
                }
                function baseClamp(number, lower, upper) {
                    if (number === number) {
                        if (upper !== undefined$1) {
                            number = number <= upper ? number : upper;
                        }
                        if (lower !== undefined$1) {
                            number = number >= lower ? number : lower;
                        }
                    }
                    return number;
                }
                function baseClone(value, bitmask, customizer, key, object, stack) {
                    var result, isDeep = bitmask & CLONE_DEEP_FLAG, isFlat = bitmask & CLONE_FLAT_FLAG, isFull = bitmask & CLONE_SYMBOLS_FLAG;
                    if (customizer) {
                        result = object ? customizer(value, key, object, stack) : customizer(value);
                    }
                    if (result !== undefined$1) {
                        return result;
                    }
                    if (!isObject(value)) {
                        return value;
                    }
                    var isArr = isArray(value);
                    if (isArr) {
                        result = initCloneArray(value);
                        if (!isDeep) {
                            return copyArray(value, result);
                        }
                    } else {
                        var tag = getTag(value), isFunc = tag == funcTag || tag == genTag;
                        if (isBuffer(value)) {
                            return cloneBuffer(value, isDeep);
                        }
                        if (tag == objectTag || tag == argsTag || (isFunc && !object)) {
                            result = (isFlat || isFunc) ? {} : initCloneObject(value);
                            if (!isDeep) {
                                return isFlat ? copySymbolsIn(value, baseAssignIn(result, value)) : copySymbols(value, baseAssign(result, value));
                            }
                        } else {
                            if (!cloneableTags[tag]) {
                                return object ? value : {};
                            }
                            result = initCloneByTag(value, tag, isDeep);
                        }
                    }
                    stack || (stack = new Stack);
                    var stacked = stack.get(value);
                    if (stacked) {
                        return stacked;
                    }
                    stack.set(value, result);
                    if (isSet(value)) {
                        value.forEach(function(subValue) {
                            result.add(baseClone(subValue, bitmask, customizer, subValue, value, stack));
                        });
                    } else if (isMap(value)) {
                        value.forEach(function(subValue, key) {
                            result.set(key, baseClone(subValue, bitmask, customizer, key, value, stack));
                        });
                    }
                    var keysFunc = isFull ? (isFlat ? getAllKeysIn : getAllKeys) : (isFlat ? keysIn : keys);
                    var props = isArr ? undefined$1 : keysFunc(value);
                    arrayEach(props || value, function(subValue, key) {
                        if (props) {
                            key = subValue;
                            subValue = value[key];
                        }
                        assignValue(result, key, baseClone(subValue, bitmask, customizer, key, value, stack));
                    });
                    return result;
                }
                function baseConforms(source) {
                    var props = keys(source);
                    return function(object) {
                        return baseConformsTo(object, source, props);
                    };
                }
                function baseConformsTo(object, source, props) {
                    var length = props.length;
                    if (object == null) {
                        return !length;
                    }
                    object = Object(object);
                    while(length--){
                        var key = props[length], predicate = source[key], value = object[key];
                        if ((value === undefined$1 && !(key in object)) || !predicate(value)) {
                            return false;
                        }
                    }
                    return true;
                }
                function baseDelay(func, wait, args) {
                    if (typeof func != 'function') {
                        throw new TypeError(FUNC_ERROR_TEXT);
                    }
                    return setTimeout(function() {
                        func.apply(undefined$1, args);
                    }, wait);
                }
                function baseDifference(array, values, iteratee, comparator) {
                    var index = -1, includes = arrayIncludes, isCommon = true, length = array.length, result = [], valuesLength = values.length;
                    if (!length) {
                        return result;
                    }
                    if (iteratee) {
                        values = arrayMap(values, baseUnary(iteratee));
                    }
                    if (comparator) {
                        includes = arrayIncludesWith;
                        isCommon = false;
                    } else if (values.length >= LARGE_ARRAY_SIZE) {
                        includes = cacheHas;
                        isCommon = false;
                        values = new SetCache(values);
                    }
                    outer: while(++index < length){
                        var value = array[index], computed = iteratee == null ? value : iteratee(value);
                        value = (comparator || value !== 0) ? value : 0;
                        if (isCommon && computed === computed) {
                            var valuesIndex = valuesLength;
                            while(valuesIndex--){
                                if (values[valuesIndex] === computed) {
                                    continue outer;
                                }
                            }
                            result.push(value);
                        } else if (!includes(values, computed, comparator)) {
                            result.push(value);
                        }
                    }
                    return result;
                }
                var baseEach = createBaseEach(baseForOwn);
                var baseEachRight = createBaseEach(baseForOwnRight, true);
                function baseEvery(collection, predicate) {
                    var result = true;
                    baseEach(collection, function(value, index, collection) {
                        result = !!predicate(value, index, collection);
                        return result;
                    });
                    return result;
                }
                function baseExtremum(array, iteratee, comparator) {
                    var index = -1, length = array.length;
                    while(++index < length){
                        var value = array[index], current = iteratee(value);
                        if (current != null && (computed === undefined$1 ? (current === current && !isSymbol(current)) : comparator(current, computed))) {
                            var computed = current, result = value;
                        }
                    }
                    return result;
                }
                function baseFill(array, value, start, end) {
                    var length = array.length;
                    start = toInteger(start);
                    if (start < 0) {
                        start = -start > length ? 0 : (length + start);
                    }
                    end = (end === undefined$1 || end > length) ? length : toInteger(end);
                    if (end < 0) {
                        end += length;
                    }
                    end = start > end ? 0 : toLength(end);
                    while(start < end){
                        array[start++] = value;
                    }
                    return array;
                }
                function baseFilter(collection, predicate) {
                    var result = [];
                    baseEach(collection, function(value, index, collection) {
                        if (predicate(value, index, collection)) {
                            result.push(value);
                        }
                    });
                    return result;
                }
                function baseFlatten(array, depth, predicate, isStrict, result) {
                    var index = -1, length = array.length;
                    predicate || (predicate = isFlattenable);
                    result || (result = []);
                    while(++index < length){
                        var value = array[index];
                        if (depth > 0 && predicate(value)) {
                            if (depth > 1) {
                                baseFlatten(value, depth - 1, predicate, isStrict, result);
                            } else {
                                arrayPush(result, value);
                            }
                        } else if (!isStrict) {
                            result[result.length] = value;
                        }
                    }
                    return result;
                }
                var baseFor = createBaseFor();
                var baseForRight = createBaseFor(true);
                function baseForOwn(object, iteratee) {
                    return object && baseFor(object, iteratee, keys);
                }
                function baseForOwnRight(object, iteratee) {
                    return object && baseForRight(object, iteratee, keys);
                }
                function baseFunctions(object, props) {
                    return arrayFilter(props, function(key) {
                        return isFunction(object[key]);
                    });
                }
                function baseGet(object, path) {
                    path = castPath(path, object);
                    var index = 0, length = path.length;
                    while(object != null && index < length){
                        object = object[toKey(path[index++])];
                    }
                    return (index && index == length) ? object : undefined$1;
                }
                function baseGetAllKeys(object, keysFunc, symbolsFunc) {
                    var result = keysFunc(object);
                    return isArray(object) ? result : arrayPush(result, symbolsFunc(object));
                }
                function baseGetTag(value) {
                    if (value == null) {
                        return value === undefined$1 ? undefinedTag : nullTag;
                    }
                    return (symToStringTag && symToStringTag in Object(value)) ? getRawTag(value) : objectToString(value);
                }
                function baseGt(value, other) {
                    return value > other;
                }
                function baseHas(object, key) {
                    return object != null && hasOwnProperty.call(object, key);
                }
                function baseHasIn(object, key) {
                    return object != null && key in Object(object);
                }
                function baseInRange(number, start, end) {
                    return number >= nativeMin(start, end) && number < nativeMax(start, end);
                }
                function baseIntersection(arrays, iteratee, comparator) {
                    var includes = comparator ? arrayIncludesWith : arrayIncludes, length = arrays[0].length, othLength = arrays.length, othIndex = othLength, caches = Array(othLength), maxLength = Infinity, result = [];
                    while(othIndex--){
                        var array = arrays[othIndex];
                        if (othIndex && iteratee) {
                            array = arrayMap(array, baseUnary(iteratee));
                        }
                        maxLength = nativeMin(array.length, maxLength);
                        caches[othIndex] = !comparator && (iteratee || (length >= 120 && array.length >= 120)) ? new SetCache(othIndex && array) : undefined$1;
                    }
                    array = arrays[0];
                    var index = -1, seen = caches[0];
                    outer: while(++index < length && result.length < maxLength){
                        var value = array[index], computed = iteratee ? iteratee(value) : value;
                        value = (comparator || value !== 0) ? value : 0;
                        if (!(seen ? cacheHas(seen, computed) : includes(result, computed, comparator))) {
                            othIndex = othLength;
                            while(--othIndex){
                                var cache = caches[othIndex];
                                if (!(cache ? cacheHas(cache, computed) : includes(arrays[othIndex], computed, comparator))) {
                                    continue outer;
                                }
                            }
                            if (seen) {
                                seen.push(computed);
                            }
                            result.push(value);
                        }
                    }
                    return result;
                }
                function baseInverter(object, setter, iteratee, accumulator) {
                    baseForOwn(object, function(value, key, object) {
                        setter(accumulator, iteratee(value), key, object);
                    });
                    return accumulator;
                }
                function baseInvoke(object, path, args) {
                    path = castPath(path, object);
                    object = parent(object, path);
                    var func = object == null ? object : object[toKey(last(path))];
                    return func == null ? undefined$1 : apply(func, object, args);
                }
                function baseIsArguments(value) {
                    return isObjectLike(value) && baseGetTag(value) == argsTag;
                }
                function baseIsArrayBuffer(value) {
                    return isObjectLike(value) && baseGetTag(value) == arrayBufferTag;
                }
                function baseIsDate(value) {
                    return isObjectLike(value) && baseGetTag(value) == dateTag;
                }
                function baseIsEqual(value, other, bitmask, customizer, stack) {
                    if (value === other) {
                        return true;
                    }
                    if (value == null || other == null || (!isObjectLike(value) && !isObjectLike(other))) {
                        return value !== value && other !== other;
                    }
                    return baseIsEqualDeep(value, other, bitmask, customizer, baseIsEqual, stack);
                }
                function baseIsEqualDeep(object, other, bitmask, customizer, equalFunc, stack) {
                    var objIsArr = isArray(object), othIsArr = isArray(other), objTag = objIsArr ? arrayTag : getTag(object), othTag = othIsArr ? arrayTag : getTag(other);
                    objTag = objTag == argsTag ? objectTag : objTag;
                    othTag = othTag == argsTag ? objectTag : othTag;
                    var objIsObj = objTag == objectTag, othIsObj = othTag == objectTag, isSameTag = objTag == othTag;
                    if (isSameTag && isBuffer(object)) {
                        if (!isBuffer(other)) {
                            return false;
                        }
                        objIsArr = true;
                        objIsObj = false;
                    }
                    if (isSameTag && !objIsObj) {
                        stack || (stack = new Stack);
                        return (objIsArr || isTypedArray(object)) ? equalArrays(object, other, bitmask, customizer, equalFunc, stack) : equalByTag(object, other, objTag, bitmask, customizer, equalFunc, stack);
                    }
                    if (!(bitmask & COMPARE_PARTIAL_FLAG)) {
                        var objIsWrapped = objIsObj && hasOwnProperty.call(object, '__wrapped__'), othIsWrapped = othIsObj && hasOwnProperty.call(other, '__wrapped__');
                        if (objIsWrapped || othIsWrapped) {
                            var objUnwrapped = objIsWrapped ? object.value() : object, othUnwrapped = othIsWrapped ? other.value() : other;
                            stack || (stack = new Stack);
                            return equalFunc(objUnwrapped, othUnwrapped, bitmask, customizer, stack);
                        }
                    }
                    if (!isSameTag) {
                        return false;
                    }
                    stack || (stack = new Stack);
                    return equalObjects(object, other, bitmask, customizer, equalFunc, stack);
                }
                function baseIsMap(value) {
                    return isObjectLike(value) && getTag(value) == mapTag;
                }
                function baseIsMatch(object, source, matchData, customizer) {
                    var index = matchData.length, length = index, noCustomizer = !customizer;
                    if (object == null) {
                        return !length;
                    }
                    object = Object(object);
                    while(index--){
                        var data = matchData[index];
                        if ((noCustomizer && data[2]) ? data[1] !== object[data[0]] : !(data[0] in object)) {
                            return false;
                        }
                    }
                    while(++index < length){
                        data = matchData[index];
                        var key = data[0], objValue = object[key], srcValue = data[1];
                        if (noCustomizer && data[2]) {
                            if (objValue === undefined$1 && !(key in object)) {
                                return false;
                            }
                        } else {
                            var stack = new Stack;
                            if (customizer) {
                                var result = customizer(objValue, srcValue, key, object, source, stack);
                            }
                            if (!(result === undefined$1 ? baseIsEqual(srcValue, objValue, COMPARE_PARTIAL_FLAG | COMPARE_UNORDERED_FLAG, customizer, stack) : result)) {
                                return false;
                            }
                        }
                    }
                    return true;
                }
                function baseIsNative(value) {
                    if (!isObject(value) || isMasked(value)) {
                        return false;
                    }
                    var pattern = isFunction(value) ? reIsNative : reIsHostCtor;
                    return pattern.test(toSource(value));
                }
                function baseIsRegExp(value) {
                    return isObjectLike(value) && baseGetTag(value) == regexpTag;
                }
                function baseIsSet(value) {
                    return isObjectLike(value) && getTag(value) == setTag;
                }
                function baseIsTypedArray(value) {
                    return isObjectLike(value) && isLength(value.length) && !!typedArrayTags[baseGetTag(value)];
                }
                function baseIteratee(value) {
                    if (typeof value == 'function') {
                        return value;
                    }
                    if (value == null) {
                        return identity;
                    }
                    if (typeof value == 'object') {
                        return isArray(value) ? baseMatchesProperty(value[0], value[1]) : baseMatches(value);
                    }
                    return property(value);
                }
                function baseKeys(object) {
                    if (!isPrototype(object)) {
                        return nativeKeys(object);
                    }
                    var result = [];
                    for(var key in Object(object)){
                        if (hasOwnProperty.call(object, key) && key != 'constructor') {
                            result.push(key);
                        }
                    }
                    return result;
                }
                function baseKeysIn(object) {
                    if (!isObject(object)) {
                        return nativeKeysIn(object);
                    }
                    var isProto = isPrototype(object), result = [];
                    for(var key in object){
                        if (!(key == 'constructor' && (isProto || !hasOwnProperty.call(object, key)))) {
                            result.push(key);
                        }
                    }
                    return result;
                }
                function baseLt(value, other) {
                    return value < other;
                }
                function baseMap(collection, iteratee) {
                    var index = -1, result = isArrayLike(collection) ? Array(collection.length) : [];
                    baseEach(collection, function(value, key, collection) {
                        result[++index] = iteratee(value, key, collection);
                    });
                    return result;
                }
                function baseMatches(source) {
                    var matchData = getMatchData(source);
                    if (matchData.length == 1 && matchData[0][2]) {
                        return matchesStrictComparable(matchData[0][0], matchData[0][1]);
                    }
                    return function(object) {
                        return object === source || baseIsMatch(object, source, matchData);
                    };
                }
                function baseMatchesProperty(path, srcValue) {
                    if (isKey(path) && isStrictComparable(srcValue)) {
                        return matchesStrictComparable(toKey(path), srcValue);
                    }
                    return function(object) {
                        var objValue = get(object, path);
                        return (objValue === undefined$1 && objValue === srcValue) ? hasIn(object, path) : baseIsEqual(srcValue, objValue, COMPARE_PARTIAL_FLAG | COMPARE_UNORDERED_FLAG);
                    };
                }
                function baseMerge(object, source, srcIndex, customizer, stack) {
                    if (object === source) {
                        return;
                    }
                    baseFor(source, function(srcValue, key) {
                        stack || (stack = new Stack);
                        if (isObject(srcValue)) {
                            baseMergeDeep(object, source, key, srcIndex, baseMerge, customizer, stack);
                        } else {
                            var newValue = customizer ? customizer(safeGet(object, key), srcValue, (key + ''), object, source, stack) : undefined$1;
                            if (newValue === undefined$1) {
                                newValue = srcValue;
                            }
                            assignMergeValue(object, key, newValue);
                        }
                    }, keysIn);
                }
                function baseMergeDeep(object, source, key, srcIndex, mergeFunc, customizer, stack) {
                    var objValue = safeGet(object, key), srcValue = safeGet(source, key), stacked = stack.get(srcValue);
                    if (stacked) {
                        assignMergeValue(object, key, stacked);
                        return;
                    }
                    var newValue = customizer ? customizer(objValue, srcValue, (key + ''), object, source, stack) : undefined$1;
                    var isCommon = newValue === undefined$1;
                    if (isCommon) {
                        var isArr = isArray(srcValue), isBuff = !isArr && isBuffer(srcValue), isTyped = !isArr && !isBuff && isTypedArray(srcValue);
                        newValue = srcValue;
                        if (isArr || isBuff || isTyped) {
                            if (isArray(objValue)) {
                                newValue = objValue;
                            } else if (isArrayLikeObject(objValue)) {
                                newValue = copyArray(objValue);
                            } else if (isBuff) {
                                isCommon = false;
                                newValue = cloneBuffer(srcValue, true);
                            } else if (isTyped) {
                                isCommon = false;
                                newValue = cloneTypedArray(srcValue, true);
                            } else {
                                newValue = [];
                            }
                        } else if (isPlainObject(srcValue) || isArguments(srcValue)) {
                            newValue = objValue;
                            if (isArguments(objValue)) {
                                newValue = toPlainObject(objValue);
                            } else if (!isObject(objValue) || isFunction(objValue)) {
                                newValue = initCloneObject(srcValue);
                            }
                        } else {
                            isCommon = false;
                        }
                    }
                    if (isCommon) {
                        stack.set(srcValue, newValue);
                        mergeFunc(newValue, srcValue, srcIndex, customizer, stack);
                        stack['delete'](srcValue);
                    }
                    assignMergeValue(object, key, newValue);
                }
                function baseNth(array, n) {
                    var length = array.length;
                    if (!length) {
                        return;
                    }
                    n += n < 0 ? length : 0;
                    return isIndex(n, length) ? array[n] : undefined$1;
                }
                function baseOrderBy(collection, iteratees, orders) {
                    if (iteratees.length) {
                        iteratees = arrayMap(iteratees, function(iteratee) {
                            if (isArray(iteratee)) {
                                return function(value) {
                                    return baseGet(value, iteratee.length === 1 ? iteratee[0] : iteratee);
                                };
                            }
                            return iteratee;
                        });
                    } else {
                        iteratees = [
                            identity
                        ];
                    }
                    var index = -1;
                    iteratees = arrayMap(iteratees, baseUnary(getIteratee()));
                    var result = baseMap(collection, function(value, key, collection) {
                        var criteria = arrayMap(iteratees, function(iteratee) {
                            return iteratee(value);
                        });
                        return {
                            'criteria': criteria,
                            'index': ++index,
                            'value': value
                        };
                    });
                    return baseSortBy(result, function(object, other) {
                        return compareMultiple(object, other, orders);
                    });
                }
                function basePick(object, paths) {
                    return basePickBy(object, paths, function(value, path) {
                        return hasIn(object, path);
                    });
                }
                function basePickBy(object, paths, predicate) {
                    var index = -1, length = paths.length, result = {};
                    while(++index < length){
                        var path = paths[index], value = baseGet(object, path);
                        if (predicate(value, path)) {
                            baseSet(result, castPath(path, object), value);
                        }
                    }
                    return result;
                }
                function basePropertyDeep(path) {
                    return function(object) {
                        return baseGet(object, path);
                    };
                }
                function basePullAll(array, values, iteratee, comparator) {
                    var indexOf = comparator ? baseIndexOfWith : baseIndexOf, index = -1, length = values.length, seen = array;
                    if (array === values) {
                        values = copyArray(values);
                    }
                    if (iteratee) {
                        seen = arrayMap(array, baseUnary(iteratee));
                    }
                    while(++index < length){
                        var fromIndex = 0, value = values[index], computed = iteratee ? iteratee(value) : value;
                        while((fromIndex = indexOf(seen, computed, fromIndex, comparator)) > -1){
                            if (seen !== array) {
                                splice.call(seen, fromIndex, 1);
                            }
                            splice.call(array, fromIndex, 1);
                        }
                    }
                    return array;
                }
                function basePullAt(array, indexes) {
                    var length = array ? indexes.length : 0, lastIndex = length - 1;
                    while(length--){
                        var index = indexes[length];
                        if (length == lastIndex || index !== previous) {
                            var previous = index;
                            if (isIndex(index)) {
                                splice.call(array, index, 1);
                            } else {
                                baseUnset(array, index);
                            }
                        }
                    }
                    return array;
                }
                function baseRandom(lower, upper) {
                    return lower + nativeFloor(nativeRandom() * (upper - lower + 1));
                }
                function baseRange(start, end, step, fromRight) {
                    var index = -1, length = nativeMax(nativeCeil((end - start) / (step || 1)), 0), result = Array(length);
                    while(length--){
                        result[fromRight ? length : ++index] = start;
                        start += step;
                    }
                    return result;
                }
                function baseRepeat(string, n) {
                    var result = '';
                    if (!string || n < 1 || n > MAX_SAFE_INTEGER) {
                        return result;
                    }
                    do {
                        if (n % 2) {
                            result += string;
                        }
                        n = nativeFloor(n / 2);
                        if (n) {
                            string += string;
                        }
                    }while (n);
                    return result;
                }
                function baseRest(func, start) {
                    return setToString(overRest(func, start, identity), func + '');
                }
                function baseSample(collection) {
                    return arraySample(values(collection));
                }
                function baseSampleSize(collection, n) {
                    var array = values(collection);
                    return shuffleSelf(array, baseClamp(n, 0, array.length));
                }
                function baseSet(object, path, value, customizer) {
                    if (!isObject(object)) {
                        return object;
                    }
                    path = castPath(path, object);
                    var index = -1, length = path.length, lastIndex = length - 1, nested = object;
                    while(nested != null && ++index < length){
                        var key = toKey(path[index]), newValue = value;
                        if (key === '__proto__' || key === 'constructor' || key === 'prototype') {
                            return object;
                        }
                        if (index != lastIndex) {
                            var objValue = nested[key];
                            newValue = customizer ? customizer(objValue, key, nested) : undefined$1;
                            if (newValue === undefined$1) {
                                newValue = isObject(objValue) ? objValue : (isIndex(path[index + 1]) ? [] : {});
                            }
                        }
                        assignValue(nested, key, newValue);
                        nested = nested[key];
                    }
                    return object;
                }
                var baseSetData = !metaMap ? identity : function(func, data) {
                    metaMap.set(func, data);
                    return func;
                };
                var baseSetToString = !defineProperty ? identity : function(func, string) {
                    return defineProperty(func, 'toString', {
                        'configurable': true,
                        'enumerable': false,
                        'value': constant(string),
                        'writable': true
                    });
                };
                function baseShuffle(collection) {
                    return shuffleSelf(values(collection));
                }
                function baseSlice(array, start, end) {
                    var index = -1, length = array.length;
                    if (start < 0) {
                        start = -start > length ? 0 : (length + start);
                    }
                    end = end > length ? length : end;
                    if (end < 0) {
                        end += length;
                    }
                    length = start > end ? 0 : ((end - start) >>> 0);
                    start >>>= 0;
                    var result = Array(length);
                    while(++index < length){
                        result[index] = array[index + start];
                    }
                    return result;
                }
                function baseSome(collection, predicate) {
                    var result;
                    baseEach(collection, function(value, index, collection) {
                        result = predicate(value, index, collection);
                        return !result;
                    });
                    return !!result;
                }
                function baseSortedIndex(array, value, retHighest) {
                    var low = 0, high = array == null ? low : array.length;
                    if (typeof value == 'number' && value === value && high <= HALF_MAX_ARRAY_LENGTH) {
                        while(low < high){
                            var mid = (low + high) >>> 1, computed = array[mid];
                            if (computed !== null && !isSymbol(computed) && (retHighest ? (computed <= value) : (computed < value))) {
                                low = mid + 1;
                            } else {
                                high = mid;
                            }
                        }
                        return high;
                    }
                    return baseSortedIndexBy(array, value, identity, retHighest);
                }
                function baseSortedIndexBy(array, value, iteratee, retHighest) {
                    var low = 0, high = array == null ? 0 : array.length;
                    if (high === 0) {
                        return 0;
                    }
                    value = iteratee(value);
                    var valIsNaN = value !== value, valIsNull = value === null, valIsSymbol = isSymbol(value), valIsUndefined = value === undefined$1;
                    while(low < high){
                        var mid = nativeFloor((low + high) / 2), computed = iteratee(array[mid]), othIsDefined = computed !== undefined$1, othIsNull = computed === null, othIsReflexive = computed === computed, othIsSymbol = isSymbol(computed);
                        if (valIsNaN) {
                            var setLow = retHighest || othIsReflexive;
                        } else if (valIsUndefined) {
                            setLow = othIsReflexive && (retHighest || othIsDefined);
                        } else if (valIsNull) {
                            setLow = othIsReflexive && othIsDefined && (retHighest || !othIsNull);
                        } else if (valIsSymbol) {
                            setLow = othIsReflexive && othIsDefined && !othIsNull && (retHighest || !othIsSymbol);
                        } else if (othIsNull || othIsSymbol) {
                            setLow = false;
                        } else {
                            setLow = retHighest ? (computed <= value) : (computed < value);
                        }
                        if (setLow) {
                            low = mid + 1;
                        } else {
                            high = mid;
                        }
                    }
                    return nativeMin(high, MAX_ARRAY_INDEX);
                }
                function baseSortedUniq(array, iteratee) {
                    var index = -1, length = array.length, resIndex = 0, result = [];
                    while(++index < length){
                        var value = array[index], computed = iteratee ? iteratee(value) : value;
                        if (!index || !eq(computed, seen)) {
                            var seen = computed;
                            result[resIndex++] = value === 0 ? 0 : value;
                        }
                    }
                    return result;
                }
                function baseToNumber(value) {
                    if (typeof value == 'number') {
                        return value;
                    }
                    if (isSymbol(value)) {
                        return NAN;
                    }
                    return +value;
                }
                function baseToString(value) {
                    if (typeof value == 'string') {
                        return value;
                    }
                    if (isArray(value)) {
                        return arrayMap(value, baseToString) + '';
                    }
                    if (isSymbol(value)) {
                        return symbolToString ? symbolToString.call(value) : '';
                    }
                    var result = (value + '');
                    return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result;
                }
                function baseUniq(array, iteratee, comparator) {
                    var index = -1, includes = arrayIncludes, length = array.length, isCommon = true, result = [], seen = result;
                    if (comparator) {
                        isCommon = false;
                        includes = arrayIncludesWith;
                    } else if (length >= LARGE_ARRAY_SIZE) {
                        var set = iteratee ? null : createSet(array);
                        if (set) {
                            return setToArray(set);
                        }
                        isCommon = false;
                        includes = cacheHas;
                        seen = new SetCache;
                    } else {
                        seen = iteratee ? [] : result;
                    }
                    outer: while(++index < length){
                        var value = array[index], computed = iteratee ? iteratee(value) : value;
                        value = (comparator || value !== 0) ? value : 0;
                        if (isCommon && computed === computed) {
                            var seenIndex = seen.length;
                            while(seenIndex--){
                                if (seen[seenIndex] === computed) {
                                    continue outer;
                                }
                            }
                            if (iteratee) {
                                seen.push(computed);
                            }
                            result.push(value);
                        } else if (!includes(seen, computed, comparator)) {
                            if (seen !== result) {
                                seen.push(computed);
                            }
                            result.push(value);
                        }
                    }
                    return result;
                }
                function baseUnset(object, path) {
                    path = castPath(path, object);
                    object = parent(object, path);
                    return object == null || delete object[toKey(last(path))];
                }
                function baseUpdate(object, path, updater, customizer) {
                    return baseSet(object, path, updater(baseGet(object, path)), customizer);
                }
                function baseWhile(array, predicate, isDrop, fromRight) {
                    var length = array.length, index = fromRight ? length : -1;
                    while((fromRight ? index-- : ++index < length) && predicate(array[index], index, array)){}
                    return isDrop ? baseSlice(array, (fromRight ? 0 : index), (fromRight ? index + 1 : length)) : baseSlice(array, (fromRight ? index + 1 : 0), (fromRight ? length : index));
                }
                function baseWrapperValue(value, actions) {
                    var result = value;
                    if (result instanceof LazyWrapper) {
                        result = result.value();
                    }
                    return arrayReduce(actions, function(result, action) {
                        return action.func.apply(action.thisArg, arrayPush([
                            result
                        ], action.args));
                    }, result);
                }
                function baseXor(arrays, iteratee, comparator) {
                    var length = arrays.length;
                    if (length < 2) {
                        return length ? baseUniq(arrays[0]) : [];
                    }
                    var index = -1, result = Array(length);
                    while(++index < length){
                        var array = arrays[index], othIndex = -1;
                        while(++othIndex < length){
                            if (othIndex != index) {
                                result[index] = baseDifference(result[index] || array, arrays[othIndex], iteratee, comparator);
                            }
                        }
                    }
                    return baseUniq(baseFlatten(result, 1), iteratee, comparator);
                }
                function baseZipObject(props, values, assignFunc) {
                    var index = -1, length = props.length, valsLength = values.length, result = {};
                    while(++index < length){
                        var value = index < valsLength ? values[index] : undefined$1;
                        assignFunc(result, props[index], value);
                    }
                    return result;
                }
                function castArrayLikeObject(value) {
                    return isArrayLikeObject(value) ? value : [];
                }
                function castFunction(value) {
                    return typeof value == 'function' ? value : identity;
                }
                function castPath(value, object) {
                    if (isArray(value)) {
                        return value;
                    }
                    return isKey(value, object) ? [
                        value
                    ] : stringToPath(toString(value));
                }
                var castRest = baseRest;
                function castSlice(array, start, end) {
                    var length = array.length;
                    end = end === undefined$1 ? length : end;
                    return (!start && end >= length) ? array : baseSlice(array, start, end);
                }
                var clearTimeout = ctxClearTimeout || function(id) {
                    return root.clearTimeout(id);
                };
                function cloneBuffer(buffer, isDeep) {
                    if (isDeep) {
                        return buffer.slice();
                    }
                    var length = buffer.length, result = allocUnsafe ? allocUnsafe(length) : new buffer.constructor(length);
                    buffer.copy(result);
                    return result;
                }
                function cloneArrayBuffer(arrayBuffer) {
                    var result = new arrayBuffer.constructor(arrayBuffer.byteLength);
                    new Uint8Array(result).set(new Uint8Array(arrayBuffer));
                    return result;
                }
                function cloneDataView(dataView, isDeep) {
                    var buffer = isDeep ? cloneArrayBuffer(dataView.buffer) : dataView.buffer;
                    return new dataView.constructor(buffer, dataView.byteOffset, dataView.byteLength);
                }
                function cloneRegExp(regexp) {
                    var result = new regexp.constructor(regexp.source, reFlags.exec(regexp));
                    result.lastIndex = regexp.lastIndex;
                    return result;
                }
                function cloneSymbol(symbol) {
                    return symbolValueOf ? Object(symbolValueOf.call(symbol)) : {};
                }
                function cloneTypedArray(typedArray, isDeep) {
                    var buffer = isDeep ? cloneArrayBuffer(typedArray.buffer) : typedArray.buffer;
                    return new typedArray.constructor(buffer, typedArray.byteOffset, typedArray.length);
                }
                function compareAscending(value, other) {
                    if (value !== other) {
                        var valIsDefined = value !== undefined$1, valIsNull = value === null, valIsReflexive = value === value, valIsSymbol = isSymbol(value);
                        var othIsDefined = other !== undefined$1, othIsNull = other === null, othIsReflexive = other === other, othIsSymbol = isSymbol(other);
                        if ((!othIsNull && !othIsSymbol && !valIsSymbol && value > other) || (valIsSymbol && othIsDefined && othIsReflexive && !othIsNull && !othIsSymbol) || (valIsNull && othIsDefined && othIsReflexive) || (!valIsDefined && othIsReflexive) || !valIsReflexive) {
                            return 1;
                        }
                        if ((!valIsNull && !valIsSymbol && !othIsSymbol && value < other) || (othIsSymbol && valIsDefined && valIsReflexive && !valIsNull && !valIsSymbol) || (othIsNull && valIsDefined && valIsReflexive) || (!othIsDefined && valIsReflexive) || !othIsReflexive) {
                            return -1;
                        }
                    }
                    return 0;
                }
                function compareMultiple(object, other, orders) {
                    var index = -1, objCriteria = object.criteria, othCriteria = other.criteria, length = objCriteria.length, ordersLength = orders.length;
                    while(++index < length){
                        var result = compareAscending(objCriteria[index], othCriteria[index]);
                        if (result) {
                            if (index >= ordersLength) {
                                return result;
                            }
                            var order = orders[index];
                            return result * (order == 'desc' ? -1 : 1);
                        }
                    }
                    return object.index - other.index;
                }
                function composeArgs(args, partials, holders, isCurried) {
                    var argsIndex = -1, argsLength = args.length, holdersLength = holders.length, leftIndex = -1, leftLength = partials.length, rangeLength = nativeMax(argsLength - holdersLength, 0), result = Array(leftLength + rangeLength), isUncurried = !isCurried;
                    while(++leftIndex < leftLength){
                        result[leftIndex] = partials[leftIndex];
                    }
                    while(++argsIndex < holdersLength){
                        if (isUncurried || argsIndex < argsLength) {
                            result[holders[argsIndex]] = args[argsIndex];
                        }
                    }
                    while(rangeLength--){
                        result[leftIndex++] = args[argsIndex++];
                    }
                    return result;
                }
                function composeArgsRight(args, partials, holders, isCurried) {
                    var argsIndex = -1, argsLength = args.length, holdersIndex = -1, holdersLength = holders.length, rightIndex = -1, rightLength = partials.length, rangeLength = nativeMax(argsLength - holdersLength, 0), result = Array(rangeLength + rightLength), isUncurried = !isCurried;
                    while(++argsIndex < rangeLength){
                        result[argsIndex] = args[argsIndex];
                    }
                    var offset = argsIndex;
                    while(++rightIndex < rightLength){
                        result[offset + rightIndex] = partials[rightIndex];
                    }
                    while(++holdersIndex < holdersLength){
                        if (isUncurried || argsIndex < argsLength) {
                            result[offset + holders[holdersIndex]] = args[argsIndex++];
                        }
                    }
                    return result;
                }
                function copyArray(source, array) {
                    var index = -1, length = source.length;
                    array || (array = Array(length));
                    while(++index < length){
                        array[index] = source[index];
                    }
                    return array;
                }
                function copyObject(source, props, object, customizer) {
                    var isNew = !object;
                    object || (object = {});
                    var index = -1, length = props.length;
                    while(++index < length){
                        var key = props[index];
                        var newValue = customizer ? customizer(object[key], source[key], key, object, source) : undefined$1;
                        if (newValue === undefined$1) {
                            newValue = source[key];
                        }
                        if (isNew) {
                            baseAssignValue(object, key, newValue);
                        } else {
                            assignValue(object, key, newValue);
                        }
                    }
                    return object;
                }
                function copySymbols(source, object) {
                    return copyObject(source, getSymbols(source), object);
                }
                function copySymbolsIn(source, object) {
                    return copyObject(source, getSymbolsIn(source), object);
                }
                function createAggregator(setter, initializer) {
                    return function(collection, iteratee) {
                        var func = isArray(collection) ? arrayAggregator : baseAggregator, accumulator = initializer ? initializer() : {};
                        return func(collection, setter, getIteratee(iteratee, 2), accumulator);
                    };
                }
                function createAssigner(assigner) {
                    return baseRest(function(object, sources) {
                        var index = -1, length = sources.length, customizer = length > 1 ? sources[length - 1] : undefined$1, guard = length > 2 ? sources[2] : undefined$1;
                        customizer = (assigner.length > 3 && typeof customizer == 'function') ? (length--, customizer) : undefined$1;
                        if (guard && isIterateeCall(sources[0], sources[1], guard)) {
                            customizer = length < 3 ? undefined$1 : customizer;
                            length = 1;
                        }
                        object = Object(object);
                        while(++index < length){
                            var source = sources[index];
                            if (source) {
                                assigner(object, source, index, customizer);
                            }
                        }
                        return object;
                    });
                }
                function createBaseEach(eachFunc, fromRight) {
                    return function(collection, iteratee) {
                        if (collection == null) {
                            return collection;
                        }
                        if (!isArrayLike(collection)) {
                            return eachFunc(collection, iteratee);
                        }
                        var length = collection.length, index = fromRight ? length : -1, iterable = Object(collection);
                        while((fromRight ? index-- : ++index < length)){
                            if (iteratee(iterable[index], index, iterable) === false) {
                                break;
                            }
                        }
                        return collection;
                    };
                }
                function createBaseFor(fromRight) {
                    return function(object, iteratee, keysFunc) {
                        var index = -1, iterable = Object(object), props = keysFunc(object), length = props.length;
                        while(length--){
                            var key = props[fromRight ? length : ++index];
                            if (iteratee(iterable[key], key, iterable) === false) {
                                break;
                            }
                        }
                        return object;
                    };
                }
                function createBind(func, bitmask, thisArg) {
                    var isBind = bitmask & WRAP_BIND_FLAG, Ctor = createCtor(func);
                    function wrapper() {
                        var fn = (this && this !== root && this instanceof wrapper) ? Ctor : func;
                        return fn.apply(isBind ? thisArg : this, arguments);
                    }
                    return wrapper;
                }
                function createCaseFirst(methodName) {
                    return function(string) {
                        string = toString(string);
                        var strSymbols = hasUnicode(string) ? stringToArray(string) : undefined$1;
                        var chr = strSymbols ? strSymbols[0] : string.charAt(0);
                        var trailing = strSymbols ? castSlice(strSymbols, 1).join('') : string.slice(1);
                        return chr[methodName]() + trailing;
                    };
                }
                function createCompounder(callback) {
                    return function(string) {
                        return arrayReduce(words(deburr(string).replace(reApos, '')), callback, '');
                    };
                }
                function createCtor(Ctor) {
                    return function() {
                        var args = arguments;
                        switch(args.length){
                            case 0:
                                return new Ctor;
                            case 1:
                                return new Ctor(args[0]);
                            case 2:
                                return new Ctor(args[0], args[1]);
                            case 3:
                                return new Ctor(args[0], args[1], args[2]);
                            case 4:
                                return new Ctor(args[0], args[1], args[2], args[3]);
                            case 5:
                                return new Ctor(args[0], args[1], args[2], args[3], args[4]);
                            case 6:
                                return new Ctor(args[0], args[1], args[2], args[3], args[4], args[5]);
                            case 7:
                                return new Ctor(args[0], args[1], args[2], args[3], args[4], args[5], args[6]);
                        }
                        var thisBinding = baseCreate(Ctor.prototype), result = Ctor.apply(thisBinding, args);
                        return isObject(result) ? result : thisBinding;
                    };
                }
                function createCurry(func, bitmask, arity) {
                    var Ctor = createCtor(func);
                    function wrapper() {
                        var length = arguments.length, args = Array(length), index = length, placeholder = getHolder(wrapper);
                        while(index--){
                            args[index] = arguments[index];
                        }
                        var holders = (length < 3 && args[0] !== placeholder && args[length - 1] !== placeholder) ? [] : replaceHolders(args, placeholder);
                        length -= holders.length;
                        if (length < arity) {
                            return createRecurry(func, bitmask, createHybrid, wrapper.placeholder, undefined$1, args, holders, undefined$1, undefined$1, arity - length);
                        }
                        var fn = (this && this !== root && this instanceof wrapper) ? Ctor : func;
                        return apply(fn, this, args);
                    }
                    return wrapper;
                }
                function createFind(findIndexFunc) {
                    return function(collection, predicate, fromIndex) {
                        var iterable = Object(collection);
                        if (!isArrayLike(collection)) {
                            var iteratee = getIteratee(predicate, 3);
                            collection = keys(collection);
                            predicate = function(key) {
                                return iteratee(iterable[key], key, iterable);
                            };
                        }
                        var index = findIndexFunc(collection, predicate, fromIndex);
                        return index > -1 ? iterable[iteratee ? collection[index] : index] : undefined$1;
                    };
                }
                function createFlow(fromRight) {
                    return flatRest(function(funcs) {
                        var length = funcs.length, index = length, prereq = LodashWrapper.prototype.thru;
                        if (fromRight) {
                            funcs.reverse();
                        }
                        while(index--){
                            var func = funcs[index];
                            if (typeof func != 'function') {
                                throw new TypeError(FUNC_ERROR_TEXT);
                            }
                            if (prereq && !wrapper && getFuncName(func) == 'wrapper') {
                                var wrapper = new LodashWrapper([], true);
                            }
                        }
                        index = wrapper ? index : length;
                        while(++index < length){
                            func = funcs[index];
                            var funcName = getFuncName(func), data = funcName == 'wrapper' ? getData(func) : undefined$1;
                            if (data && isLaziable(data[0]) && data[1] == (WRAP_ARY_FLAG | WRAP_CURRY_FLAG | WRAP_PARTIAL_FLAG | WRAP_REARG_FLAG) && !data[4].length && data[9] == 1) {
                                wrapper = wrapper[getFuncName(data[0])].apply(wrapper, data[3]);
                            } else {
                                wrapper = (func.length == 1 && isLaziable(func)) ? wrapper[funcName]() : wrapper.thru(func);
                            }
                        }
                        return function() {
                            var args = arguments, value = args[0];
                            if (wrapper && args.length == 1 && isArray(value)) {
                                return wrapper.plant(value).value();
                            }
                            var index = 0, result = length ? funcs[index].apply(this, args) : value;
                            while(++index < length){
                                result = funcs[index].call(this, result);
                            }
                            return result;
                        };
                    });
                }
                function createHybrid(func, bitmask, thisArg, partials, holders, partialsRight, holdersRight, argPos, ary, arity) {
                    var isAry = bitmask & WRAP_ARY_FLAG, isBind = bitmask & WRAP_BIND_FLAG, isBindKey = bitmask & WRAP_BIND_KEY_FLAG, isCurried = bitmask & (WRAP_CURRY_FLAG | WRAP_CURRY_RIGHT_FLAG), isFlip = bitmask & WRAP_FLIP_FLAG, Ctor = isBindKey ? undefined$1 : createCtor(func);
                    function wrapper() {
                        var length = arguments.length, args = Array(length), index = length;
                        while(index--){
                            args[index] = arguments[index];
                        }
                        if (isCurried) {
                            var placeholder = getHolder(wrapper), holdersCount = countHolders(args, placeholder);
                        }
                        if (partials) {
                            args = composeArgs(args, partials, holders, isCurried);
                        }
                        if (partialsRight) {
                            args = composeArgsRight(args, partialsRight, holdersRight, isCurried);
                        }
                        length -= holdersCount;
                        if (isCurried && length < arity) {
                            var newHolders = replaceHolders(args, placeholder);
                            return createRecurry(func, bitmask, createHybrid, wrapper.placeholder, thisArg, args, newHolders, argPos, ary, arity - length);
                        }
                        var thisBinding = isBind ? thisArg : this, fn = isBindKey ? thisBinding[func] : func;
                        length = args.length;
                        if (argPos) {
                            args = reorder(args, argPos);
                        } else if (isFlip && length > 1) {
                            args.reverse();
                        }
                        if (isAry && ary < length) {
                            args.length = ary;
                        }
                        if (this && this !== root && this instanceof wrapper) {
                            fn = Ctor || createCtor(fn);
                        }
                        return fn.apply(thisBinding, args);
                    }
                    return wrapper;
                }
                function createInverter(setter, toIteratee) {
                    return function(object, iteratee) {
                        return baseInverter(object, setter, toIteratee(iteratee), {});
                    };
                }
                function createMathOperation(operator, defaultValue) {
                    return function(value, other) {
                        var result;
                        if (value === undefined$1 && other === undefined$1) {
                            return defaultValue;
                        }
                        if (value !== undefined$1) {
                            result = value;
                        }
                        if (other !== undefined$1) {
                            if (result === undefined$1) {
                                return other;
                            }
                            if (typeof value == 'string' || typeof other == 'string') {
                                value = baseToString(value);
                                other = baseToString(other);
                            } else {
                                value = baseToNumber(value);
                                other = baseToNumber(other);
                            }
                            result = operator(value, other);
                        }
                        return result;
                    };
                }
                function createOver(arrayFunc) {
                    return flatRest(function(iteratees) {
                        iteratees = arrayMap(iteratees, baseUnary(getIteratee()));
                        return baseRest(function(args) {
                            var thisArg = this;
                            return arrayFunc(iteratees, function(iteratee) {
                                return apply(iteratee, thisArg, args);
                            });
                        });
                    });
                }
                function createPadding(length, chars) {
                    chars = chars === undefined$1 ? ' ' : baseToString(chars);
                    var charsLength = chars.length;
                    if (charsLength < 2) {
                        return charsLength ? baseRepeat(chars, length) : chars;
                    }
                    var result = baseRepeat(chars, nativeCeil(length / stringSize(chars)));
                    return hasUnicode(chars) ? castSlice(stringToArray(result), 0, length).join('') : result.slice(0, length);
                }
                function createPartial(func, bitmask, thisArg, partials) {
                    var isBind = bitmask & WRAP_BIND_FLAG, Ctor = createCtor(func);
                    function wrapper() {
                        var argsIndex = -1, argsLength = arguments.length, leftIndex = -1, leftLength = partials.length, args = Array(leftLength + argsLength), fn = (this && this !== root && this instanceof wrapper) ? Ctor : func;
                        while(++leftIndex < leftLength){
                            args[leftIndex] = partials[leftIndex];
                        }
                        while(argsLength--){
                            args[leftIndex++] = arguments[++argsIndex];
                        }
                        return apply(fn, isBind ? thisArg : this, args);
                    }
                    return wrapper;
                }
                function createRange(fromRight) {
                    return function(start, end, step) {
                        if (step && typeof step != 'number' && isIterateeCall(start, end, step)) {
                            end = step = undefined$1;
                        }
                        start = toFinite(start);
                        if (end === undefined$1) {
                            end = start;
                            start = 0;
                        } else {
                            end = toFinite(end);
                        }
                        step = step === undefined$1 ? (start < end ? 1 : -1) : toFinite(step);
                        return baseRange(start, end, step, fromRight);
                    };
                }
                function createRelationalOperation(operator) {
                    return function(value, other) {
                        if (!(typeof value == 'string' && typeof other == 'string')) {
                            value = toNumber(value);
                            other = toNumber(other);
                        }
                        return operator(value, other);
                    };
                }
                function createRecurry(func, bitmask, wrapFunc, placeholder, thisArg, partials, holders, argPos, ary, arity) {
                    var isCurry = bitmask & WRAP_CURRY_FLAG, newHolders = isCurry ? holders : undefined$1, newHoldersRight = isCurry ? undefined$1 : holders, newPartials = isCurry ? partials : undefined$1, newPartialsRight = isCurry ? undefined$1 : partials;
                    bitmask |= (isCurry ? WRAP_PARTIAL_FLAG : WRAP_PARTIAL_RIGHT_FLAG);
                    bitmask &= ~(isCurry ? WRAP_PARTIAL_RIGHT_FLAG : WRAP_PARTIAL_FLAG);
                    if (!(bitmask & WRAP_CURRY_BOUND_FLAG)) {
                        bitmask &= ~(WRAP_BIND_FLAG | WRAP_BIND_KEY_FLAG);
                    }
                    var newData = [
                        func,
                        bitmask,
                        thisArg,
                        newPartials,
                        newHolders,
                        newPartialsRight,
                        newHoldersRight,
                        argPos,
                        ary,
                        arity
                    ];
                    var result = wrapFunc.apply(undefined$1, newData);
                    if (isLaziable(func)) {
                        setData(result, newData);
                    }
                    result.placeholder = placeholder;
                    return setWrapToString(result, func, bitmask);
                }
                function createRound(methodName) {
                    var func = Math[methodName];
                    return function(number, precision) {
                        number = toNumber(number);
                        precision = precision == null ? 0 : nativeMin(toInteger(precision), 292);
                        if (precision && nativeIsFinite(number)) {
                            var pair = (toString(number) + 'e').split('e'), value = func(pair[0] + 'e' + (+pair[1] + precision));
                            pair = (toString(value) + 'e').split('e');
                            return +(pair[0] + 'e' + (+pair[1] - precision));
                        }
                        return func(number);
                    };
                }
                var createSet = !(Set && (1 / setToArray(new Set([
                    ,
                    -0
                ]))[1]) == INFINITY) ? noop : function(values) {
                    return new Set(values);
                };
                function createToPairs(keysFunc) {
                    return function(object) {
                        var tag = getTag(object);
                        if (tag == mapTag) {
                            return mapToArray(object);
                        }
                        if (tag == setTag) {
                            return setToPairs(object);
                        }
                        return baseToPairs(object, keysFunc(object));
                    };
                }
                function createWrap(func, bitmask, thisArg, partials, holders, argPos, ary, arity) {
                    var isBindKey = bitmask & WRAP_BIND_KEY_FLAG;
                    if (!isBindKey && typeof func != 'function') {
                        throw new TypeError(FUNC_ERROR_TEXT);
                    }
                    var length = partials ? partials.length : 0;
                    if (!length) {
                        bitmask &= ~(WRAP_PARTIAL_FLAG | WRAP_PARTIAL_RIGHT_FLAG);
                        partials = holders = undefined$1;
                    }
                    ary = ary === undefined$1 ? ary : nativeMax(toInteger(ary), 0);
                    arity = arity === undefined$1 ? arity : toInteger(arity);
                    length -= holders ? holders.length : 0;
                    if (bitmask & WRAP_PARTIAL_RIGHT_FLAG) {
                        var partialsRight = partials, holdersRight = holders;
                        partials = holders = undefined$1;
                    }
                    var data = isBindKey ? undefined$1 : getData(func);
                    var newData = [
                        func,
                        bitmask,
                        thisArg,
                        partials,
                        holders,
                        partialsRight,
                        holdersRight,
                        argPos,
                        ary,
                        arity
                    ];
                    if (data) {
                        mergeData(newData, data);
                    }
                    func = newData[0];
                    bitmask = newData[1];
                    thisArg = newData[2];
                    partials = newData[3];
                    holders = newData[4];
                    arity = newData[9] = newData[9] === undefined$1 ? (isBindKey ? 0 : func.length) : nativeMax(newData[9] - length, 0);
                    if (!arity && bitmask & (WRAP_CURRY_FLAG | WRAP_CURRY_RIGHT_FLAG)) {
                        bitmask &= ~(WRAP_CURRY_FLAG | WRAP_CURRY_RIGHT_FLAG);
                    }
                    if (!bitmask || bitmask == WRAP_BIND_FLAG) {
                        var result = createBind(func, bitmask, thisArg);
                    } else if (bitmask == WRAP_CURRY_FLAG || bitmask == WRAP_CURRY_RIGHT_FLAG) {
                        result = createCurry(func, bitmask, arity);
                    } else if ((bitmask == WRAP_PARTIAL_FLAG || bitmask == (WRAP_BIND_FLAG | WRAP_PARTIAL_FLAG)) && !holders.length) {
                        result = createPartial(func, bitmask, thisArg, partials);
                    } else {
                        result = createHybrid.apply(undefined$1, newData);
                    }
                    var setter = data ? baseSetData : setData;
                    return setWrapToString(setter(result, newData), func, bitmask);
                }
                function customDefaultsAssignIn(objValue, srcValue, key, object) {
                    if (objValue === undefined$1 || (eq(objValue, objectProto[key]) && !hasOwnProperty.call(object, key))) {
                        return srcValue;
                    }
                    return objValue;
                }
                function customDefaultsMerge(objValue, srcValue, key, object, source, stack) {
                    if (isObject(objValue) && isObject(srcValue)) {
                        stack.set(srcValue, objValue);
                        baseMerge(objValue, srcValue, undefined$1, customDefaultsMerge, stack);
                        stack['delete'](srcValue);
                    }
                    return objValue;
                }
                function customOmitClone(value) {
                    return isPlainObject(value) ? undefined$1 : value;
                }
                function equalArrays(array, other, bitmask, customizer, equalFunc, stack) {
                    var isPartial = bitmask & COMPARE_PARTIAL_FLAG, arrLength = array.length, othLength = other.length;
                    if (arrLength != othLength && !(isPartial && othLength > arrLength)) {
                        return false;
                    }
                    var arrStacked = stack.get(array);
                    var othStacked = stack.get(other);
                    if (arrStacked && othStacked) {
                        return arrStacked == other && othStacked == array;
                    }
                    var index = -1, result = true, seen = (bitmask & COMPARE_UNORDERED_FLAG) ? new SetCache : undefined$1;
                    stack.set(array, other);
                    stack.set(other, array);
                    while(++index < arrLength){
                        var arrValue = array[index], othValue = other[index];
                        if (customizer) {
                            var compared = isPartial ? customizer(othValue, arrValue, index, other, array, stack) : customizer(arrValue, othValue, index, array, other, stack);
                        }
                        if (compared !== undefined$1) {
                            if (compared) {
                                continue;
                            }
                            result = false;
                            break;
                        }
                        if (seen) {
                            if (!arraySome(other, function(othValue, othIndex) {
                                if (!cacheHas(seen, othIndex) && (arrValue === othValue || equalFunc(arrValue, othValue, bitmask, customizer, stack))) {
                                    return seen.push(othIndex);
                                }
                            })) {
                                result = false;
                                break;
                            }
                        } else if (!(arrValue === othValue || equalFunc(arrValue, othValue, bitmask, customizer, stack))) {
                            result = false;
                            break;
                        }
                    }
                    stack['delete'](array);
                    stack['delete'](other);
                    return result;
                }
                function equalByTag(object, other, tag, bitmask, customizer, equalFunc, stack) {
                    switch(tag){
                        case dataViewTag:
                            if ((object.byteLength != other.byteLength) || (object.byteOffset != other.byteOffset)) {
                                return false;
                            }
                            object = object.buffer;
                            other = other.buffer;
                        case arrayBufferTag:
                            if ((object.byteLength != other.byteLength) || !equalFunc(new Uint8Array(object), new Uint8Array(other))) {
                                return false;
                            }
                            return true;
                        case boolTag:
                        case dateTag:
                        case numberTag:
                            return eq(+object, +other);
                        case errorTag:
                            return object.name == other.name && object.message == other.message;
                        case regexpTag:
                        case stringTag:
                            return object == (other + '');
                        case mapTag:
                            var convert = mapToArray;
                        case setTag:
                            var isPartial = bitmask & COMPARE_PARTIAL_FLAG;
                            convert || (convert = setToArray);
                            if (object.size != other.size && !isPartial) {
                                return false;
                            }
                            var stacked = stack.get(object);
                            if (stacked) {
                                return stacked == other;
                            }
                            bitmask |= COMPARE_UNORDERED_FLAG;
                            stack.set(object, other);
                            var result = equalArrays(convert(object), convert(other), bitmask, customizer, equalFunc, stack);
                            stack['delete'](object);
                            return result;
                        case symbolTag:
                            if (symbolValueOf) {
                                return symbolValueOf.call(object) == symbolValueOf.call(other);
                            }
                    }
                    return false;
                }
                function equalObjects(object, other, bitmask, customizer, equalFunc, stack) {
                    var isPartial = bitmask & COMPARE_PARTIAL_FLAG, objProps = getAllKeys(object), objLength = objProps.length, othProps = getAllKeys(other), othLength = othProps.length;
                    if (objLength != othLength && !isPartial) {
                        return false;
                    }
                    var index = objLength;
                    while(index--){
                        var key = objProps[index];
                        if (!(isPartial ? key in other : hasOwnProperty.call(other, key))) {
                            return false;
                        }
                    }
                    var objStacked = stack.get(object);
                    var othStacked = stack.get(other);
                    if (objStacked && othStacked) {
                        return objStacked == other && othStacked == object;
                    }
                    var result = true;
                    stack.set(object, other);
                    stack.set(other, object);
                    var skipCtor = isPartial;
                    while(++index < objLength){
                        key = objProps[index];
                        var objValue = object[key], othValue = other[key];
                        if (customizer) {
                            var compared = isPartial ? customizer(othValue, objValue, key, other, object, stack) : customizer(objValue, othValue, key, object, other, stack);
                        }
                        if (!(compared === undefined$1 ? (objValue === othValue || equalFunc(objValue, othValue, bitmask, customizer, stack)) : compared)) {
                            result = false;
                            break;
                        }
                        skipCtor || (skipCtor = key == 'constructor');
                    }
                    if (result && !skipCtor) {
                        var objCtor = object.constructor, othCtor = other.constructor;
                        if (objCtor != othCtor && ('constructor' in object && 'constructor' in other) && !(typeof objCtor == 'function' && objCtor instanceof objCtor && typeof othCtor == 'function' && othCtor instanceof othCtor)) {
                            result = false;
                        }
                    }
                    stack['delete'](object);
                    stack['delete'](other);
                    return result;
                }
                function flatRest(func) {
                    return setToString(overRest(func, undefined$1, flatten), func + '');
                }
                function getAllKeys(object) {
                    return baseGetAllKeys(object, keys, getSymbols);
                }
                function getAllKeysIn(object) {
                    return baseGetAllKeys(object, keysIn, getSymbolsIn);
                }
                var getData = !metaMap ? noop : function(func) {
                    return metaMap.get(func);
                };
                function getFuncName(func) {
                    var result = (func.name + ''), array = realNames[result], length = hasOwnProperty.call(realNames, result) ? array.length : 0;
                    while(length--){
                        var data = array[length], otherFunc = data.func;
                        if (otherFunc == null || otherFunc == func) {
                            return data.name;
                        }
                    }
                    return result;
                }
                function getHolder(func) {
                    var object = hasOwnProperty.call(lodash, 'placeholder') ? lodash : func;
                    return object.placeholder;
                }
                function getIteratee() {
                    var result = lodash.iteratee || iteratee;
                    result = result === iteratee ? baseIteratee : result;
                    return arguments.length ? result(arguments[0], arguments[1]) : result;
                }
                function getMapData(map, key) {
                    var data = map.__data__;
                    return isKeyable(key) ? data[typeof key == 'string' ? 'string' : 'hash'] : data.map;
                }
                function getMatchData(object) {
                    var result = keys(object), length = result.length;
                    while(length--){
                        var key = result[length], value = object[key];
                        result[length] = [
                            key,
                            value,
                            isStrictComparable(value)
                        ];
                    }
                    return result;
                }
                function getNative(object, key) {
                    var value = getValue(object, key);
                    return baseIsNative(value) ? value : undefined$1;
                }
                function getRawTag(value) {
                    var isOwn = hasOwnProperty.call(value, symToStringTag), tag = value[symToStringTag];
                    try {
                        value[symToStringTag] = undefined$1;
                        var unmasked = true;
                    } catch (e) {}
                    var result = nativeObjectToString.call(value);
                    if (unmasked) {
                        if (isOwn) {
                            value[symToStringTag] = tag;
                        } else {
                            delete value[symToStringTag];
                        }
                    }
                    return result;
                }
                var getSymbols = !nativeGetSymbols ? stubArray : function(object) {
                    if (object == null) {
                        return [];
                    }
                    object = Object(object);
                    return arrayFilter(nativeGetSymbols(object), function(symbol) {
                        return propertyIsEnumerable.call(object, symbol);
                    });
                };
                var getSymbolsIn = !nativeGetSymbols ? stubArray : function(object) {
                    var result = [];
                    while(object){
                        arrayPush(result, getSymbols(object));
                        object = getPrototype(object);
                    }
                    return result;
                };
                var getTag = baseGetTag;
                if ((DataView && getTag(new DataView(new ArrayBuffer(1))) != dataViewTag) || (Map && getTag(new Map) != mapTag) || (Promise && getTag(Promise.resolve()) != promiseTag) || (Set && getTag(new Set) != setTag) || (WeakMap && getTag(new WeakMap) != weakMapTag)) {
                    getTag = function(value) {
                        var result = baseGetTag(value), Ctor = result == objectTag ? value.constructor : undefined$1, ctorString = Ctor ? toSource(Ctor) : '';
                        if (ctorString) {
                            switch(ctorString){
                                case dataViewCtorString:
                                    return dataViewTag;
                                case mapCtorString:
                                    return mapTag;
                                case promiseCtorString:
                                    return promiseTag;
                                case setCtorString:
                                    return setTag;
                                case weakMapCtorString:
                                    return weakMapTag;
                            }
                        }
                        return result;
                    };
                }
                function getView(start, end, transforms) {
                    var index = -1, length = transforms.length;
                    while(++index < length){
                        var data = transforms[index], size = data.size;
                        switch(data.type){
                            case 'drop':
                                start += size;
                                break;
                            case 'dropRight':
                                end -= size;
                                break;
                            case 'take':
                                end = nativeMin(end, start + size);
                                break;
                            case 'takeRight':
                                start = nativeMax(start, end - size);
                                break;
                        }
                    }
                    return {
                        'start': start,
                        'end': end
                    };
                }
                function getWrapDetails(source) {
                    var match = source.match(reWrapDetails);
                    return match ? match[1].split(reSplitDetails) : [];
                }
                function hasPath(object, path, hasFunc) {
                    path = castPath(path, object);
                    var index = -1, length = path.length, result = false;
                    while(++index < length){
                        var key = toKey(path[index]);
                        if (!(result = object != null && hasFunc(object, key))) {
                            break;
                        }
                        object = object[key];
                    }
                    if (result || ++index != length) {
                        return result;
                    }
                    length = object == null ? 0 : object.length;
                    return !!length && isLength(length) && isIndex(key, length) && (isArray(object) || isArguments(object));
                }
                function initCloneArray(array) {
                    var length = array.length, result = new array.constructor(length);
                    if (length && typeof array[0] == 'string' && hasOwnProperty.call(array, 'index')) {
                        result.index = array.index;
                        result.input = array.input;
                    }
                    return result;
                }
                function initCloneObject(object) {
                    return (typeof object.constructor == 'function' && !isPrototype(object)) ? baseCreate(getPrototype(object)) : {};
                }
                function initCloneByTag(object, tag, isDeep) {
                    var Ctor = object.constructor;
                    switch(tag){
                        case arrayBufferTag:
                            return cloneArrayBuffer(object);
                        case boolTag:
                        case dateTag:
                            return new Ctor(+object);
                        case dataViewTag:
                            return cloneDataView(object, isDeep);
                        case float32Tag:
                        case float64Tag:
                        case int8Tag:
                        case int16Tag:
                        case int32Tag:
                        case uint8Tag:
                        case uint8ClampedTag:
                        case uint16Tag:
                        case uint32Tag:
                            return cloneTypedArray(object, isDeep);
                        case mapTag:
                            return new Ctor;
                        case numberTag:
                        case stringTag:
                            return new Ctor(object);
                        case regexpTag:
                            return cloneRegExp(object);
                        case setTag:
                            return new Ctor;
                        case symbolTag:
                            return cloneSymbol(object);
                    }
                }
                function insertWrapDetails(source, details) {
                    var length = details.length;
                    if (!length) {
                        return source;
                    }
                    var lastIndex = length - 1;
                    details[lastIndex] = (length > 1 ? '& ' : '') + details[lastIndex];
                    details = details.join(length > 2 ? ', ' : ' ');
                    return source.replace(reWrapComment, '{\n/* [wrapped with ' + details + '] */\n');
                }
                function isFlattenable(value) {
                    return isArray(value) || isArguments(value) || !!(spreadableSymbol && value && value[spreadableSymbol]);
                }
                function isIndex(value, length) {
                    var type = typeof value;
                    length = length == null ? MAX_SAFE_INTEGER : length;
                    return !!length && (type == 'number' || (type != 'symbol' && reIsUint.test(value))) && (value > -1 && value % 1 == 0 && value < length);
                }
                function isIterateeCall(value, index, object) {
                    if (!isObject(object)) {
                        return false;
                    }
                    var type = typeof index;
                    if (type == 'number' ? (isArrayLike(object) && isIndex(index, object.length)) : (type == 'string' && index in object)) {
                        return eq(object[index], value);
                    }
                    return false;
                }
                function isKey(value, object) {
                    if (isArray(value)) {
                        return false;
                    }
                    var type = typeof value;
                    if (type == 'number' || type == 'symbol' || type == 'boolean' || value == null || isSymbol(value)) {
                        return true;
                    }
                    return reIsPlainProp.test(value) || !reIsDeepProp.test(value) || (object != null && value in Object(object));
                }
                function isKeyable(value) {
                    var type = typeof value;
                    return (type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean') ? (value !== '__proto__') : (value === null);
                }
                function isLaziable(func) {
                    var funcName = getFuncName(func), other = lodash[funcName];
                    if (typeof other != 'function' || !(funcName in LazyWrapper.prototype)) {
                        return false;
                    }
                    if (func === other) {
                        return true;
                    }
                    var data = getData(other);
                    return !!data && func === data[0];
                }
                function isMasked(func) {
                    return !!maskSrcKey && (maskSrcKey in func);
                }
                var isMaskable = coreJsData ? isFunction : stubFalse;
                function isPrototype(value) {
                    var Ctor = value && value.constructor, proto = (typeof Ctor == 'function' && Ctor.prototype) || objectProto;
                    return value === proto;
                }
                function isStrictComparable(value) {
                    return value === value && !isObject(value);
                }
                function matchesStrictComparable(key, srcValue) {
                    return function(object) {
                        if (object == null) {
                            return false;
                        }
                        return object[key] === srcValue && (srcValue !== undefined$1 || (key in Object(object)));
                    };
                }
                function memoizeCapped(func) {
                    var result = memoize(func, function(key) {
                        if (cache.size === MAX_MEMOIZE_SIZE) {
                            cache.clear();
                        }
                        return key;
                    });
                    var cache = result.cache;
                    return result;
                }
                function mergeData(data, source) {
                    var bitmask = data[1], srcBitmask = source[1], newBitmask = bitmask | srcBitmask, isCommon = newBitmask < (WRAP_BIND_FLAG | WRAP_BIND_KEY_FLAG | WRAP_ARY_FLAG);
                    var isCombo = ((srcBitmask == WRAP_ARY_FLAG) && (bitmask == WRAP_CURRY_FLAG)) || ((srcBitmask == WRAP_ARY_FLAG) && (bitmask == WRAP_REARG_FLAG) && (data[7].length <= source[8])) || ((srcBitmask == (WRAP_ARY_FLAG | WRAP_REARG_FLAG)) && (source[7].length <= source[8]) && (bitmask == WRAP_CURRY_FLAG));
                    if (!(isCommon || isCombo)) {
                        return data;
                    }
                    if (srcBitmask & WRAP_BIND_FLAG) {
                        data[2] = source[2];
                        newBitmask |= bitmask & WRAP_BIND_FLAG ? 0 : WRAP_CURRY_BOUND_FLAG;
                    }
                    var value = source[3];
                    if (value) {
                        var partials = data[3];
                        data[3] = partials ? composeArgs(partials, value, source[4]) : value;
                        data[4] = partials ? replaceHolders(data[3], PLACEHOLDER) : source[4];
                    }
                    value = source[5];
                    if (value) {
                        partials = data[5];
                        data[5] = partials ? composeArgsRight(partials, value, source[6]) : value;
                        data[6] = partials ? replaceHolders(data[5], PLACEHOLDER) : source[6];
                    }
                    value = source[7];
                    if (value) {
                        data[7] = value;
                    }
                    if (srcBitmask & WRAP_ARY_FLAG) {
                        data[8] = data[8] == null ? source[8] : nativeMin(data[8], source[8]);
                    }
                    if (data[9] == null) {
                        data[9] = source[9];
                    }
                    data[0] = source[0];
                    data[1] = newBitmask;
                    return data;
                }
                function nativeKeysIn(object) {
                    var result = [];
                    if (object != null) {
                        for(var key in Object(object)){
                            result.push(key);
                        }
                    }
                    return result;
                }
                function objectToString(value) {
                    return nativeObjectToString.call(value);
                }
                function overRest(func, start, transform) {
                    start = nativeMax(start === undefined$1 ? (func.length - 1) : start, 0);
                    return function() {
                        var args = arguments, index = -1, length = nativeMax(args.length - start, 0), array = Array(length);
                        while(++index < length){
                            array[index] = args[start + index];
                        }
                        index = -1;
                        var otherArgs = Array(start + 1);
                        while(++index < start){
                            otherArgs[index] = args[index];
                        }
                        otherArgs[start] = transform(array);
                        return apply(func, this, otherArgs);
                    };
                }
                function parent(object, path) {
                    return path.length < 2 ? object : baseGet(object, baseSlice(path, 0, -1));
                }
                function reorder(array, indexes) {
                    var arrLength = array.length, length = nativeMin(indexes.length, arrLength), oldArray = copyArray(array);
                    while(length--){
                        var index = indexes[length];
                        array[length] = isIndex(index, arrLength) ? oldArray[index] : undefined$1;
                    }
                    return array;
                }
                function safeGet(object, key) {
                    if (key === 'constructor' && typeof object[key] === 'function') {
                        return;
                    }
                    if (key == '__proto__') {
                        return;
                    }
                    return object[key];
                }
                var setData = shortOut(baseSetData);
                var setTimeout = ctxSetTimeout || function(func, wait) {
                    return root.setTimeout(func, wait);
                };
                var setToString = shortOut(baseSetToString);
                function setWrapToString(wrapper, reference, bitmask) {
                    var source = (reference + '');
                    return setToString(wrapper, insertWrapDetails(source, updateWrapDetails(getWrapDetails(source), bitmask)));
                }
                function shortOut(func) {
                    var count = 0, lastCalled = 0;
                    return function() {
                        var stamp = nativeNow(), remaining = HOT_SPAN - (stamp - lastCalled);
                        lastCalled = stamp;
                        if (remaining > 0) {
                            if (++count >= HOT_COUNT) {
                                return arguments[0];
                            }
                        } else {
                            count = 0;
                        }
                        return func.apply(undefined$1, arguments);
                    };
                }
                function shuffleSelf(array, size) {
                    var index = -1, length = array.length, lastIndex = length - 1;
                    size = size === undefined$1 ? length : size;
                    while(++index < size){
                        var rand = baseRandom(index, lastIndex), value = array[rand];
                        array[rand] = array[index];
                        array[index] = value;
                    }
                    array.length = size;
                    return array;
                }
                var stringToPath = memoizeCapped(function(string) {
                    var result = [];
                    if (string.charCodeAt(0) === 46) {
                        result.push('');
                    }
                    string.replace(rePropName, function(match, number, quote, subString) {
                        result.push(quote ? subString.replace(reEscapeChar, '$1') : (number || match));
                    });
                    return result;
                });
                function toKey(value) {
                    if (typeof value == 'string' || isSymbol(value)) {
                        return value;
                    }
                    var result = (value + '');
                    return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result;
                }
                function toSource(func) {
                    if (func != null) {
                        try {
                            return funcToString.call(func);
                        } catch (e) {}
                        try {
                            return (func + '');
                        } catch (e) {}
                    }
                    return '';
                }
                function updateWrapDetails(details, bitmask) {
                    arrayEach(wrapFlags, function(pair) {
                        var value = '_.' + pair[0];
                        if ((bitmask & pair[1]) && !arrayIncludes(details, value)) {
                            details.push(value);
                        }
                    });
                    return details.sort();
                }
                function wrapperClone(wrapper) {
                    if (wrapper instanceof LazyWrapper) {
                        return wrapper.clone();
                    }
                    var result = new LodashWrapper(wrapper.__wrapped__, wrapper.__chain__);
                    result.__actions__ = copyArray(wrapper.__actions__);
                    result.__index__ = wrapper.__index__;
                    result.__values__ = wrapper.__values__;
                    return result;
                }
                function chunk(array, size, guard) {
                    if ((guard ? isIterateeCall(array, size, guard) : size === undefined$1)) {
                        size = 1;
                    } else {
                        size = nativeMax(toInteger(size), 0);
                    }
                    var length = array == null ? 0 : array.length;
                    if (!length || size < 1) {
                        return [];
                    }
                    var index = 0, resIndex = 0, result = Array(nativeCeil(length / size));
                    while(index < length){
                        result[resIndex++] = baseSlice(array, index, (index += size));
                    }
                    return result;
                }
                function compact(array) {
                    var index = -1, length = array == null ? 0 : array.length, resIndex = 0, result = [];
                    while(++index < length){
                        var value = array[index];
                        if (value) {
                            result[resIndex++] = value;
                        }
                    }
                    return result;
                }
                function concat() {
                    var length = arguments.length;
                    if (!length) {
                        return [];
                    }
                    var args = Array(length - 1), array = arguments[0], index = length;
                    while(index--){
                        args[index - 1] = arguments[index];
                    }
                    return arrayPush(isArray(array) ? copyArray(array) : [
                        array
                    ], baseFlatten(args, 1));
                }
                var difference = baseRest(function(array, values) {
                    return isArrayLikeObject(array) ? baseDifference(array, baseFlatten(values, 1, isArrayLikeObject, true)) : [];
                });
                var differenceBy = baseRest(function(array, values) {
                    var iteratee = last(values);
                    if (isArrayLikeObject(iteratee)) {
                        iteratee = undefined$1;
                    }
                    return isArrayLikeObject(array) ? baseDifference(array, baseFlatten(values, 1, isArrayLikeObject, true), getIteratee(iteratee, 2)) : [];
                });
                var differenceWith = baseRest(function(array, values) {
                    var comparator = last(values);
                    if (isArrayLikeObject(comparator)) {
                        comparator = undefined$1;
                    }
                    return isArrayLikeObject(array) ? baseDifference(array, baseFlatten(values, 1, isArrayLikeObject, true), undefined$1, comparator) : [];
                });
                function drop(array, n, guard) {
                    var length = array == null ? 0 : array.length;
                    if (!length) {
                        return [];
                    }
                    n = (guard || n === undefined$1) ? 1 : toInteger(n);
                    return baseSlice(array, n < 0 ? 0 : n, length);
                }
                function dropRight(array, n, guard) {
                    var length = array == null ? 0 : array.length;
                    if (!length) {
                        return [];
                    }
                    n = (guard || n === undefined$1) ? 1 : toInteger(n);
                    n = length - n;
                    return baseSlice(array, 0, n < 0 ? 0 : n);
                }
                function dropRightWhile(array, predicate) {
                    return (array && array.length) ? baseWhile(array, getIteratee(predicate, 3), true, true) : [];
                }
                function dropWhile(array, predicate) {
                    return (array && array.length) ? baseWhile(array, getIteratee(predicate, 3), true) : [];
                }
                function fill(array, value, start, end) {
                    var length = array == null ? 0 : array.length;
                    if (!length) {
                        return [];
                    }
                    if (start && typeof start != 'number' && isIterateeCall(array, value, start)) {
                        start = 0;
                        end = length;
                    }
                    return baseFill(array, value, start, end);
                }
                function findIndex(array, predicate, fromIndex) {
                    var length = array == null ? 0 : array.length;
                    if (!length) {
                        return -1;
                    }
                    var index = fromIndex == null ? 0 : toInteger(fromIndex);
                    if (index < 0) {
                        index = nativeMax(length + index, 0);
                    }
                    return baseFindIndex(array, getIteratee(predicate, 3), index);
                }
                function findLastIndex(array, predicate, fromIndex) {
                    var length = array == null ? 0 : array.length;
                    if (!length) {
                        return -1;
                    }
                    var index = length - 1;
                    if (fromIndex !== undefined$1) {
                        index = toInteger(fromIndex);
                        index = fromIndex < 0 ? nativeMax(length + index, 0) : nativeMin(index, length - 1);
                    }
                    return baseFindIndex(array, getIteratee(predicate, 3), index, true);
                }
                function flatten(array) {
                    var length = array == null ? 0 : array.length;
                    return length ? baseFlatten(array, 1) : [];
                }
                function flattenDeep(array) {
                    var length = array == null ? 0 : array.length;
                    return length ? baseFlatten(array, INFINITY) : [];
                }
                function flattenDepth(array, depth) {
                    var length = array == null ? 0 : array.length;
                    if (!length) {
                        return [];
                    }
                    depth = depth === undefined$1 ? 1 : toInteger(depth);
                    return baseFlatten(array, depth);
                }
                function fromPairs(pairs) {
                    var index = -1, length = pairs == null ? 0 : pairs.length, result = {};
                    while(++index < length){
                        var pair = pairs[index];
                        result[pair[0]] = pair[1];
                    }
                    return result;
                }
                function head(array) {
                    return (array && array.length) ? array[0] : undefined$1;
                }
                function indexOf(array, value, fromIndex) {
                    var length = array == null ? 0 : array.length;
                    if (!length) {
                        return -1;
                    }
                    var index = fromIndex == null ? 0 : toInteger(fromIndex);
                    if (index < 0) {
                        index = nativeMax(length + index, 0);
                    }
                    return baseIndexOf(array, value, index);
                }
                function initial(array) {
                    var length = array == null ? 0 : array.length;
                    return length ? baseSlice(array, 0, -1) : [];
                }
                var intersection = baseRest(function(arrays) {
                    var mapped = arrayMap(arrays, castArrayLikeObject);
                    return (mapped.length && mapped[0] === arrays[0]) ? baseIntersection(mapped) : [];
                });
                var intersectionBy = baseRest(function(arrays) {
                    var iteratee = last(arrays), mapped = arrayMap(arrays, castArrayLikeObject);
                    if (iteratee === last(mapped)) {
                        iteratee = undefined$1;
                    } else {
                        mapped.pop();
                    }
                    return (mapped.length && mapped[0] === arrays[0]) ? baseIntersection(mapped, getIteratee(iteratee, 2)) : [];
                });
                var intersectionWith = baseRest(function(arrays) {
                    var comparator = last(arrays), mapped = arrayMap(arrays, castArrayLikeObject);
                    comparator = typeof comparator == 'function' ? comparator : undefined$1;
                    if (comparator) {
                        mapped.pop();
                    }
                    return (mapped.length && mapped[0] === arrays[0]) ? baseIntersection(mapped, undefined$1, comparator) : [];
                });
                function join(array, separator) {
                    return array == null ? '' : nativeJoin.call(array, separator);
                }
                function last(array) {
                    var length = array == null ? 0 : array.length;
                    return length ? array[length - 1] : undefined$1;
                }
                function lastIndexOf(array, value, fromIndex) {
                    var length = array == null ? 0 : array.length;
                    if (!length) {
                        return -1;
                    }
                    var index = length;
                    if (fromIndex !== undefined$1) {
                        index = toInteger(fromIndex);
                        index = index < 0 ? nativeMax(length + index, 0) : nativeMin(index, length - 1);
                    }
                    return value === value ? strictLastIndexOf(array, value, index) : baseFindIndex(array, baseIsNaN, index, true);
                }
                function nth(array, n) {
                    return (array && array.length) ? baseNth(array, toInteger(n)) : undefined$1;
                }
                var pull = baseRest(pullAll);
                function pullAll(array, values) {
                    return (array && array.length && values && values.length) ? basePullAll(array, values) : array;
                }
                function pullAllBy(array, values, iteratee) {
                    return (array && array.length && values && values.length) ? basePullAll(array, values, getIteratee(iteratee, 2)) : array;
                }
                function pullAllWith(array, values, comparator) {
                    return (array && array.length && values && values.length) ? basePullAll(array, values, undefined$1, comparator) : array;
                }
                var pullAt = flatRest(function(array, indexes) {
                    var length = array == null ? 0 : array.length, result = baseAt(array, indexes);
                    basePullAt(array, arrayMap(indexes, function(index) {
                        return isIndex(index, length) ? +index : index;
                    }).sort(compareAscending));
                    return result;
                });
                function remove(array, predicate) {
                    var result = [];
                    if (!(array && array.length)) {
                        return result;
                    }
                    var index = -1, indexes = [], length = array.length;
                    predicate = getIteratee(predicate, 3);
                    while(++index < length){
                        var value = array[index];
                        if (predicate(value, index, array)) {
                            result.push(value);
                            indexes.push(index);
                        }
                    }
                    basePullAt(array, indexes);
                    return result;
                }
                function reverse(array) {
                    return array == null ? array : nativeReverse.call(array);
                }
                function slice(array, start, end) {
                    var length = array == null ? 0 : array.length;
                    if (!length) {
                        return [];
                    }
                    if (end && typeof end != 'number' && isIterateeCall(array, start, end)) {
                        start = 0;
                        end = length;
                    } else {
                        start = start == null ? 0 : toInteger(start);
                        end = end === undefined$1 ? length : toInteger(end);
                    }
                    return baseSlice(array, start, end);
                }
                function sortedIndex(array, value) {
                    return baseSortedIndex(array, value);
                }
                function sortedIndexBy(array, value, iteratee) {
                    return baseSortedIndexBy(array, value, getIteratee(iteratee, 2));
                }
                function sortedIndexOf(array, value) {
                    var length = array == null ? 0 : array.length;
                    if (length) {
                        var index = baseSortedIndex(array, value);
                        if (index < length && eq(array[index], value)) {
                            return index;
                        }
                    }
                    return -1;
                }
                function sortedLastIndex(array, value) {
                    return baseSortedIndex(array, value, true);
                }
                function sortedLastIndexBy(array, value, iteratee) {
                    return baseSortedIndexBy(array, value, getIteratee(iteratee, 2), true);
                }
                function sortedLastIndexOf(array, value) {
                    var length = array == null ? 0 : array.length;
                    if (length) {
                        var index = baseSortedIndex(array, value, true) - 1;
                        if (eq(array[index], value)) {
                            return index;
                        }
                    }
                    return -1;
                }
                function sortedUniq(array) {
                    return (array && array.length) ? baseSortedUniq(array) : [];
                }
                function sortedUniqBy(array, iteratee) {
                    return (array && array.length) ? baseSortedUniq(array, getIteratee(iteratee, 2)) : [];
                }
                function tail(array) {
                    var length = array == null ? 0 : array.length;
                    return length ? baseSlice(array, 1, length) : [];
                }
                function take(array, n, guard) {
                    if (!(array && array.length)) {
                        return [];
                    }
                    n = (guard || n === undefined$1) ? 1 : toInteger(n);
                    return baseSlice(array, 0, n < 0 ? 0 : n);
                }
                function takeRight(array, n, guard) {
                    var length = array == null ? 0 : array.length;
                    if (!length) {
                        return [];
                    }
                    n = (guard || n === undefined$1) ? 1 : toInteger(n);
                    n = length - n;
                    return baseSlice(array, n < 0 ? 0 : n, length);
                }
                function takeRightWhile(array, predicate) {
                    return (array && array.length) ? baseWhile(array, getIteratee(predicate, 3), false, true) : [];
                }
                function takeWhile(array, predicate) {
                    return (array && array.length) ? baseWhile(array, getIteratee(predicate, 3)) : [];
                }
                var union = baseRest(function(arrays) {
                    return baseUniq(baseFlatten(arrays, 1, isArrayLikeObject, true));
                });
                var unionBy = baseRest(function(arrays) {
                    var iteratee = last(arrays);
                    if (isArrayLikeObject(iteratee)) {
                        iteratee = undefined$1;
                    }
                    return baseUniq(baseFlatten(arrays, 1, isArrayLikeObject, true), getIteratee(iteratee, 2));
                });
                var unionWith = baseRest(function(arrays) {
                    var comparator = last(arrays);
                    comparator = typeof comparator == 'function' ? comparator : undefined$1;
                    return baseUniq(baseFlatten(arrays, 1, isArrayLikeObject, true), undefined$1, comparator);
                });
                function uniq(array) {
                    return (array && array.length) ? baseUniq(array) : [];
                }
                function uniqBy(array, iteratee) {
                    return (array && array.length) ? baseUniq(array, getIteratee(iteratee, 2)) : [];
                }
                function uniqWith(array, comparator) {
                    comparator = typeof comparator == 'function' ? comparator : undefined$1;
                    return (array && array.length) ? baseUniq(array, undefined$1, comparator) : [];
                }
                function unzip(array) {
                    if (!(array && array.length)) {
                        return [];
                    }
                    var length = 0;
                    array = arrayFilter(array, function(group) {
                        if (isArrayLikeObject(group)) {
                            length = nativeMax(group.length, length);
                            return true;
                        }
                    });
                    return baseTimes(length, function(index) {
                        return arrayMap(array, baseProperty(index));
                    });
                }
                function unzipWith(array, iteratee) {
                    if (!(array && array.length)) {
                        return [];
                    }
                    var result = unzip(array);
                    if (iteratee == null) {
                        return result;
                    }
                    return arrayMap(result, function(group) {
                        return apply(iteratee, undefined$1, group);
                    });
                }
                var without = baseRest(function(array, values) {
                    return isArrayLikeObject(array) ? baseDifference(array, values) : [];
                });
                var xor = baseRest(function(arrays) {
                    return baseXor(arrayFilter(arrays, isArrayLikeObject));
                });
                var xorBy = baseRest(function(arrays) {
                    var iteratee = last(arrays);
                    if (isArrayLikeObject(iteratee)) {
                        iteratee = undefined$1;
                    }
                    return baseXor(arrayFilter(arrays, isArrayLikeObject), getIteratee(iteratee, 2));
                });
                var xorWith = baseRest(function(arrays) {
                    var comparator = last(arrays);
                    comparator = typeof comparator == 'function' ? comparator : undefined$1;
                    return baseXor(arrayFilter(arrays, isArrayLikeObject), undefined$1, comparator);
                });
                var zip = baseRest(unzip);
                function zipObject(props, values) {
                    return baseZipObject(props || [], values || [], assignValue);
                }
                function zipObjectDeep(props, values) {
                    return baseZipObject(props || [], values || [], baseSet);
                }
                var zipWith = baseRest(function(arrays) {
                    var length = arrays.length, iteratee = length > 1 ? arrays[length - 1] : undefined$1;
                    iteratee = typeof iteratee == 'function' ? (arrays.pop(), iteratee) : undefined$1;
                    return unzipWith(arrays, iteratee);
                });
                function chain(value) {
                    var result = lodash(value);
                    result.__chain__ = true;
                    return result;
                }
                function tap(value, interceptor) {
                    interceptor(value);
                    return value;
                }
                function thru(value, interceptor) {
                    return interceptor(value);
                }
                var wrapperAt = flatRest(function(paths) {
                    var length = paths.length, start = length ? paths[0] : 0, value = this.__wrapped__, interceptor = function(object) {
                        return baseAt(object, paths);
                    };
                    if (length > 1 || this.__actions__.length || !(value instanceof LazyWrapper) || !isIndex(start)) {
                        return this.thru(interceptor);
                    }
                    value = value.slice(start, +start + (length ? 1 : 0));
                    value.__actions__.push({
                        'func': thru,
                        'args': [
                            interceptor
                        ],
                        'thisArg': undefined$1
                    });
                    return new LodashWrapper(value, this.__chain__).thru(function(array) {
                        if (length && !array.length) {
                            array.push(undefined$1);
                        }
                        return array;
                    });
                });
                function wrapperChain() {
                    return chain(this);
                }
                function wrapperCommit() {
                    return new LodashWrapper(this.value(), this.__chain__);
                }
                function wrapperNext() {
                    if (this.__values__ === undefined$1) {
                        this.__values__ = toArray(this.value());
                    }
                    var done = this.__index__ >= this.__values__.length, value = done ? undefined$1 : this.__values__[this.__index__++];
                    return {
                        'done': done,
                        'value': value
                    };
                }
                function wrapperToIterator() {
                    return this;
                }
                function wrapperPlant(value) {
                    var result, parent = this;
                    while(parent instanceof baseLodash){
                        var clone = wrapperClone(parent);
                        clone.__index__ = 0;
                        clone.__values__ = undefined$1;
                        if (result) {
                            previous.__wrapped__ = clone;
                        } else {
                            result = clone;
                        }
                        var previous = clone;
                        parent = parent.__wrapped__;
                    }
                    previous.__wrapped__ = value;
                    return result;
                }
                function wrapperReverse() {
                    var value = this.__wrapped__;
                    if (value instanceof LazyWrapper) {
                        var wrapped = value;
                        if (this.__actions__.length) {
                            wrapped = new LazyWrapper(this);
                        }
                        wrapped = wrapped.reverse();
                        wrapped.__actions__.push({
                            'func': thru,
                            'args': [
                                reverse
                            ],
                            'thisArg': undefined$1
                        });
                        return new LodashWrapper(wrapped, this.__chain__);
                    }
                    return this.thru(reverse);
                }
                function wrapperValue() {
                    return baseWrapperValue(this.__wrapped__, this.__actions__);
                }
                var countBy = createAggregator(function(result, value, key) {
                    if (hasOwnProperty.call(result, key)) {
                        ++result[key];
                    } else {
                        baseAssignValue(result, key, 1);
                    }
                });
                function every(collection, predicate, guard) {
                    var func = isArray(collection) ? arrayEvery : baseEvery;
                    if (guard && isIterateeCall(collection, predicate, guard)) {
                        predicate = undefined$1;
                    }
                    return func(collection, getIteratee(predicate, 3));
                }
                function filter(collection, predicate) {
                    var func = isArray(collection) ? arrayFilter : baseFilter;
                    return func(collection, getIteratee(predicate, 3));
                }
                var find = createFind(findIndex);
                var findLast = createFind(findLastIndex);
                function flatMap(collection, iteratee) {
                    return baseFlatten(map(collection, iteratee), 1);
                }
                function flatMapDeep(collection, iteratee) {
                    return baseFlatten(map(collection, iteratee), INFINITY);
                }
                function flatMapDepth(collection, iteratee, depth) {
                    depth = depth === undefined$1 ? 1 : toInteger(depth);
                    return baseFlatten(map(collection, iteratee), depth);
                }
                function forEach(collection, iteratee) {
                    var func = isArray(collection) ? arrayEach : baseEach;
                    return func(collection, getIteratee(iteratee, 3));
                }
                function forEachRight(collection, iteratee) {
                    var func = isArray(collection) ? arrayEachRight : baseEachRight;
                    return func(collection, getIteratee(iteratee, 3));
                }
                var groupBy = createAggregator(function(result, value, key) {
                    if (hasOwnProperty.call(result, key)) {
                        result[key].push(value);
                    } else {
                        baseAssignValue(result, key, [
                            value
                        ]);
                    }
                });
                function includes(collection, value, fromIndex, guard) {
                    collection = isArrayLike(collection) ? collection : values(collection);
                    fromIndex = (fromIndex && !guard) ? toInteger(fromIndex) : 0;
                    var length = collection.length;
                    if (fromIndex < 0) {
                        fromIndex = nativeMax(length + fromIndex, 0);
                    }
                    return isString(collection) ? (fromIndex <= length && collection.indexOf(value, fromIndex) > -1) : (!!length && baseIndexOf(collection, value, fromIndex) > -1);
                }
                var invokeMap = baseRest(function(collection, path, args) {
                    var index = -1, isFunc = typeof path == 'function', result = isArrayLike(collection) ? Array(collection.length) : [];
                    baseEach(collection, function(value) {
                        result[++index] = isFunc ? apply(path, value, args) : baseInvoke(value, path, args);
                    });
                    return result;
                });
                var keyBy = createAggregator(function(result, value, key) {
                    baseAssignValue(result, key, value);
                });
                function map(collection, iteratee) {
                    var func = isArray(collection) ? arrayMap : baseMap;
                    return func(collection, getIteratee(iteratee, 3));
                }
                function orderBy(collection, iteratees, orders, guard) {
                    if (collection == null) {
                        return [];
                    }
                    if (!isArray(iteratees)) {
                        iteratees = iteratees == null ? [] : [
                            iteratees
                        ];
                    }
                    orders = guard ? undefined$1 : orders;
                    if (!isArray(orders)) {
                        orders = orders == null ? [] : [
                            orders
                        ];
                    }
                    return baseOrderBy(collection, iteratees, orders);
                }
                var partition = createAggregator(function(result, value, key) {
                    result[key ? 0 : 1].push(value);
                }, function() {
                    return [
                        [],
                        []
                    ];
                });
                function reduce(collection, iteratee, accumulator) {
                    var func = isArray(collection) ? arrayReduce : baseReduce, initAccum = arguments.length < 3;
                    return func(collection, getIteratee(iteratee, 4), accumulator, initAccum, baseEach);
                }
                function reduceRight(collection, iteratee, accumulator) {
                    var func = isArray(collection) ? arrayReduceRight : baseReduce, initAccum = arguments.length < 3;
                    return func(collection, getIteratee(iteratee, 4), accumulator, initAccum, baseEachRight);
                }
                function reject(collection, predicate) {
                    var func = isArray(collection) ? arrayFilter : baseFilter;
                    return func(collection, negate(getIteratee(predicate, 3)));
                }
                function sample(collection) {
                    var func = isArray(collection) ? arraySample : baseSample;
                    return func(collection);
                }
                function sampleSize(collection, n, guard) {
                    if ((guard ? isIterateeCall(collection, n, guard) : n === undefined$1)) {
                        n = 1;
                    } else {
                        n = toInteger(n);
                    }
                    var func = isArray(collection) ? arraySampleSize : baseSampleSize;
                    return func(collection, n);
                }
                function shuffle(collection) {
                    var func = isArray(collection) ? arrayShuffle : baseShuffle;
                    return func(collection);
                }
                function size(collection) {
                    if (collection == null) {
                        return 0;
                    }
                    if (isArrayLike(collection)) {
                        return isString(collection) ? stringSize(collection) : collection.length;
                    }
                    var tag = getTag(collection);
                    if (tag == mapTag || tag == setTag) {
                        return collection.size;
                    }
                    return baseKeys(collection).length;
                }
                function some(collection, predicate, guard) {
                    var func = isArray(collection) ? arraySome : baseSome;
                    if (guard && isIterateeCall(collection, predicate, guard)) {
                        predicate = undefined$1;
                    }
                    return func(collection, getIteratee(predicate, 3));
                }
                var sortBy = baseRest(function(collection, iteratees) {
                    if (collection == null) {
                        return [];
                    }
                    var length = iteratees.length;
                    if (length > 1 && isIterateeCall(collection, iteratees[0], iteratees[1])) {
                        iteratees = [];
                    } else if (length > 2 && isIterateeCall(iteratees[0], iteratees[1], iteratees[2])) {
                        iteratees = [
                            iteratees[0]
                        ];
                    }
                    return baseOrderBy(collection, baseFlatten(iteratees, 1), []);
                });
                var now = ctxNow || function() {
                    return root.Date.now();
                };
                function after(n, func) {
                    if (typeof func != 'function') {
                        throw new TypeError(FUNC_ERROR_TEXT);
                    }
                    n = toInteger(n);
                    return function() {
                        if (--n < 1) {
                            return func.apply(this, arguments);
                        }
                    };
                }
                function ary(func, n, guard) {
                    n = guard ? undefined$1 : n;
                    n = (func && n == null) ? func.length : n;
                    return createWrap(func, WRAP_ARY_FLAG, undefined$1, undefined$1, undefined$1, undefined$1, n);
                }
                function before(n, func) {
                    var result;
                    if (typeof func != 'function') {
                        throw new TypeError(FUNC_ERROR_TEXT);
                    }
                    n = toInteger(n);
                    return function() {
                        if (--n > 0) {
                            result = func.apply(this, arguments);
                        }
                        if (n <= 1) {
                            func = undefined$1;
                        }
                        return result;
                    };
                }
                var bind = baseRest(function(func, thisArg, partials) {
                    var bitmask = WRAP_BIND_FLAG;
                    if (partials.length) {
                        var holders = replaceHolders(partials, getHolder(bind));
                        bitmask |= WRAP_PARTIAL_FLAG;
                    }
                    return createWrap(func, bitmask, thisArg, partials, holders);
                });
                var bindKey = baseRest(function(object, key, partials) {
                    var bitmask = WRAP_BIND_FLAG | WRAP_BIND_KEY_FLAG;
                    if (partials.length) {
                        var holders = replaceHolders(partials, getHolder(bindKey));
                        bitmask |= WRAP_PARTIAL_FLAG;
                    }
                    return createWrap(key, bitmask, object, partials, holders);
                });
                function curry(func, arity, guard) {
                    arity = guard ? undefined$1 : arity;
                    var result = createWrap(func, WRAP_CURRY_FLAG, undefined$1, undefined$1, undefined$1, undefined$1, undefined$1, arity);
                    result.placeholder = curry.placeholder;
                    return result;
                }
                function curryRight(func, arity, guard) {
                    arity = guard ? undefined$1 : arity;
                    var result = createWrap(func, WRAP_CURRY_RIGHT_FLAG, undefined$1, undefined$1, undefined$1, undefined$1, undefined$1, arity);
                    result.placeholder = curryRight.placeholder;
                    return result;
                }
                function debounce(func, wait, options) {
                    var lastArgs, lastThis, maxWait, result, timerId, lastCallTime, lastInvokeTime = 0, leading = false, maxing = false, trailing = true;
                    if (typeof func != 'function') {
                        throw new TypeError(FUNC_ERROR_TEXT);
                    }
                    wait = toNumber(wait) || 0;
                    if (isObject(options)) {
                        leading = !!options.leading;
                        maxing = 'maxWait' in options;
                        maxWait = maxing ? nativeMax(toNumber(options.maxWait) || 0, wait) : maxWait;
                        trailing = 'trailing' in options ? !!options.trailing : trailing;
                    }
                    function invokeFunc(time) {
                        var args = lastArgs, thisArg = lastThis;
                        lastArgs = lastThis = undefined$1;
                        lastInvokeTime = time;
                        result = func.apply(thisArg, args);
                        return result;
                    }
                    function leadingEdge(time) {
                        lastInvokeTime = time;
                        timerId = setTimeout(timerExpired, wait);
                        return leading ? invokeFunc(time) : result;
                    }
                    function remainingWait(time) {
                        var timeSinceLastCall = time - lastCallTime, timeSinceLastInvoke = time - lastInvokeTime, timeWaiting = wait - timeSinceLastCall;
                        return maxing ? nativeMin(timeWaiting, maxWait - timeSinceLastInvoke) : timeWaiting;
                    }
                    function shouldInvoke(time) {
                        var timeSinceLastCall = time - lastCallTime, timeSinceLastInvoke = time - lastInvokeTime;
                        return (lastCallTime === undefined$1 || (timeSinceLastCall >= wait) || (timeSinceLastCall < 0) || (maxing && timeSinceLastInvoke >= maxWait));
                    }
                    function timerExpired() {
                        var time = now();
                        if (shouldInvoke(time)) {
                            return trailingEdge(time);
                        }
                        timerId = setTimeout(timerExpired, remainingWait(time));
                    }
                    function trailingEdge(time) {
                        timerId = undefined$1;
                        if (trailing && lastArgs) {
                            return invokeFunc(time);
                        }
                        lastArgs = lastThis = undefined$1;
                        return result;
                    }
                    function cancel() {
                        if (timerId !== undefined$1) {
                            clearTimeout(timerId);
                        }
                        lastInvokeTime = 0;
                        lastArgs = lastCallTime = lastThis = timerId = undefined$1;
                    }
                    function flush() {
                        return timerId === undefined$1 ? result : trailingEdge(now());
                    }
                    function debounced() {
                        var time = now(), isInvoking = shouldInvoke(time);
                        lastArgs = arguments;
                        lastThis = this;
                        lastCallTime = time;
                        if (isInvoking) {
                            if (timerId === undefined$1) {
                                return leadingEdge(lastCallTime);
                            }
                            if (maxing) {
                                clearTimeout(timerId);
                                timerId = setTimeout(timerExpired, wait);
                                return invokeFunc(lastCallTime);
                            }
                        }
                        if (timerId === undefined$1) {
                            timerId = setTimeout(timerExpired, wait);
                        }
                        return result;
                    }
                    debounced.cancel = cancel;
                    debounced.flush = flush;
                    return debounced;
                }
                var defer = baseRest(function(func, args) {
                    return baseDelay(func, 1, args);
                });
                var delay = baseRest(function(func, wait, args) {
                    return baseDelay(func, toNumber(wait) || 0, args);
                });
                function flip(func) {
                    return createWrap(func, WRAP_FLIP_FLAG);
                }
                function memoize(func, resolver) {
                    if (typeof func != 'function' || (resolver != null && typeof resolver != 'function')) {
                        throw new TypeError(FUNC_ERROR_TEXT);
                    }
                    var memoized = function() {
                        var args = arguments, key = resolver ? resolver.apply(this, args) : args[0], cache = memoized.cache;
                        if (cache.has(key)) {
                            return cache.get(key);
                        }
                        var result = func.apply(this, args);
                        memoized.cache = cache.set(key, result) || cache;
                        return result;
                    };
                    memoized.cache = new (memoize.Cache || MapCache);
                    return memoized;
                }
                memoize.Cache = MapCache;
                function negate(predicate) {
                    if (typeof predicate != 'function') {
                        throw new TypeError(FUNC_ERROR_TEXT);
                    }
                    return function() {
                        var args = arguments;
                        switch(args.length){
                            case 0:
                                return !predicate.call(this);
                            case 1:
                                return !predicate.call(this, args[0]);
                            case 2:
                                return !predicate.call(this, args[0], args[1]);
                            case 3:
                                return !predicate.call(this, args[0], args[1], args[2]);
                        }
                        return !predicate.apply(this, args);
                    };
                }
                function once(func) {
                    return before(2, func);
                }
                var overArgs = castRest(function(func, transforms) {
                    transforms = (transforms.length == 1 && isArray(transforms[0])) ? arrayMap(transforms[0], baseUnary(getIteratee())) : arrayMap(baseFlatten(transforms, 1), baseUnary(getIteratee()));
                    var funcsLength = transforms.length;
                    return baseRest(function(args) {
                        var index = -1, length = nativeMin(args.length, funcsLength);
                        while(++index < length){
                            args[index] = transforms[index].call(this, args[index]);
                        }
                        return apply(func, this, args);
                    });
                });
                var partial = baseRest(function(func, partials) {
                    var holders = replaceHolders(partials, getHolder(partial));
                    return createWrap(func, WRAP_PARTIAL_FLAG, undefined$1, partials, holders);
                });
                var partialRight = baseRest(function(func, partials) {
                    var holders = replaceHolders(partials, getHolder(partialRight));
                    return createWrap(func, WRAP_PARTIAL_RIGHT_FLAG, undefined$1, partials, holders);
                });
                var rearg = flatRest(function(func, indexes) {
                    return createWrap(func, WRAP_REARG_FLAG, undefined$1, undefined$1, undefined$1, indexes);
                });
                function rest(func, start) {
                    if (typeof func != 'function') {
                        throw new TypeError(FUNC_ERROR_TEXT);
                    }
                    start = start === undefined$1 ? start : toInteger(start);
                    return baseRest(func, start);
                }
                function spread(func, start) {
                    if (typeof func != 'function') {
                        throw new TypeError(FUNC_ERROR_TEXT);
                    }
                    start = start == null ? 0 : nativeMax(toInteger(start), 0);
                    return baseRest(function(args) {
                        var array = args[start], otherArgs = castSlice(args, 0, start);
                        if (array) {
                            arrayPush(otherArgs, array);
                        }
                        return apply(func, this, otherArgs);
                    });
                }
                function throttle(func, wait, options) {
                    var leading = true, trailing = true;
                    if (typeof func != 'function') {
                        throw new TypeError(FUNC_ERROR_TEXT);
                    }
                    if (isObject(options)) {
                        leading = 'leading' in options ? !!options.leading : leading;
                        trailing = 'trailing' in options ? !!options.trailing : trailing;
                    }
                    return debounce(func, wait, {
                        'leading': leading,
                        'maxWait': wait,
                        'trailing': trailing
                    });
                }
                function unary(func) {
                    return ary(func, 1);
                }
                function wrap(value, wrapper) {
                    return partial(castFunction(wrapper), value);
                }
                function castArray() {
                    if (!arguments.length) {
                        return [];
                    }
                    var value = arguments[0];
                    return isArray(value) ? value : [
                        value
                    ];
                }
                function clone(value) {
                    return baseClone(value, CLONE_SYMBOLS_FLAG);
                }
                function cloneWith(value, customizer) {
                    customizer = typeof customizer == 'function' ? customizer : undefined$1;
                    return baseClone(value, CLONE_SYMBOLS_FLAG, customizer);
                }
                function cloneDeep(value) {
                    return baseClone(value, CLONE_DEEP_FLAG | CLONE_SYMBOLS_FLAG);
                }
                function cloneDeepWith(value, customizer) {
                    customizer = typeof customizer == 'function' ? customizer : undefined$1;
                    return baseClone(value, CLONE_DEEP_FLAG | CLONE_SYMBOLS_FLAG, customizer);
                }
                function conformsTo(object, source) {
                    return source == null || baseConformsTo(object, source, keys(source));
                }
                function eq(value, other) {
                    return value === other || (value !== value && other !== other);
                }
                var gt = createRelationalOperation(baseGt);
                var gte = createRelationalOperation(function(value, other) {
                    return value >= other;
                });
                var isArguments = baseIsArguments(function() {
                    return arguments;
                }()) ? baseIsArguments : function(value) {
                    return isObjectLike(value) && hasOwnProperty.call(value, 'callee') && !propertyIsEnumerable.call(value, 'callee');
                };
                var isArray = Array.isArray;
                var isArrayBuffer = nodeIsArrayBuffer ? baseUnary(nodeIsArrayBuffer) : baseIsArrayBuffer;
                function isArrayLike(value) {
                    return value != null && isLength(value.length) && !isFunction(value);
                }
                function isArrayLikeObject(value) {
                    return isObjectLike(value) && isArrayLike(value);
                }
                function isBoolean(value) {
                    return value === true || value === false || (isObjectLike(value) && baseGetTag(value) == boolTag);
                }
                var isBuffer = nativeIsBuffer || stubFalse;
                var isDate = nodeIsDate ? baseUnary(nodeIsDate) : baseIsDate;
                function isElement(value) {
                    return isObjectLike(value) && value.nodeType === 1 && !isPlainObject(value);
                }
                function isEmpty(value) {
                    if (value == null) {
                        return true;
                    }
                    if (isArrayLike(value) && (isArray(value) || typeof value == 'string' || typeof value.splice == 'function' || isBuffer(value) || isTypedArray(value) || isArguments(value))) {
                        return !value.length;
                    }
                    var tag = getTag(value);
                    if (tag == mapTag || tag == setTag) {
                        return !value.size;
                    }
                    if (isPrototype(value)) {
                        return !baseKeys(value).length;
                    }
                    for(var key in value){
                        if (hasOwnProperty.call(value, key)) {
                            return false;
                        }
                    }
                    return true;
                }
                function isEqual(value, other) {
                    return baseIsEqual(value, other);
                }
                function isEqualWith(value, other, customizer) {
                    customizer = typeof customizer == 'function' ? customizer : undefined$1;
                    var result = customizer ? customizer(value, other) : undefined$1;
                    return result === undefined$1 ? baseIsEqual(value, other, undefined$1, customizer) : !!result;
                }
                function isError(value) {
                    if (!isObjectLike(value)) {
                        return false;
                    }
                    var tag = baseGetTag(value);
                    return tag == errorTag || tag == domExcTag || (typeof value.message == 'string' && typeof value.name == 'string' && !isPlainObject(value));
                }
                function isFinite(value) {
                    return typeof value == 'number' && nativeIsFinite(value);
                }
                function isFunction(value) {
                    if (!isObject(value)) {
                        return false;
                    }
                    var tag = baseGetTag(value);
                    return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;
                }
                function isInteger(value) {
                    return typeof value == 'number' && value == toInteger(value);
                }
                function isLength(value) {
                    return typeof value == 'number' && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
                }
                function isObject(value) {
                    var type = typeof value;
                    return value != null && (type == 'object' || type == 'function');
                }
                function isObjectLike(value) {
                    return value != null && typeof value == 'object';
                }
                var isMap = nodeIsMap ? baseUnary(nodeIsMap) : baseIsMap;
                function isMatch(object, source) {
                    return object === source || baseIsMatch(object, source, getMatchData(source));
                }
                function isMatchWith(object, source, customizer) {
                    customizer = typeof customizer == 'function' ? customizer : undefined$1;
                    return baseIsMatch(object, source, getMatchData(source), customizer);
                }
                function isNaN(value) {
                    return isNumber(value) && value != +value;
                }
                function isNative(value) {
                    if (isMaskable(value)) {
                        throw new Error(CORE_ERROR_TEXT);
                    }
                    return baseIsNative(value);
                }
                function isNull(value) {
                    return value === null;
                }
                function isNil(value) {
                    return value == null;
                }
                function isNumber(value) {
                    return typeof value == 'number' || (isObjectLike(value) && baseGetTag(value) == numberTag);
                }
                function isPlainObject(value) {
                    if (!isObjectLike(value) || baseGetTag(value) != objectTag) {
                        return false;
                    }
                    var proto = getPrototype(value);
                    if (proto === null) {
                        return true;
                    }
                    var Ctor = hasOwnProperty.call(proto, 'constructor') && proto.constructor;
                    return typeof Ctor == 'function' && Ctor instanceof Ctor && funcToString.call(Ctor) == objectCtorString;
                }
                var isRegExp = nodeIsRegExp ? baseUnary(nodeIsRegExp) : baseIsRegExp;
                function isSafeInteger(value) {
                    return isInteger(value) && value >= -MAX_SAFE_INTEGER && value <= MAX_SAFE_INTEGER;
                }
                var isSet = nodeIsSet ? baseUnary(nodeIsSet) : baseIsSet;
                function isString(value) {
                    return typeof value == 'string' || (!isArray(value) && isObjectLike(value) && baseGetTag(value) == stringTag);
                }
                function isSymbol(value) {
                    return typeof value == 'symbol' || (isObjectLike(value) && baseGetTag(value) == symbolTag);
                }
                var isTypedArray = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray;
                function isUndefined(value) {
                    return value === undefined$1;
                }
                function isWeakMap(value) {
                    return isObjectLike(value) && getTag(value) == weakMapTag;
                }
                function isWeakSet(value) {
                    return isObjectLike(value) && baseGetTag(value) == weakSetTag;
                }
                var lt = createRelationalOperation(baseLt);
                var lte = createRelationalOperation(function(value, other) {
                    return value <= other;
                });
                function toArray(value) {
                    if (!value) {
                        return [];
                    }
                    if (isArrayLike(value)) {
                        return isString(value) ? stringToArray(value) : copyArray(value);
                    }
                    if (symIterator && value[symIterator]) {
                        return iteratorToArray(value[symIterator]());
                    }
                    var tag = getTag(value), func = tag == mapTag ? mapToArray : (tag == setTag ? setToArray : values);
                    return func(value);
                }
                function toFinite(value) {
                    if (!value) {
                        return value === 0 ? value : 0;
                    }
                    value = toNumber(value);
                    if (value === INFINITY || value === -INFINITY) {
                        var sign = (value < 0 ? -1 : 1);
                        return sign * MAX_INTEGER;
                    }
                    return value === value ? value : 0;
                }
                function toInteger(value) {
                    var result = toFinite(value), remainder = result % 1;
                    return result === result ? (remainder ? result - remainder : result) : 0;
                }
                function toLength(value) {
                    return value ? baseClamp(toInteger(value), 0, MAX_ARRAY_LENGTH) : 0;
                }
                function toNumber(value) {
                    if (typeof value == 'number') {
                        return value;
                    }
                    if (isSymbol(value)) {
                        return NAN;
                    }
                    if (isObject(value)) {
                        var other = typeof value.valueOf == 'function' ? value.valueOf() : value;
                        value = isObject(other) ? (other + '') : other;
                    }
                    if (typeof value != 'string') {
                        return value === 0 ? value : +value;
                    }
                    value = baseTrim(value);
                    var isBinary = reIsBinary.test(value);
                    return (isBinary || reIsOctal.test(value)) ? freeParseInt(value.slice(2), isBinary ? 2 : 8) : (reIsBadHex.test(value) ? NAN : +value);
                }
                function toPlainObject(value) {
                    return copyObject(value, keysIn(value));
                }
                function toSafeInteger(value) {
                    return value ? baseClamp(toInteger(value), -MAX_SAFE_INTEGER, MAX_SAFE_INTEGER) : (value === 0 ? value : 0);
                }
                function toString(value) {
                    return value == null ? '' : baseToString(value);
                }
                var assign = createAssigner(function(object, source) {
                    if (isPrototype(source) || isArrayLike(source)) {
                        copyObject(source, keys(source), object);
                        return;
                    }
                    for(var key in source){
                        if (hasOwnProperty.call(source, key)) {
                            assignValue(object, key, source[key]);
                        }
                    }
                });
                var assignIn = createAssigner(function(object, source) {
                    copyObject(source, keysIn(source), object);
                });
                var assignInWith = createAssigner(function(object, source, srcIndex, customizer) {
                    copyObject(source, keysIn(source), object, customizer);
                });
                var assignWith = createAssigner(function(object, source, srcIndex, customizer) {
                    copyObject(source, keys(source), object, customizer);
                });
                var at = flatRest(baseAt);
                function create(prototype, properties) {
                    var result = baseCreate(prototype);
                    return properties == null ? result : baseAssign(result, properties);
                }
                var defaults = baseRest(function(object, sources) {
                    object = Object(object);
                    var index = -1;
                    var length = sources.length;
                    var guard = length > 2 ? sources[2] : undefined$1;
                    if (guard && isIterateeCall(sources[0], sources[1], guard)) {
                        length = 1;
                    }
                    while(++index < length){
                        var source = sources[index];
                        var props = keysIn(source);
                        var propsIndex = -1;
                        var propsLength = props.length;
                        while(++propsIndex < propsLength){
                            var key = props[propsIndex];
                            var value = object[key];
                            if (value === undefined$1 || (eq(value, objectProto[key]) && !hasOwnProperty.call(object, key))) {
                                object[key] = source[key];
                            }
                        }
                    }
                    return object;
                });
                var defaultsDeep = baseRest(function(args) {
                    args.push(undefined$1, customDefaultsMerge);
                    return apply(mergeWith, undefined$1, args);
                });
                function findKey(object, predicate) {
                    return baseFindKey(object, getIteratee(predicate, 3), baseForOwn);
                }
                function findLastKey(object, predicate) {
                    return baseFindKey(object, getIteratee(predicate, 3), baseForOwnRight);
                }
                function forIn(object, iteratee) {
                    return object == null ? object : baseFor(object, getIteratee(iteratee, 3), keysIn);
                }
                function forInRight(object, iteratee) {
                    return object == null ? object : baseForRight(object, getIteratee(iteratee, 3), keysIn);
                }
                function forOwn(object, iteratee) {
                    return object && baseForOwn(object, getIteratee(iteratee, 3));
                }
                function forOwnRight(object, iteratee) {
                    return object && baseForOwnRight(object, getIteratee(iteratee, 3));
                }
                function functions(object) {
                    return object == null ? [] : baseFunctions(object, keys(object));
                }
                function functionsIn(object) {
                    return object == null ? [] : baseFunctions(object, keysIn(object));
                }
                function get(object, path, defaultValue) {
                    var result = object == null ? undefined$1 : baseGet(object, path);
                    return result === undefined$1 ? defaultValue : result;
                }
                function has(object, path) {
                    return object != null && hasPath(object, path, baseHas);
                }
                function hasIn(object, path) {
                    return object != null && hasPath(object, path, baseHasIn);
                }
                var invert = createInverter(function(result, value, key) {
                    if (value != null && typeof value.toString != 'function') {
                        value = nativeObjectToString.call(value);
                    }
                    result[value] = key;
                }, constant(identity));
                var invertBy = createInverter(function(result, value, key) {
                    if (value != null && typeof value.toString != 'function') {
                        value = nativeObjectToString.call(value);
                    }
                    if (hasOwnProperty.call(result, value)) {
                        result[value].push(key);
                    } else {
                        result[value] = [
                            key
                        ];
                    }
                }, getIteratee);
                var invoke = baseRest(baseInvoke);
                function keys(object) {
                    return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);
                }
                function keysIn(object) {
                    return isArrayLike(object) ? arrayLikeKeys(object, true) : baseKeysIn(object);
                }
                function mapKeys(object, iteratee) {
                    var result = {};
                    iteratee = getIteratee(iteratee, 3);
                    baseForOwn(object, function(value, key, object) {
                        baseAssignValue(result, iteratee(value, key, object), value);
                    });
                    return result;
                }
                function mapValues(object, iteratee) {
                    var result = {};
                    iteratee = getIteratee(iteratee, 3);
                    baseForOwn(object, function(value, key, object) {
                        baseAssignValue(result, key, iteratee(value, key, object));
                    });
                    return result;
                }
                var merge = createAssigner(function(object, source, srcIndex) {
                    baseMerge(object, source, srcIndex);
                });
                var mergeWith = createAssigner(function(object, source, srcIndex, customizer) {
                    baseMerge(object, source, srcIndex, customizer);
                });
                var omit = flatRest(function(object, paths) {
                    var result = {};
                    if (object == null) {
                        return result;
                    }
                    var isDeep = false;
                    paths = arrayMap(paths, function(path) {
                        path = castPath(path, object);
                        isDeep || (isDeep = path.length > 1);
                        return path;
                    });
                    copyObject(object, getAllKeysIn(object), result);
                    if (isDeep) {
                        result = baseClone(result, CLONE_DEEP_FLAG | CLONE_FLAT_FLAG | CLONE_SYMBOLS_FLAG, customOmitClone);
                    }
                    var length = paths.length;
                    while(length--){
                        baseUnset(result, paths[length]);
                    }
                    return result;
                });
                function omitBy(object, predicate) {
                    return pickBy(object, negate(getIteratee(predicate)));
                }
                var pick = flatRest(function(object, paths) {
                    return object == null ? {} : basePick(object, paths);
                });
                function pickBy(object, predicate) {
                    if (object == null) {
                        return {};
                    }
                    var props = arrayMap(getAllKeysIn(object), function(prop) {
                        return [
                            prop
                        ];
                    });
                    predicate = getIteratee(predicate);
                    return basePickBy(object, props, function(value, path) {
                        return predicate(value, path[0]);
                    });
                }
                function result(object, path, defaultValue) {
                    path = castPath(path, object);
                    var index = -1, length = path.length;
                    if (!length) {
                        length = 1;
                        object = undefined$1;
                    }
                    while(++index < length){
                        var value = object == null ? undefined$1 : object[toKey(path[index])];
                        if (value === undefined$1) {
                            index = length;
                            value = defaultValue;
                        }
                        object = isFunction(value) ? value.call(object) : value;
                    }
                    return object;
                }
                function set(object, path, value) {
                    return object == null ? object : baseSet(object, path, value);
                }
                function setWith(object, path, value, customizer) {
                    customizer = typeof customizer == 'function' ? customizer : undefined$1;
                    return object == null ? object : baseSet(object, path, value, customizer);
                }
                var toPairs = createToPairs(keys);
                var toPairsIn = createToPairs(keysIn);
                function transform(object, iteratee, accumulator) {
                    var isArr = isArray(object), isArrLike = isArr || isBuffer(object) || isTypedArray(object);
                    iteratee = getIteratee(iteratee, 4);
                    if (accumulator == null) {
                        var Ctor = object && object.constructor;
                        if (isArrLike) {
                            accumulator = isArr ? new Ctor : [];
                        } else if (isObject(object)) {
                            accumulator = isFunction(Ctor) ? baseCreate(getPrototype(object)) : {};
                        } else {
                            accumulator = {};
                        }
                    }
                    (isArrLike ? arrayEach : baseForOwn)(object, function(value, index, object) {
                        return iteratee(accumulator, value, index, object);
                    });
                    return accumulator;
                }
                function unset(object, path) {
                    return object == null ? true : baseUnset(object, path);
                }
                function update(object, path, updater) {
                    return object == null ? object : baseUpdate(object, path, castFunction(updater));
                }
                function updateWith(object, path, updater, customizer) {
                    customizer = typeof customizer == 'function' ? customizer : undefined$1;
                    return object == null ? object : baseUpdate(object, path, castFunction(updater), customizer);
                }
                function values(object) {
                    return object == null ? [] : baseValues(object, keys(object));
                }
                function valuesIn(object) {
                    return object == null ? [] : baseValues(object, keysIn(object));
                }
                function clamp(number, lower, upper) {
                    if (upper === undefined$1) {
                        upper = lower;
                        lower = undefined$1;
                    }
                    if (upper !== undefined$1) {
                        upper = toNumber(upper);
                        upper = upper === upper ? upper : 0;
                    }
                    if (lower !== undefined$1) {
                        lower = toNumber(lower);
                        lower = lower === lower ? lower : 0;
                    }
                    return baseClamp(toNumber(number), lower, upper);
                }
                function inRange(number, start, end) {
                    start = toFinite(start);
                    if (end === undefined$1) {
                        end = start;
                        start = 0;
                    } else {
                        end = toFinite(end);
                    }
                    number = toNumber(number);
                    return baseInRange(number, start, end);
                }
                function random(lower, upper, floating) {
                    if (floating && typeof floating != 'boolean' && isIterateeCall(lower, upper, floating)) {
                        upper = floating = undefined$1;
                    }
                    if (floating === undefined$1) {
                        if (typeof upper == 'boolean') {
                            floating = upper;
                            upper = undefined$1;
                        } else if (typeof lower == 'boolean') {
                            floating = lower;
                            lower = undefined$1;
                        }
                    }
                    if (lower === undefined$1 && upper === undefined$1) {
                        lower = 0;
                        upper = 1;
                    } else {
                        lower = toFinite(lower);
                        if (upper === undefined$1) {
                            upper = lower;
                            lower = 0;
                        } else {
                            upper = toFinite(upper);
                        }
                    }
                    if (lower > upper) {
                        var temp = lower;
                        lower = upper;
                        upper = temp;
                    }
                    if (floating || lower % 1 || upper % 1) {
                        var rand = nativeRandom();
                        return nativeMin(lower + (rand * (upper - lower + freeParseFloat('1e-' + ((rand + '').length - 1)))), upper);
                    }
                    return baseRandom(lower, upper);
                }
                var camelCase = createCompounder(function(result, word, index) {
                    word = word.toLowerCase();
                    return result + (index ? capitalize(word) : word);
                });
                function capitalize(string) {
                    return upperFirst(toString(string).toLowerCase());
                }
                function deburr(string) {
                    string = toString(string);
                    return string && string.replace(reLatin, deburrLetter).replace(reComboMark, '');
                }
                function endsWith(string, target, position) {
                    string = toString(string);
                    target = baseToString(target);
                    var length = string.length;
                    position = position === undefined$1 ? length : baseClamp(toInteger(position), 0, length);
                    var end = position;
                    position -= target.length;
                    return position >= 0 && string.slice(position, end) == target;
                }
                function escape(string) {
                    string = toString(string);
                    return (string && reHasUnescapedHtml.test(string)) ? string.replace(reUnescapedHtml, escapeHtmlChar) : string;
                }
                function escapeRegExp(string) {
                    string = toString(string);
                    return (string && reHasRegExpChar.test(string)) ? string.replace(reRegExpChar, '\\$&') : string;
                }
                var kebabCase = createCompounder(function(result, word, index) {
                    return result + (index ? '-' : '') + word.toLowerCase();
                });
                var lowerCase = createCompounder(function(result, word, index) {
                    return result + (index ? ' ' : '') + word.toLowerCase();
                });
                var lowerFirst = createCaseFirst('toLowerCase');
                function pad(string, length, chars) {
                    string = toString(string);
                    length = toInteger(length);
                    var strLength = length ? stringSize(string) : 0;
                    if (!length || strLength >= length) {
                        return string;
                    }
                    var mid = (length - strLength) / 2;
                    return (createPadding(nativeFloor(mid), chars) + string + createPadding(nativeCeil(mid), chars));
                }
                function padEnd(string, length, chars) {
                    string = toString(string);
                    length = toInteger(length);
                    var strLength = length ? stringSize(string) : 0;
                    return (length && strLength < length) ? (string + createPadding(length - strLength, chars)) : string;
                }
                function padStart(string, length, chars) {
                    string = toString(string);
                    length = toInteger(length);
                    var strLength = length ? stringSize(string) : 0;
                    return (length && strLength < length) ? (createPadding(length - strLength, chars) + string) : string;
                }
                function parseInt(string, radix, guard) {
                    if (guard || radix == null) {
                        radix = 0;
                    } else if (radix) {
                        radix = +radix;
                    }
                    return nativeParseInt(toString(string).replace(reTrimStart, ''), radix || 0);
                }
                function repeat(string, n, guard) {
                    if ((guard ? isIterateeCall(string, n, guard) : n === undefined$1)) {
                        n = 1;
                    } else {
                        n = toInteger(n);
                    }
                    return baseRepeat(toString(string), n);
                }
                function replace() {
                    var args = arguments, string = toString(args[0]);
                    return args.length < 3 ? string : string.replace(args[1], args[2]);
                }
                var snakeCase = createCompounder(function(result, word, index) {
                    return result + (index ? '_' : '') + word.toLowerCase();
                });
                function split(string, separator, limit) {
                    if (limit && typeof limit != 'number' && isIterateeCall(string, separator, limit)) {
                        separator = limit = undefined$1;
                    }
                    limit = limit === undefined$1 ? MAX_ARRAY_LENGTH : limit >>> 0;
                    if (!limit) {
                        return [];
                    }
                    string = toString(string);
                    if (string && (typeof separator == 'string' || (separator != null && !isRegExp(separator)))) {
                        separator = baseToString(separator);
                        if (!separator && hasUnicode(string)) {
                            return castSlice(stringToArray(string), 0, limit);
                        }
                    }
                    return string.split(separator, limit);
                }
                var startCase = createCompounder(function(result, word, index) {
                    return result + (index ? ' ' : '') + upperFirst(word);
                });
                function startsWith(string, target, position) {
                    string = toString(string);
                    position = position == null ? 0 : baseClamp(toInteger(position), 0, string.length);
                    target = baseToString(target);
                    return string.slice(position, position + target.length) == target;
                }
                function template(string, options, guard) {
                    var settings = lodash.templateSettings;
                    if (guard && isIterateeCall(string, options, guard)) {
                        options = undefined$1;
                    }
                    string = toString(string);
                    options = assignInWith({}, options, settings, customDefaultsAssignIn);
                    var imports = assignInWith({}, options.imports, settings.imports, customDefaultsAssignIn), importsKeys = keys(imports), importsValues = baseValues(imports, importsKeys);
                    var isEscaping, isEvaluating, index = 0, interpolate = options.interpolate || reNoMatch, source = "__p += '";
                    var reDelimiters = RegExp((options.escape || reNoMatch).source + '|' + interpolate.source + '|' + (interpolate === reInterpolate ? reEsTemplate : reNoMatch).source + '|' + (options.evaluate || reNoMatch).source + '|$', 'g');
                    var sourceURL = '//# sourceURL=' + (hasOwnProperty.call(options, 'sourceURL') ? (options.sourceURL + '').replace(/\s/g, ' ') : ('lodash.templateSources[' + (++templateCounter) + ']')) + '\n';
                    string.replace(reDelimiters, function(match, escapeValue, interpolateValue, esTemplateValue, evaluateValue, offset) {
                        interpolateValue || (interpolateValue = esTemplateValue);
                        source += string.slice(index, offset).replace(reUnescapedString, escapeStringChar);
                        if (escapeValue) {
                            isEscaping = true;
                            source += "' +\n__e(" + escapeValue + ") +\n'";
                        }
                        if (evaluateValue) {
                            isEvaluating = true;
                            source += "';\n" + evaluateValue + ";\n__p += '";
                        }
                        if (interpolateValue) {
                            source += "' +\n((__t = (" + interpolateValue + ")) == null ? '' : __t) +\n'";
                        }
                        index = offset + match.length;
                        return match;
                    });
                    source += "';\n";
                    var variable = hasOwnProperty.call(options, 'variable') && options.variable;
                    if (!variable) {
                        source = 'with (obj) {\n' + source + '\n}\n';
                    } else if (reForbiddenIdentifierChars.test(variable)) {
                        throw new Error(INVALID_TEMPL_VAR_ERROR_TEXT);
                    }
                    source = (isEvaluating ? source.replace(reEmptyStringLeading, '') : source).replace(reEmptyStringMiddle, '$1').replace(reEmptyStringTrailing, '$1;');
                    source = 'function(' + (variable || 'obj') + ') {\n' + (variable ? '' : 'obj || (obj = {});\n') + "var __t, __p = ''" + (isEscaping ? ', __e = _.escape' : '') + (isEvaluating ? ', __j = Array.prototype.join;\n' + "function print() { __p += __j.call(arguments, '') }\n" : ';\n') + source + 'return __p\n}';
                    var result = attempt(function() {
                        return Function(importsKeys, sourceURL + 'return ' + source).apply(undefined$1, importsValues);
                    });
                    result.source = source;
                    if (isError(result)) {
                        throw result;
                    }
                    return result;
                }
                function toLower(value) {
                    return toString(value).toLowerCase();
                }
                function toUpper(value) {
                    return toString(value).toUpperCase();
                }
                function trim(string, chars, guard) {
                    string = toString(string);
                    if (string && (guard || chars === undefined$1)) {
                        return baseTrim(string);
                    }
                    if (!string || !(chars = baseToString(chars))) {
                        return string;
                    }
                    var strSymbols = stringToArray(string), chrSymbols = stringToArray(chars), start = charsStartIndex(strSymbols, chrSymbols), end = charsEndIndex(strSymbols, chrSymbols) + 1;
                    return castSlice(strSymbols, start, end).join('');
                }
                function trimEnd(string, chars, guard) {
                    string = toString(string);
                    if (string && (guard || chars === undefined$1)) {
                        return string.slice(0, trimmedEndIndex(string) + 1);
                    }
                    if (!string || !(chars = baseToString(chars))) {
                        return string;
                    }
                    var strSymbols = stringToArray(string), end = charsEndIndex(strSymbols, stringToArray(chars)) + 1;
                    return castSlice(strSymbols, 0, end).join('');
                }
                function trimStart(string, chars, guard) {
                    string = toString(string);
                    if (string && (guard || chars === undefined$1)) {
                        return string.replace(reTrimStart, '');
                    }
                    if (!string || !(chars = baseToString(chars))) {
                        return string;
                    }
                    var strSymbols = stringToArray(string), start = charsStartIndex(strSymbols, stringToArray(chars));
                    return castSlice(strSymbols, start).join('');
                }
                function truncate(string, options) {
                    var length = DEFAULT_TRUNC_LENGTH, omission = DEFAULT_TRUNC_OMISSION;
                    if (isObject(options)) {
                        var separator = 'separator' in options ? options.separator : separator;
                        length = 'length' in options ? toInteger(options.length) : length;
                        omission = 'omission' in options ? baseToString(options.omission) : omission;
                    }
                    string = toString(string);
                    var strLength = string.length;
                    if (hasUnicode(string)) {
                        var strSymbols = stringToArray(string);
                        strLength = strSymbols.length;
                    }
                    if (length >= strLength) {
                        return string;
                    }
                    var end = length - stringSize(omission);
                    if (end < 1) {
                        return omission;
                    }
                    var result = strSymbols ? castSlice(strSymbols, 0, end).join('') : string.slice(0, end);
                    if (separator === undefined$1) {
                        return result + omission;
                    }
                    if (strSymbols) {
                        end += (result.length - end);
                    }
                    if (isRegExp(separator)) {
                        if (string.slice(end).search(separator)) {
                            var match, substring = result;
                            if (!separator.global) {
                                separator = RegExp(separator.source, toString(reFlags.exec(separator)) + 'g');
                            }
                            separator.lastIndex = 0;
                            while((match = separator.exec(substring))){
                                var newEnd = match.index;
                            }
                            result = result.slice(0, newEnd === undefined$1 ? end : newEnd);
                        }
                    } else if (string.indexOf(baseToString(separator), end) != end) {
                        var index = result.lastIndexOf(separator);
                        if (index > -1) {
                            result = result.slice(0, index);
                        }
                    }
                    return result + omission;
                }
                function unescape(string) {
                    string = toString(string);
                    return (string && reHasEscapedHtml.test(string)) ? string.replace(reEscapedHtml, unescapeHtmlChar) : string;
                }
                var upperCase = createCompounder(function(result, word, index) {
                    return result + (index ? ' ' : '') + word.toUpperCase();
                });
                var upperFirst = createCaseFirst('toUpperCase');
                function words(string, pattern, guard) {
                    string = toString(string);
                    pattern = guard ? undefined$1 : pattern;
                    if (pattern === undefined$1) {
                        return hasUnicodeWord(string) ? unicodeWords(string) : asciiWords(string);
                    }
                    return string.match(pattern) || [];
                }
                var attempt = baseRest(function(func, args) {
                    try {
                        return apply(func, undefined$1, args);
                    } catch (e) {
                        return isError(e) ? e : new Error(e);
                    }
                });
                var bindAll = flatRest(function(object, methodNames) {
                    arrayEach(methodNames, function(key) {
                        key = toKey(key);
                        baseAssignValue(object, key, bind(object[key], object));
                    });
                    return object;
                });
                function cond(pairs) {
                    var length = pairs == null ? 0 : pairs.length, toIteratee = getIteratee();
                    pairs = !length ? [] : arrayMap(pairs, function(pair) {
                        if (typeof pair[1] != 'function') {
                            throw new TypeError(FUNC_ERROR_TEXT);
                        }
                        return [
                            toIteratee(pair[0]),
                            pair[1]
                        ];
                    });
                    return baseRest(function(args) {
                        var index = -1;
                        while(++index < length){
                            var pair = pairs[index];
                            if (apply(pair[0], this, args)) {
                                return apply(pair[1], this, args);
                            }
                        }
                    });
                }
                function conforms(source) {
                    return baseConforms(baseClone(source, CLONE_DEEP_FLAG));
                }
                function constant(value) {
                    return function() {
                        return value;
                    };
                }
                function defaultTo(value, defaultValue) {
                    return (value == null || value !== value) ? defaultValue : value;
                }
                var flow = createFlow();
                var flowRight = createFlow(true);
                function identity(value) {
                    return value;
                }
                function iteratee(func) {
                    return baseIteratee(typeof func == 'function' ? func : baseClone(func, CLONE_DEEP_FLAG));
                }
                function matches(source) {
                    return baseMatches(baseClone(source, CLONE_DEEP_FLAG));
                }
                function matchesProperty(path, srcValue) {
                    return baseMatchesProperty(path, baseClone(srcValue, CLONE_DEEP_FLAG));
                }
                var method = baseRest(function(path, args) {
                    return function(object) {
                        return baseInvoke(object, path, args);
                    };
                });
                var methodOf = baseRest(function(object, args) {
                    return function(path) {
                        return baseInvoke(object, path, args);
                    };
                });
                function mixin(object, source, options) {
                    var props = keys(source), methodNames = baseFunctions(source, props);
                    if (options == null && !(isObject(source) && (methodNames.length || !props.length))) {
                        options = source;
                        source = object;
                        object = this;
                        methodNames = baseFunctions(source, keys(source));
                    }
                    var chain = !(isObject(options) && 'chain' in options) || !!options.chain, isFunc = isFunction(object);
                    arrayEach(methodNames, function(methodName) {
                        var func = source[methodName];
                        object[methodName] = func;
                        if (isFunc) {
                            object.prototype[methodName] = function() {
                                var chainAll = this.__chain__;
                                if (chain || chainAll) {
                                    var result = object(this.__wrapped__), actions = result.__actions__ = copyArray(this.__actions__);
                                    actions.push({
                                        'func': func,
                                        'args': arguments,
                                        'thisArg': object
                                    });
                                    result.__chain__ = chainAll;
                                    return result;
                                }
                                return func.apply(object, arrayPush([
                                    this.value()
                                ], arguments));
                            };
                        }
                    });
                    return object;
                }
                function noConflict() {
                    if (root._ === this) {
                        root._ = oldDash;
                    }
                    return this;
                }
                function noop() {}
                function nthArg(n) {
                    n = toInteger(n);
                    return baseRest(function(args) {
                        return baseNth(args, n);
                    });
                }
                var over = createOver(arrayMap);
                var overEvery = createOver(arrayEvery);
                var overSome = createOver(arraySome);
                function property(path) {
                    return isKey(path) ? baseProperty(toKey(path)) : basePropertyDeep(path);
                }
                function propertyOf(object) {
                    return function(path) {
                        return object == null ? undefined$1 : baseGet(object, path);
                    };
                }
                var range = createRange();
                var rangeRight = createRange(true);
                function stubArray() {
                    return [];
                }
                function stubFalse() {
                    return false;
                }
                function stubObject() {
                    return {};
                }
                function stubString() {
                    return '';
                }
                function stubTrue() {
                    return true;
                }
                function times(n, iteratee) {
                    n = toInteger(n);
                    if (n < 1 || n > MAX_SAFE_INTEGER) {
                        return [];
                    }
                    var index = MAX_ARRAY_LENGTH, length = nativeMin(n, MAX_ARRAY_LENGTH);
                    iteratee = getIteratee(iteratee);
                    n -= MAX_ARRAY_LENGTH;
                    var result = baseTimes(length, iteratee);
                    while(++index < n){
                        iteratee(index);
                    }
                    return result;
                }
                function toPath(value) {
                    if (isArray(value)) {
                        return arrayMap(value, toKey);
                    }
                    return isSymbol(value) ? [
                        value
                    ] : copyArray(stringToPath(toString(value)));
                }
                function uniqueId(prefix) {
                    var id = ++idCounter;
                    return toString(prefix) + id;
                }
                var add = createMathOperation(function(augend, addend) {
                    return augend + addend;
                }, 0);
                var ceil = createRound('ceil');
                var divide = createMathOperation(function(dividend, divisor) {
                    return dividend / divisor;
                }, 1);
                var floor = createRound('floor');
                function max(array) {
                    return (array && array.length) ? baseExtremum(array, identity, baseGt) : undefined$1;
                }
                function maxBy(array, iteratee) {
                    return (array && array.length) ? baseExtremum(array, getIteratee(iteratee, 2), baseGt) : undefined$1;
                }
                function mean(array) {
                    return baseMean(array, identity);
                }
                function meanBy(array, iteratee) {
                    return baseMean(array, getIteratee(iteratee, 2));
                }
                function min(array) {
                    return (array && array.length) ? baseExtremum(array, identity, baseLt) : undefined$1;
                }
                function minBy(array, iteratee) {
                    return (array && array.length) ? baseExtremum(array, getIteratee(iteratee, 2), baseLt) : undefined$1;
                }
                var multiply = createMathOperation(function(multiplier, multiplicand) {
                    return multiplier * multiplicand;
                }, 1);
                var round = createRound('round');
                var subtract = createMathOperation(function(minuend, subtrahend) {
                    return minuend - subtrahend;
                }, 0);
                function sum(array) {
                    return (array && array.length) ? baseSum(array, identity) : 0;
                }
                function sumBy(array, iteratee) {
                    return (array && array.length) ? baseSum(array, getIteratee(iteratee, 2)) : 0;
                }
                lodash.after = after;
                lodash.ary = ary;
                lodash.assign = assign;
                lodash.assignIn = assignIn;
                lodash.assignInWith = assignInWith;
                lodash.assignWith = assignWith;
                lodash.at = at;
                lodash.before = before;
                lodash.bind = bind;
                lodash.bindAll = bindAll;
                lodash.bindKey = bindKey;
                lodash.castArray = castArray;
                lodash.chain = chain;
                lodash.chunk = chunk;
                lodash.compact = compact;
                lodash.concat = concat;
                lodash.cond = cond;
                lodash.conforms = conforms;
                lodash.constant = constant;
                lodash.countBy = countBy;
                lodash.create = create;
                lodash.curry = curry;
                lodash.curryRight = curryRight;
                lodash.debounce = debounce;
                lodash.defaults = defaults;
                lodash.defaultsDeep = defaultsDeep;
                lodash.defer = defer;
                lodash.delay = delay;
                lodash.difference = difference;
                lodash.differenceBy = differenceBy;
                lodash.differenceWith = differenceWith;
                lodash.drop = drop;
                lodash.dropRight = dropRight;
                lodash.dropRightWhile = dropRightWhile;
                lodash.dropWhile = dropWhile;
                lodash.fill = fill;
                lodash.filter = filter;
                lodash.flatMap = flatMap;
                lodash.flatMapDeep = flatMapDeep;
                lodash.flatMapDepth = flatMapDepth;
                lodash.flatten = flatten;
                lodash.flattenDeep = flattenDeep;
                lodash.flattenDepth = flattenDepth;
                lodash.flip = flip;
                lodash.flow = flow;
                lodash.flowRight = flowRight;
                lodash.fromPairs = fromPairs;
                lodash.functions = functions;
                lodash.functionsIn = functionsIn;
                lodash.groupBy = groupBy;
                lodash.initial = initial;
                lodash.intersection = intersection;
                lodash.intersectionBy = intersectionBy;
                lodash.intersectionWith = intersectionWith;
                lodash.invert = invert;
                lodash.invertBy = invertBy;
                lodash.invokeMap = invokeMap;
                lodash.iteratee = iteratee;
                lodash.keyBy = keyBy;
                lodash.keys = keys;
                lodash.keysIn = keysIn;
                lodash.map = map;
                lodash.mapKeys = mapKeys;
                lodash.mapValues = mapValues;
                lodash.matches = matches;
                lodash.matchesProperty = matchesProperty;
                lodash.memoize = memoize;
                lodash.merge = merge;
                lodash.mergeWith = mergeWith;
                lodash.method = method;
                lodash.methodOf = methodOf;
                lodash.mixin = mixin;
                lodash.negate = negate;
                lodash.nthArg = nthArg;
                lodash.omit = omit;
                lodash.omitBy = omitBy;
                lodash.once = once;
                lodash.orderBy = orderBy;
                lodash.over = over;
                lodash.overArgs = overArgs;
                lodash.overEvery = overEvery;
                lodash.overSome = overSome;
                lodash.partial = partial;
                lodash.partialRight = partialRight;
                lodash.partition = partition;
                lodash.pick = pick;
                lodash.pickBy = pickBy;
                lodash.property = property;
                lodash.propertyOf = propertyOf;
                lodash.pull = pull;
                lodash.pullAll = pullAll;
                lodash.pullAllBy = pullAllBy;
                lodash.pullAllWith = pullAllWith;
                lodash.pullAt = pullAt;
                lodash.range = range;
                lodash.rangeRight = rangeRight;
                lodash.rearg = rearg;
                lodash.reject = reject;
                lodash.remove = remove;
                lodash.rest = rest;
                lodash.reverse = reverse;
                lodash.sampleSize = sampleSize;
                lodash.set = set;
                lodash.setWith = setWith;
                lodash.shuffle = shuffle;
                lodash.slice = slice;
                lodash.sortBy = sortBy;
                lodash.sortedUniq = sortedUniq;
                lodash.sortedUniqBy = sortedUniqBy;
                lodash.split = split;
                lodash.spread = spread;
                lodash.tail = tail;
                lodash.take = take;
                lodash.takeRight = takeRight;
                lodash.takeRightWhile = takeRightWhile;
                lodash.takeWhile = takeWhile;
                lodash.tap = tap;
                lodash.throttle = throttle;
                lodash.thru = thru;
                lodash.toArray = toArray;
                lodash.toPairs = toPairs;
                lodash.toPairsIn = toPairsIn;
                lodash.toPath = toPath;
                lodash.toPlainObject = toPlainObject;
                lodash.transform = transform;
                lodash.unary = unary;
                lodash.union = union;
                lodash.unionBy = unionBy;
                lodash.unionWith = unionWith;
                lodash.uniq = uniq;
                lodash.uniqBy = uniqBy;
                lodash.uniqWith = uniqWith;
                lodash.unset = unset;
                lodash.unzip = unzip;
                lodash.unzipWith = unzipWith;
                lodash.update = update;
                lodash.updateWith = updateWith;
                lodash.values = values;
                lodash.valuesIn = valuesIn;
                lodash.without = without;
                lodash.words = words;
                lodash.wrap = wrap;
                lodash.xor = xor;
                lodash.xorBy = xorBy;
                lodash.xorWith = xorWith;
                lodash.zip = zip;
                lodash.zipObject = zipObject;
                lodash.zipObjectDeep = zipObjectDeep;
                lodash.zipWith = zipWith;
                lodash.entries = toPairs;
                lodash.entriesIn = toPairsIn;
                lodash.extend = assignIn;
                lodash.extendWith = assignInWith;
                mixin(lodash, lodash);
                lodash.add = add;
                lodash.attempt = attempt;
                lodash.camelCase = camelCase;
                lodash.capitalize = capitalize;
                lodash.ceil = ceil;
                lodash.clamp = clamp;
                lodash.clone = clone;
                lodash.cloneDeep = cloneDeep;
                lodash.cloneDeepWith = cloneDeepWith;
                lodash.cloneWith = cloneWith;
                lodash.conformsTo = conformsTo;
                lodash.deburr = deburr;
                lodash.defaultTo = defaultTo;
                lodash.divide = divide;
                lodash.endsWith = endsWith;
                lodash.eq = eq;
                lodash.escape = escape;
                lodash.escapeRegExp = escapeRegExp;
                lodash.every = every;
                lodash.find = find;
                lodash.findIndex = findIndex;
                lodash.findKey = findKey;
                lodash.findLast = findLast;
                lodash.findLastIndex = findLastIndex;
                lodash.findLastKey = findLastKey;
                lodash.floor = floor;
                lodash.forEach = forEach;
                lodash.forEachRight = forEachRight;
                lodash.forIn = forIn;
                lodash.forInRight = forInRight;
                lodash.forOwn = forOwn;
                lodash.forOwnRight = forOwnRight;
                lodash.get = get;
                lodash.gt = gt;
                lodash.gte = gte;
                lodash.has = has;
                lodash.hasIn = hasIn;
                lodash.head = head;
                lodash.identity = identity;
                lodash.includes = includes;
                lodash.indexOf = indexOf;
                lodash.inRange = inRange;
                lodash.invoke = invoke;
                lodash.isArguments = isArguments;
                lodash.isArray = isArray;
                lodash.isArrayBuffer = isArrayBuffer;
                lodash.isArrayLike = isArrayLike;
                lodash.isArrayLikeObject = isArrayLikeObject;
                lodash.isBoolean = isBoolean;
                lodash.isBuffer = isBuffer;
                lodash.isDate = isDate;
                lodash.isElement = isElement;
                lodash.isEmpty = isEmpty;
                lodash.isEqual = isEqual;
                lodash.isEqualWith = isEqualWith;
                lodash.isError = isError;
                lodash.isFinite = isFinite;
                lodash.isFunction = isFunction;
                lodash.isInteger = isInteger;
                lodash.isLength = isLength;
                lodash.isMap = isMap;
                lodash.isMatch = isMatch;
                lodash.isMatchWith = isMatchWith;
                lodash.isNaN = isNaN;
                lodash.isNative = isNative;
                lodash.isNil = isNil;
                lodash.isNull = isNull;
                lodash.isNumber = isNumber;
                lodash.isObject = isObject;
                lodash.isObjectLike = isObjectLike;
                lodash.isPlainObject = isPlainObject;
                lodash.isRegExp = isRegExp;
                lodash.isSafeInteger = isSafeInteger;
                lodash.isSet = isSet;
                lodash.isString = isString;
                lodash.isSymbol = isSymbol;
                lodash.isTypedArray = isTypedArray;
                lodash.isUndefined = isUndefined;
                lodash.isWeakMap = isWeakMap;
                lodash.isWeakSet = isWeakSet;
                lodash.join = join;
                lodash.kebabCase = kebabCase;
                lodash.last = last;
                lodash.lastIndexOf = lastIndexOf;
                lodash.lowerCase = lowerCase;
                lodash.lowerFirst = lowerFirst;
                lodash.lt = lt;
                lodash.lte = lte;
                lodash.max = max;
                lodash.maxBy = maxBy;
                lodash.mean = mean;
                lodash.meanBy = meanBy;
                lodash.min = min;
                lodash.minBy = minBy;
                lodash.stubArray = stubArray;
                lodash.stubFalse = stubFalse;
                lodash.stubObject = stubObject;
                lodash.stubString = stubString;
                lodash.stubTrue = stubTrue;
                lodash.multiply = multiply;
                lodash.nth = nth;
                lodash.noConflict = noConflict;
                lodash.noop = noop;
                lodash.now = now;
                lodash.pad = pad;
                lodash.padEnd = padEnd;
                lodash.padStart = padStart;
                lodash.parseInt = parseInt;
                lodash.random = random;
                lodash.reduce = reduce;
                lodash.reduceRight = reduceRight;
                lodash.repeat = repeat;
                lodash.replace = replace;
                lodash.result = result;
                lodash.round = round;
                lodash.runInContext = runInContext;
                lodash.sample = sample;
                lodash.size = size;
                lodash.snakeCase = snakeCase;
                lodash.some = some;
                lodash.sortedIndex = sortedIndex;
                lodash.sortedIndexBy = sortedIndexBy;
                lodash.sortedIndexOf = sortedIndexOf;
                lodash.sortedLastIndex = sortedLastIndex;
                lodash.sortedLastIndexBy = sortedLastIndexBy;
                lodash.sortedLastIndexOf = sortedLastIndexOf;
                lodash.startCase = startCase;
                lodash.startsWith = startsWith;
                lodash.subtract = subtract;
                lodash.sum = sum;
                lodash.sumBy = sumBy;
                lodash.template = template;
                lodash.times = times;
                lodash.toFinite = toFinite;
                lodash.toInteger = toInteger;
                lodash.toLength = toLength;
                lodash.toLower = toLower;
                lodash.toNumber = toNumber;
                lodash.toSafeInteger = toSafeInteger;
                lodash.toString = toString;
                lodash.toUpper = toUpper;
                lodash.trim = trim;
                lodash.trimEnd = trimEnd;
                lodash.trimStart = trimStart;
                lodash.truncate = truncate;
                lodash.unescape = unescape;
                lodash.uniqueId = uniqueId;
                lodash.upperCase = upperCase;
                lodash.upperFirst = upperFirst;
                lodash.each = forEach;
                lodash.eachRight = forEachRight;
                lodash.first = head;
                mixin(lodash, (function() {
                    var source = {};
                    baseForOwn(lodash, function(func, methodName) {
                        if (!hasOwnProperty.call(lodash.prototype, methodName)) {
                            source[methodName] = func;
                        }
                    });
                    return source;
                }()), {
                    'chain': false
                });
                lodash.VERSION = VERSION;
                arrayEach([
                    'bind',
                    'bindKey',
                    'curry',
                    'curryRight',
                    'partial',
                    'partialRight'
                ], function(methodName) {
                    lodash[methodName].placeholder = lodash;
                });
                arrayEach([
                    'drop',
                    'take'
                ], function(methodName, index) {
                    LazyWrapper.prototype[methodName] = function(n) {
                        n = n === undefined$1 ? 1 : nativeMax(toInteger(n), 0);
                        var result = (this.__filtered__ && !index) ? new LazyWrapper(this) : this.clone();
                        if (result.__filtered__) {
                            result.__takeCount__ = nativeMin(n, result.__takeCount__);
                        } else {
                            result.__views__.push({
                                'size': nativeMin(n, MAX_ARRAY_LENGTH),
                                'type': methodName + (result.__dir__ < 0 ? 'Right' : '')
                            });
                        }
                        return result;
                    };
                    LazyWrapper.prototype[methodName + 'Right'] = function(n) {
                        return this.reverse()[methodName](n).reverse();
                    };
                });
                arrayEach([
                    'filter',
                    'map',
                    'takeWhile'
                ], function(methodName, index) {
                    var type = index + 1, isFilter = type == LAZY_FILTER_FLAG || type == LAZY_WHILE_FLAG;
                    LazyWrapper.prototype[methodName] = function(iteratee) {
                        var result = this.clone();
                        result.__iteratees__.push({
                            'iteratee': getIteratee(iteratee, 3),
                            'type': type
                        });
                        result.__filtered__ = result.__filtered__ || isFilter;
                        return result;
                    };
                });
                arrayEach([
                    'head',
                    'last'
                ], function(methodName, index) {
                    var takeName = 'take' + (index ? 'Right' : '');
                    LazyWrapper.prototype[methodName] = function() {
                        return this[takeName](1).value()[0];
                    };
                });
                arrayEach([
                    'initial',
                    'tail'
                ], function(methodName, index) {
                    var dropName = 'drop' + (index ? '' : 'Right');
                    LazyWrapper.prototype[methodName] = function() {
                        return this.__filtered__ ? new LazyWrapper(this) : this[dropName](1);
                    };
                });
                LazyWrapper.prototype.compact = function() {
                    return this.filter(identity);
                };
                LazyWrapper.prototype.find = function(predicate) {
                    return this.filter(predicate).head();
                };
                LazyWrapper.prototype.findLast = function(predicate) {
                    return this.reverse().find(predicate);
                };
                LazyWrapper.prototype.invokeMap = baseRest(function(path, args) {
                    if (typeof path == 'function') {
                        return new LazyWrapper(this);
                    }
                    return this.map(function(value) {
                        return baseInvoke(value, path, args);
                    });
                });
                LazyWrapper.prototype.reject = function(predicate) {
                    return this.filter(negate(getIteratee(predicate)));
                };
                LazyWrapper.prototype.slice = function(start, end) {
                    start = toInteger(start);
                    var result = this;
                    if (result.__filtered__ && (start > 0 || end < 0)) {
                        return new LazyWrapper(result);
                    }
                    if (start < 0) {
                        result = result.takeRight(-start);
                    } else if (start) {
                        result = result.drop(start);
                    }
                    if (end !== undefined$1) {
                        end = toInteger(end);
                        result = end < 0 ? result.dropRight(-end) : result.take(end - start);
                    }
                    return result;
                };
                LazyWrapper.prototype.takeRightWhile = function(predicate) {
                    return this.reverse().takeWhile(predicate).reverse();
                };
                LazyWrapper.prototype.toArray = function() {
                    return this.take(MAX_ARRAY_LENGTH);
                };
                baseForOwn(LazyWrapper.prototype, function(func, methodName) {
                    var checkIteratee = /^(?:filter|find|map|reject)|While$/.test(methodName), isTaker = /^(?:head|last)$/.test(methodName), lodashFunc = lodash[isTaker ? ('take' + (methodName == 'last' ? 'Right' : '')) : methodName], retUnwrapped = isTaker || /^find/.test(methodName);
                    if (!lodashFunc) {
                        return;
                    }
                    lodash.prototype[methodName] = function() {
                        var value = this.__wrapped__, args = isTaker ? [
                            1
                        ] : arguments, isLazy = value instanceof LazyWrapper, iteratee = args[0], useLazy = isLazy || isArray(value);
                        var interceptor = function(value) {
                            var result = lodashFunc.apply(lodash, arrayPush([
                                value
                            ], args));
                            return (isTaker && chainAll) ? result[0] : result;
                        };
                        if (useLazy && checkIteratee && typeof iteratee == 'function' && iteratee.length != 1) {
                            isLazy = useLazy = false;
                        }
                        var chainAll = this.__chain__, isHybrid = !!this.__actions__.length, isUnwrapped = retUnwrapped && !chainAll, onlyLazy = isLazy && !isHybrid;
                        if (!retUnwrapped && useLazy) {
                            value = onlyLazy ? value : new LazyWrapper(this);
                            var result = func.apply(value, args);
                            result.__actions__.push({
                                'func': thru,
                                'args': [
                                    interceptor
                                ],
                                'thisArg': undefined$1
                            });
                            return new LodashWrapper(result, chainAll);
                        }
                        if (isUnwrapped && onlyLazy) {
                            return func.apply(this, args);
                        }
                        result = this.thru(interceptor);
                        return isUnwrapped ? (isTaker ? result.value()[0] : result.value()) : result;
                    };
                });
                arrayEach([
                    'pop',
                    'push',
                    'shift',
                    'sort',
                    'splice',
                    'unshift'
                ], function(methodName) {
                    var func = arrayProto[methodName], chainName = /^(?:push|sort|unshift)$/.test(methodName) ? 'tap' : 'thru', retUnwrapped = /^(?:pop|shift)$/.test(methodName);
                    lodash.prototype[methodName] = function() {
                        var args = arguments;
                        if (retUnwrapped && !this.__chain__) {
                            var value = this.value();
                            return func.apply(isArray(value) ? value : [], args);
                        }
                        return this[chainName](function(value) {
                            return func.apply(isArray(value) ? value : [], args);
                        });
                    };
                });
                baseForOwn(LazyWrapper.prototype, function(func, methodName) {
                    var lodashFunc = lodash[methodName];
                    if (lodashFunc) {
                        var key = lodashFunc.name + '';
                        if (!hasOwnProperty.call(realNames, key)) {
                            realNames[key] = [];
                        }
                        realNames[key].push({
                            'name': methodName,
                            'func': lodashFunc
                        });
                    }
                });
                realNames[createHybrid(undefined$1, WRAP_BIND_KEY_FLAG).name] = [
                    {
                        'name': 'wrapper',
                        'func': undefined$1
                    }
                ];
                LazyWrapper.prototype.clone = lazyClone;
                LazyWrapper.prototype.reverse = lazyReverse;
                LazyWrapper.prototype.value = lazyValue;
                lodash.prototype.at = wrapperAt;
                lodash.prototype.chain = wrapperChain;
                lodash.prototype.commit = wrapperCommit;
                lodash.prototype.next = wrapperNext;
                lodash.prototype.plant = wrapperPlant;
                lodash.prototype.reverse = wrapperReverse;
                lodash.prototype.toJSON = lodash.prototype.valueOf = lodash.prototype.value = wrapperValue;
                lodash.prototype.first = lodash.prototype.head;
                if (symIterator) {
                    lodash.prototype[symIterator] = wrapperToIterator;
                }
                return lodash;
            });
            var _ = runInContext();
            if (freeModule) {
                (freeModule.exports = _)._ = _;
                freeExports._ = _;
            } else {
                root._ = _;
            }
        }.call(commonjsGlobal));
    }(lodash, lodash.exports));
    var lodashExports = lodash.exports;
    const [searchStore, setSearchStore] = createStore({
        searchTerm: "",
        searchResults: [],
        searchPerformed: false
    });
    var _tmpl$$e = template(`<div><div><div><div></div><div>`), _tmpl$2$6 = template(`<div>`), _tmpl$3$1 = template(`<div><div><input type=text placeholder=Search></div><div>`), _tmpl$4 = template(`<div>No results found`);
    const workerUrl = new URL("data:video/mp2t;base64,bGV0IGRvY3VtZW50cyA9IFtdOwoKc2VsZi5vbm1lc3NhZ2UgPSAoZSkgPT4gewoJY29uc3QgeyB0eXBlLCBwYXlsb2FkIH0gPSBlLmRhdGE7Cglzd2l0Y2ggKHR5cGUpIHsKCQljYXNlICJJTkRFWCI6CgkJCWRvY3VtZW50cyA9IHBheWxvYWQ7CgkJCWJyZWFrOwoJCWNhc2UgIlNFQVJDSCI6IHsKCQkJY29uc3QgdGVybSA9IHBheWxvYWQudHJpbSgpLnRvTG93ZXJDYXNlKCk7CgkJCWNvbnN0IHJlc3VsdHMgPSBzZWFyY2hEb2N1bWVudHModGVybSk7CgkJCXJlc3VsdHMuc29ydCgoYSwgYikgPT4gYi5zY29yZSAtIGEuc2NvcmUpOwoJCQlzZWxmLnBvc3RNZXNzYWdlKHJlc3VsdHMpOwoJCQlicmVhazsKICAgICAgICB9Cgl9Cn07CgpmdW5jdGlvbiBzZWFyY2hEb2N1bWVudHModGVybSkgewoJY29uc3QgcmVzdWx0cyA9IFtdOwoKCWRvY3VtZW50cy5mb3JFYWNoKChkb2MpID0+IHsKCQljb25zdCBjb250ZW50ID0gZG9jLmNvbnRlbnQudG9Mb3dlckNhc2UoKTsKCQljb25zdCBwYXRoID0gZG9jLnBhdGg7CgkJY29uc3QgbWF0Y2hlcyA9IFtdOwoJCWxldCBpbmRleCA9IGNvbnRlbnQuaW5kZXhPZih0ZXJtKTsKCgkJd2hpbGUgKGluZGV4ICE9PSAtMSkgewoJCQljb25zdCBzdGFydCA9IE1hdGgubWF4KDAsIGluZGV4IC0gMzApOwoJCQljb25zdCBlbmQgPSBNYXRoLm1pbihjb250ZW50Lmxlbmd0aCwgaW5kZXggKyB0ZXJtLmxlbmd0aCArIDMwKTsKCQkJY29uc3QgY29udGV4dCA9IGRvYy5jb250ZW50LnN1YnN0cmluZyhzdGFydCwgZW5kKTsKCQkJbWF0Y2hlcy5wdXNoKHsgaW5kZXgsIGNvbnRleHQgfSk7CgkJCWluZGV4ID0gY29udGVudC5pbmRleE9mKHRlcm0sIGluZGV4ICsgMSk7CgkJfQoKCQlpZiAobWF0Y2hlcy5sZW5ndGggPiAwKSB7CgkJCXJlc3VsdHMucHVzaCh7CgkJCQlyZWY6IHBhdGgsCgkJCQlzY29yZTogbWF0Y2hlcy5sZW5ndGgsCgkJCQltYXRjaERhdGE6IHsgdGVybSwgbWF0Y2hlcyB9LAoJCQl9KTsKCQl9Cgl9KTsKCglyZXR1cm4gcmVzdWx0czsKfQo=", import.meta.url);
    const SearchResult = (props)=>{
        const [collapsed, setCollapsed] = createSignal(false);
        const handleResultClick = async (file, globalIndex)=>{
            TabStore.openTab({
                id: file,
                name: file.split("/").pop(),
                state: TabState.Untracked,
                editorId: EditorStore.getActiveEditorId()
            });
            const contents = await window.api.getFileContents(file);
            EditorStore.setEditorContent("editor1", contents);
            TabStore.updateTab(file, {
                content: contents
            });
            const { line, column } = await EditorStore.getActiveEditor().calculateLocalIndex(globalIndex);
            EditorStore.getActiveEditor()?.moveTo(column, line, 0);
        };
        return (()=>{
            var _el$ = _tmpl$$e(), _el$2 = _el$.firstChild, _el$3 = _el$2.firstChild, _el$4 = _el$3.firstChild, _el$5 = _el$4.nextSibling;
            _el$2.$$click = ()=>setCollapsed(!collapsed());
            _el$2.addEventListener("keypress", (e)=>{
                if (e.key === "Enter" || e.key === " ") {
                    setCollapsed(!collapsed());
                }
            });
            insert(_el$4, ()=>props.result.matchData.matches.length);
            insert(_el$3, (()=>{
                var _c$ = createMemo(()=>!!collapsed());
                return ()=>_c$() ? createComponent(VsChevronRight, {
                        "font-size": "14",
                        get ["class"] () {
                            return styles$c["result-ref-chevron"];
                        }
                    }) : createComponent(VsChevronDown, {
                        "font-size": "14",
                        get ["class"] () {
                            return styles$c["result-ref-chevron"];
                        }
                    });
            })(), _el$5);
            insert(_el$5, ()=>props.result.ref.split("/").pop());
            insert(_el$, (()=>{
                var _c$2 = createMemo(()=>!!!collapsed());
                return ()=>_c$2() ? (()=>{
                        var _el$6 = _tmpl$2$6();
                        insert(_el$6, createComponent(For, {
                            get each () {
                                return props.result.matchData.matches;
                            },
                            children: (match)=>createComponent(Tooltip, {
                                    get content () {
                                        return match.context;
                                    },
                                    position: "right",
                                    showDelay: 500,
                                    get children () {
                                        var _el$7 = _tmpl$2$6();
                                        _el$7.$$click = async ()=>{
                                            handleResultClick(props.result.ref, match.index);
                                        };
                                        _el$7.addEventListener("keypress", async (e)=>{
                                            if (e.key === "Enter" || e.key === " ") {
                                                handleResultClick(props.result.ref, match.index);
                                            }
                                        });
                                        insert(_el$7, ()=>match.context);
                                        createRenderEffect(()=>className(_el$7, styles$c["match-context"]));
                                        return _el$7;
                                    }
                                })
                        }));
                        createRenderEffect(()=>className(_el$6, styles$c["result-match-data"]));
                        return _el$6;
                    })() : null;
            })(), null);
            createRenderEffect((_p$)=>{
                var _v$ = styles$c["search-result"], _v$2 = styles$c["result-ref"], _v$3 = styles$c["result-ref-container"], _v$4 = styles$c["result-match-count"], _v$5 = styles$c["result-ref-name"];
                _v$ !== _p$.e && className(_el$, _p$.e = _v$);
                _v$2 !== _p$.t && className(_el$2, _p$.t = _v$2);
                _v$3 !== _p$.a && className(_el$3, _p$.a = _v$3);
                _v$4 !== _p$.o && className(_el$4, _p$.o = _v$4);
                _v$5 !== _p$.i && className(_el$5, _p$.i = _v$5);
                return _p$;
            }, {
                e: void 0,
                t: void 0,
                a: void 0,
                o: void 0,
                i: void 0
            });
            return _el$;
        })();
    };
    const Search = ()=>{
        const fileStore = useFileStore();
        const worker = new Worker(workerUrl, {
            type: "module"
        });
        const loadAndIndexDocuments = async ()=>{
            for (const folder of fileStore.folderContent.folders){
                if (folder === ".git" || folder === "node_modules" || folder === ".vscode" || folder === "out" || folder === "dist" || folder === "build") {
                    continue;
                }
                window.api.index(folder);
            }
        };
        const handleSearch = lodashExports.debounce(async (term)=>{
            if (term.trim().length === 0) {
                setSearchStore({
                    searchResults: [],
                    searchPerformed: false
                });
                return;
            }
            worker.postMessage({
                type: "SEARCH",
                payload: term.trim()
            });
        }, 300);
        createEffect(()=>{
            if (searchStore.searchTerm.trim().length > 0) {
                handleSearch(searchStore.searchTerm);
            }
        });
        createEffect(()=>{
            if (fileStore.folderContent.folders.length > 0) {
                loadAndIndexDocuments();
            }
        });
        createEffect(()=>{
            window.api.onIndexResult((_, documents)=>{
                worker.postMessage({
                    type: "INDEX",
                    payload: documents
                });
            });
        });
        worker.onmessage = (e)=>{
            setSearchStore({
                searchResults: e.data,
                searchPerformed: true
            });
        };
        onCleanup(()=>{
            worker.terminate();
        });
        return (()=>{
            var _el$8 = _tmpl$3$1(), _el$9 = _el$8.firstChild, _el$10 = _el$9.firstChild, _el$11 = _el$9.nextSibling;
            _el$10.$$input = (e)=>setSearchStore({
                    searchTerm: e.target.value
                });
            insert(_el$11, (()=>{
                var _c$3 = createMemo(()=>!!(searchStore.searchPerformed && searchStore.searchResults.length === 0));
                return ()=>_c$3() && (()=>{
                        var _el$12 = _tmpl$4();
                        createRenderEffect(()=>className(_el$12, styles$c["no-results"]));
                        return _el$12;
                    })();
            })(), null);
            insert(_el$11, createComponent(For, {
                get each () {
                    return searchStore.searchResults;
                },
                children: (result)=>createComponent(SearchResult, {
                        result
                    })
            }), null);
            createRenderEffect((_p$)=>{
                var _v$6 = styles$c["search-container"], _v$7 = styles$c["search-bar"], _v$8 = styles$c["search-input"], _v$9 = styles$c["search-results"];
                _v$6 !== _p$.e && className(_el$8, _p$.e = _v$6);
                _v$7 !== _p$.t && className(_el$9, _p$.t = _v$7);
                _v$8 !== _p$.a && className(_el$10, _p$.a = _v$8);
                _v$9 !== _p$.o && className(_el$11, _p$.o = _v$9);
                return _p$;
            }, {
                e: void 0,
                t: void 0,
                a: void 0,
                o: void 0
            });
            createRenderEffect(()=>_el$10.value = searchStore.searchTerm);
            return _el$8;
        })();
    };
    delegateEvents([
        "click",
        "input"
    ]);
    var _tmpl$$d = template(`<h2>Source Control`);
    const SourceControl = ()=>{
        return _tmpl$$d();
    };
    const filePane = {
        name: "Files",
        component: Explorer,
        childStyle: {
            minHeight: "50px",
            height: "42vh"
        },
        style: {
            width: "165px",
            "min-width": "165px",
            "margin-block": "2px",
            "border-radius": "4px",
            display: "flex",
            "flex-direction": "column",
            "background-color": "var(--meteor-pane-background)"
        },
        icon: VsFiles,
        column: 0,
        id: 0,
        collapsed: false,
        height: "900",
        contentOverflow: "hidden",
        previousHeight: "900"
    };
    const searchPane = {
        name: "Search",
        component: Search,
        childStyle: {
            minHeight: "50px",
            height: "42vh"
        },
        style: {
            width: "165px",
            "min-width": "165px",
            "margin-block": "2px",
            "border-radius": "4px",
            display: "flex",
            "flex-direction": "column",
            "background-color": "var(--meteor-pane-background)"
        },
        icon: VsSearch,
        column: 0,
        id: 1,
        collapsed: false,
        height: "900",
        previousHeight: "900"
    };
    const sourceControlPane = {
        name: "Source Control",
        component: SourceControl,
        childStyle: {
            minHeight: "50px",
            height: "42vh"
        },
        style: {
            width: "165px",
            "min-width": "165px",
            "margin-block": "2px",
            "border-radius": "4px",
            display: "flex",
            "flex-direction": "column",
            "background-color": "var(--meteor-pane-background)"
        },
        icon: VsSourceControl,
        column: 0,
        id: 2,
        collapsed: false,
        height: "900",
        previousHeight: "900"
    };
    const runAndDebugPane = {
        name: "Run and Debug",
        component: RunAndDebug,
        childStyle: {
            minHeight: "50px",
            height: "42vh"
        },
        style: {
            width: "165px",
            "min-width": "165px",
            "margin-block": "2px",
            "border-radius": "4px",
            display: "flex",
            "flex-direction": "column",
            "background-color": "var(--meteor-pane-background)"
        },
        icon: VsDebug,
        column: 0,
        id: 3,
        collapsed: false,
        height: "900",
        previousHeight: "900"
    };
    const extensionsPane = {
        name: "Extensions",
        component: Extensions,
        childStyle: {
            minHeight: "50px",
            height: "42vh"
        },
        style: {
            width: "165px",
            "min-width": "165px",
            "margin-block": "2px",
            "border-radius": "4px",
            display: "flex",
            "flex-direction": "column",
            "background-color": "var(--meteor-pane-background)"
        },
        icon: VsExtensions,
        column: 0,
        id: 4,
        collapsed: false,
        height: "900",
        previousHeight: "900"
    };
    const getNumberOfLinesOnScreen = (lineHeight)=>{
        return Math.floor(window.innerHeight / lineHeight);
    };
    const debounce = (func, wait)=>{
        let timeout;
        return function(...args) {
            clearTimeout(timeout);
            timeout = setTimeout(()=>func.apply(this, args), wait);
        };
    };
    const newFile = ()=>{
        TabStore.openTab({
            editorId: EditorStore.getActiveEditor()?.id,
            id: `Untitled-${TabStore.tabs.length + 1}`,
            name: `Untitled-${TabStore.tabs.length + 1}`,
            state: TabState.Untracked
        });
    };
    const saveCurrentFile = ()=>{
        const filepath = TabStore.activeTab?.id;
        const fileData = EditorStore.getActiveEditor()?.getText();
        if (filepath) {
            saveFile(filepath, fileData ? fileData : "");
        }
    };
    const saveFile = (filepath, fileData)=>{
        window.api.sendSaveFileRequest(filepath, fileData);
    };
    const saveFileAs = (filepath, fileData)=>{
        window.api.sendSaveFileAsRequest(filepath, fileData);
    };
    var Languages = ((Languages2)=>{
        Languages2["Ada"] = "Ada";
        Languages2["Agda"] = "Agda";
        Languages2["Apex"] = "Apex";
        Languages2["ApexCode"] = "ApexCode";
        Languages2["AWSEventRule"] = "AWSEventRule";
        Languages2["Bash"] = "Bash";
        Languages2["Beancount"] = "Beancount";
        Languages2["CapnProto"] = "CapnProto";
        Languages2["C"] = "C";
        Languages2["CPP"] = "C++";
        Languages2["CSharp"] = "CSharp";
        Languages2["CEL"] = "CEL";
        Languages2["Clojure"] = "Clojure";
        Languages2["CMake"] = "CMake";
        Languages2["COBOL"] = "COBOL";
        Languages2["CommonLisp"] = "CommonLisp";
        Languages2["CSS"] = "CSS";
        Languages2["CUDA"] = "CUDA";
        Languages2["Dart"] = "Dart";
        Languages2["D"] = "D";
        Languages2["Dockerfile"] = "Dockerfile";
        Languages2["DOT"] = "DOT";
        Languages2["Elixir"] = "Elixir";
        Languages2["Elm"] = "Elm";
        Languages2["EmacsLisp"] = "EmacsLisp";
        Languages2["Eno"] = "Eno";
        Languages2["ERBEJS"] = "ERBEJS";
        Languages2["Erlang"] = "Erlang";
        Languages2["Fennel"] = "Fennel";
        Languages2["Fish"] = "Fish";
        Languages2["Formula"] = "Formula";
        Languages2["Fortran"] = "Fortran";
        Languages2["gitattributes"] = "gitattributes";
        Languages2["gitignore"] = "gitignore";
        Languages2["Gleam"] = "Gleam";
        Languages2["GLSL"] = "GLSL";
        Languages2["Go"] = "Go";
        Languages2["GoMod"] = "GoMod";
        Languages2["GoWork"] = "GoWork";
        Languages2["GraphQL"] = "GraphQL";
        Languages2["Hack"] = "Hack";
        Languages2["Haskell"] = "Haskell";
        Languages2["HCL"] = "HCL";
        Languages2["HTML"] = "HTML";
        Languages2["ISPC"] = "ISPC";
        Languages2["Java"] = "Java";
        Languages2["JavaScript"] = "JavaScript";
        Languages2["jq"] = "jq";
        Languages2["JSON"] = "JSON";
        Languages2["JSON5"] = "JSON5";
        Languages2["Julia"] = "Julia";
        Languages2["Just"] = "Just";
        Languages2["Kotlin"] = "Kotlin";
        Languages2["LALRPOP"] = "LALRPOP";
        Languages2["LaTeX"] = "LaTeX";
        Languages2["Lean"] = "Lean";
        Languages2["LLVM"] = "LLVM";
        Languages2["LLVMMachineIR"] = "LLVMMachineIR";
        Languages2["LLVMMLIR"] = "LLVMMLIR";
        Languages2["LLVMTableGen"] = "LLVMTableGen";
        Languages2["Lua"] = "Lua";
        Languages2["Magik"] = "Magik";
        Languages2["Make"] = "Make";
        Languages2["Markdown"] = "Markdown";
        Languages2["Meson"] = "Meson";
        Languages2["Motorola68000Assembly"] = "Motorola68000Assembly";
        Languages2["NGINX"] = "NGINX";
        Languages2["Nim"] = "Nim";
        Languages2["Nix"] = "Nix";
        Languages2["Noir"] = "Noir";
        Languages2["ObjectiveC"] = "ObjectiveC";
        Languages2["OCaml"] = "OCaml";
        Languages2["Odin"] = "Odin";
        Languages2["Ohm"] = "Ohm";
        Languages2["Org"] = "Org";
        Languages2["P4"] = "P4";
        Languages2["Pascal"] = "Pascal";
        Languages2["Perl"] = "Perl";
        Languages2["PerlPOD"] = "PerlPOD";
        Languages2["PHP"] = "PHP";
        Languages2["Plaintext"] = "Plaintext";
        Languages2["PortableGameNotation"] = "PortableGameNotation";
        Languages2["PowerShell"] = "PowerShell";
        Languages2["ProtocolBuffers"] = "ProtocolBuffers";
        Languages2["Python"] = "Python";
        Languages2["QML"] = "QML";
        Languages2["QuakeC"] = "QuakeC";
        Languages2["Racket"] = "Racket";
        Languages2["Rasi"] = "Rasi";
        Languages2["re2c"] = "re2c";
        Languages2["Regex"] = "Regex";
        Languages2["Rego"] = "Rego";
        Languages2["reStructuredText"] = "reStructuredText";
        Languages2["R"] = "R";
        Languages2["Robot"] = "Robot";
        Languages2["Ruby"] = "Ruby";
        Languages2["Rust"] = "Rust";
        Languages2["Scala"] = "Scala";
        Languages2["Scheme"] = "Scheme";
        Languages2["SCSS"] = "SCSS";
        Languages2["SExpressions"] = "SExpressions";
        Languages2["Smali"] = "Smali";
        Languages2["SourcePawn"] = "SourcePawn";
        Languages2["SPARQL"] = "SPARQL";
        Languages2["SQLBigQuery"] = "SQLBigQuery";
        Languages2["SQLGeneral"] = "SQLGeneral";
        Languages2["SQLPostgreSQL"] = "SQLPostgreSQL";
        Languages2["SQLSQLite"] = "SQLSQLite";
        Languages2["SSH"] = "SSH";
        Languages2["Supercollider"] = "Supercollider";
        Languages2["Svelte"] = "Svelte";
        Languages2["Swift"] = "Swift";
        Languages2["Tact"] = "Tact";
        Languages2["Thrift"] = "Thrift";
        Languages2["TODOComments"] = "TODOComments";
        Languages2["TOML"] = "TOML";
        Languages2["TreeSitterQuery"] = "TreeSitterQuery";
        Languages2["Turtle"] = "Turtle";
        Languages2["TypeScript"] = "TypeScript";
        Languages2["TypeScriptTSX"] = "TypeScriptTSX";
        Languages2["Ungrammar"] = "Ungrammar";
        Languages2["USD"] = "USD";
        Languages2["Verilog"] = "Verilog";
        Languages2["VHDL"] = "VHDL";
        Languages2["Vue"] = "Vue";
        Languages2["Wasm"] = "Wasm";
        Languages2["WDL"] = "WDL";
        Languages2["WGSL"] = "WGSL";
        Languages2["YAML"] = "YAML";
        Languages2["YANG"] = "YANG";
        Languages2["Yuck"] = "Yuck";
        Languages2["Zig"] = "Zig";
        return Languages2;
    })(Languages || {});
    const [selectedLanguage, setSelectedLanguage] = createSignal("Plaintext");
    const [panes, setPanes] = createSignal([
        {
            name: "Files",
            component: Explorer,
            childStyle: {
                minHeight: "50px",
                height: "42vh",
                overflow: "hidden"
            },
            style: {
                width: "165px",
                "min-width": "165px",
                "margin-block": "2px",
                "border-radius": "4px",
                display: "flex",
                overflow: "hidden",
                "flex-direction": "column",
                "background-color": "var(--meteor-pane-background)"
            },
            icon: VsFiles,
            column: 0,
            id: 0,
            collapsed: false,
            height: "900",
            contentOverflow: "hidden",
            previousHeight: "900"
        },
        {
            name: "Search",
            component: Search,
            childStyle: {
                minHeight: "50px",
                height: "42vh"
            },
            style: {
                width: "165px",
                "min-width": "165px",
                "margin-block": "2px",
                "border-radius": "4px",
                display: "flex",
                "flex-direction": "column",
                "background-color": "var(--meteor-pane-background)"
            },
            icon: VsSearch,
            column: 0,
            id: 1,
            collapsed: false,
            height: "900",
            previousHeight: "900"
        }
    ]);
    const paneIsOpen = (openPane)=>panes().some((pane)=>pane.name === openPane.name);
    const addPane = (newPane)=>{
        if (!paneIsOpen(newPane)) {
            setPanes([
                ...panes(),
                newPane
            ]);
        }
    };
    const removePane = (paneName)=>setPanes(panes().filter((pane)=>pane.name !== paneName));
    const togglePane = (pane)=>{
        paneIsOpen(pane) ? removePane(pane.name) : addPane(pane);
    };
    const languageHelper = (language)=>{
        setSelectedLanguage(language);
        window.api.manualSetLanguageRequest(language);
    };
    const languageCommands = [
        {
            id: 1,
            label: "Bash",
            action: ()=>languageHelper(Languages.Bash)
        },
        {
            id: 2,
            label: "C",
            action: ()=>languageHelper(Languages.C)
        },
        {
            id: 3,
            label: "C++",
            action: ()=>languageHelper(Languages.CPP)
        },
        {
            id: 4,
            label: "C#",
            action: ()=>languageHelper(Languages.CSharp)
        },
        {
            id: 5,
            label: "Common Lisp",
            action: ()=>languageHelper(Languages.CommonLisp)
        },
        {
            id: 21,
            label: "CSS",
            action: ()=>languageHelper(Languages.CSS)
        },
        {
            id: 6,
            label: "CUDA",
            action: ()=>languageHelper(Languages.CUDA)
        },
        {
            id: 7,
            label: "GLSL",
            action: ()=>languageHelper(Languages.GLSL)
        },
        {
            id: 8,
            label: "Go",
            action: ()=>languageHelper(Languages.Go)
        },
        {
            id: 9,
            label: "Haskell",
            action: ()=>languageHelper(Languages.Haskell)
        },
        {
            id: 10,
            label: "HTML",
            action: ()=>languageHelper(Languages.HTML)
        },
        {
            id: 11,
            label: "Java",
            action: ()=>languageHelper(Languages.Java)
        },
        {
            id: 12,
            label: "JavaScript",
            action: ()=>languageHelper(Languages.JavaScript)
        },
        {
            id: 13,
            label: "JSON",
            action: ()=>languageHelper(Languages.JSON)
        },
        {
            id: 14,
            label: "OCaml",
            action: ()=>languageHelper(Languages.OCaml)
        },
        {
            id: 15,
            label: "Odin",
            action: ()=>languageHelper(Languages.Odin)
        },
        {
            id: 16,
            label: "PHP",
            action: ()=>languageHelper(Languages.PHP)
        },
        {
            id: 16,
            label: "Plaintext",
            action: ()=>languageHelper(Languages.Plaintext)
        },
        {
            id: 17,
            label: "Python",
            action: ()=>languageHelper(Languages.Python)
        },
        {
            id: 18,
            label: "Regex",
            action: ()=>languageHelper(Languages.Regex)
        },
        {
            id: 19,
            label: "Ruby",
            action: ()=>languageHelper(Languages.Ruby)
        },
        {
            id: 20,
            label: "Rust",
            action: ()=>languageHelper(Languages.Rust)
        },
        {
            id: 21,
            label: "SCSS",
            action: ()=>languageHelper(Languages.SCSS)
        },
        {
            id: 22,
            label: "TypeScript",
            action: ()=>languageHelper(Languages.TypeScript)
        },
        {
            id: 23,
            label: "TypeScript TSX",
            action: ()=>languageHelper(Languages.TypeScriptTSX)
        }
    ];
    const commands = [
        {
            id: 1,
            label: "File: Open File",
            action: ()=>window.api.sendOpenFileRequest()
        },
        {
            id: 2,
            label: "File: Save File",
            action: ()=>saveCurrentFile()
        },
        {
            id: 3,
            label: "File: New File",
            action: ()=>newFile()
        },
        {
            id: 4,
            label: "View: Show Files",
            action: ()=>togglePane(filePane),
            prefix: true
        },
        {
            id: 5,
            label: "View: Show Search",
            action: ()=>togglePane(searchPane),
            prefix: true
        },
        {
            id: 6,
            label: "View: Show Source Control",
            action: ()=>togglePane(sourceControlPane),
            prefix: true
        },
        {
            id: 7,
            label: "View: Show Run And Debug",
            action: ()=>togglePane(runAndDebugPane),
            prefix: true
        },
        {
            id: 8,
            label: "View: Show Extensions",
            action: ()=>togglePane(extensionsPane),
            prefix: true
        }
    ];
    const [initWithPrefix, setInitWithPrefix] = createSignal(false);
    const [isOpen, setIsOpen] = createSignal(false);
    const [contents, setContents] = createSignal(commands);
    const setContentToLanguages = ()=>{
        setInitWithPrefix(false);
        setContents(languageCommands);
    };
    const setContentToDefaultCommands = ()=>{
        setContents(commands);
    };
    const overlay = "_overlay_l2bdr_1";
    const commandPalette = "_commandPalette_l2bdr_12";
    const searchInput = "_searchInput_l2bdr_24";
    const commandList = "_commandList_l2bdr_37";
    const selectedCommand = "_selectedCommand_l2bdr_52";
    const styles$b = {
        overlay: overlay,
        commandPalette: commandPalette,
        searchInput: searchInput,
        commandList: commandList,
        selectedCommand: selectedCommand
    };
    var _tmpl$$c = template(`<div><div data-testid=command-palette><input autofocus type=text data-testid=command-palette-input placeholder="Type a command..."><ul>`), _tmpl$2$5 = template(`<li>`);
    const CommandPalette = (props)=>{
        const [query, setQuery] = createSignal("");
        const [selectedIndex, setSelectedIndex] = createSignal(0);
        let inputRef;
        const filteredCommands = ()=>{
            const queryText = query().toLowerCase();
            if (queryText.startsWith(">")) {
                const trimmedQuery = queryText.slice(1).trim();
                return contents().filter((command)=>command.prefix && command.label.toLowerCase().includes(trimmedQuery));
            }
            return contents().filter((command)=>command.label.toLowerCase().includes(queryText));
        };
        const handleKeyDown = (e)=>{
            if (!props.isOpen) return;
            if (e.key === "ArrowDown") {
                setSelectedIndex((prev)=>Math.min(prev + 1, filteredCommands().length - 1));
            } else if (e.key === "ArrowUp") {
                setSelectedIndex((prev)=>Math.max(prev - 1, 0));
            } else if (e.key === "Enter") {
                e.preventDefault();
                if (filteredCommands().length > 0) {
                    filteredCommands()[selectedIndex()].action();
                    props.onClose();
                }
            } else if (e.key === "Escape") {
                props.onClose();
            }
        };
        createEffect(()=>{
            if (initWithPrefix() && isOpen()) {
                setQuery(">");
            }
        });
        onCleanup(()=>{
            document.removeEventListener("keydown", handleKeyDown);
        });
        onMount(()=>{
            if (inputRef) {
                inputRef.focus();
            }
            document.addEventListener("keydown", handleKeyDown);
        });
        createEffect(()=>{
            if (props.isOpen && inputRef) {
                setTimeout(()=>inputRef.focus(), 0);
            } else {
                setQuery("");
                setSelectedIndex(0);
            }
        });
        return createComponent(Show, {
            get when () {
                return props.isOpen;
            },
            get children () {
                var _el$ = _tmpl$$c(), _el$2 = _el$.firstChild, _el$3 = _el$2.firstChild, _el$4 = _el$3.nextSibling;
                addEventListener(_el$, "click", props.onClose, true);
                _el$2.$$keydown = (e)=>e.stopPropagation();
                _el$2.$$click = (e)=>e.stopPropagation();
                _el$3.$$input = (e)=>setQuery(e.currentTarget.value);
                var _ref$ = inputRef;
                typeof _ref$ === "function" ? use(_ref$, _el$3) : inputRef = _el$3;
                insert(_el$4, createComponent(For, {
                    get each () {
                        return filteredCommands();
                    },
                    children: (command, index)=>(()=>{
                            var _el$5 = _tmpl$2$5();
                            _el$5.addEventListener("keypress", (e)=>{
                                if ((e.key === "Enter" || e.key === " ") && props.isOpen) {
                                    command.action();
                                    props.onClose();
                                }
                            });
                            _el$5.$$click = ()=>{
                                command.action();
                                props.onClose();
                            };
                            insert(_el$5, ()=>command.label);
                            createRenderEffect(()=>className(_el$5, index() === selectedIndex() ? styles$b.selectedCommand : ""));
                            return _el$5;
                        })()
                }));
                createRenderEffect((_p$)=>{
                    var _v$ = styles$b.overlay, _v$2 = styles$b.commandPalette, _v$3 = styles$b.searchInput, _v$4 = styles$b.commandList;
                    _v$ !== _p$.e && className(_el$, _p$.e = _v$);
                    _v$2 !== _p$.t && className(_el$2, _p$.t = _v$2);
                    _v$3 !== _p$.a && className(_el$3, _p$.a = _v$3);
                    _v$4 !== _p$.o && className(_el$4, _p$.o = _v$4);
                    return _p$;
                }, {
                    e: void 0,
                    t: void 0,
                    a: void 0,
                    o: void 0
                });
                createRenderEffect(()=>_el$3.value = query());
                return _el$;
            }
        });
    };
    delegateEvents([
        "click",
        "keydown",
        "input"
    ]);
    const lineHeight = 19;
    const cursorHorizontalOffset = 5;
    const cursorVerticalOffset = 2;
    const styles$a = {
        "editor-core": "_editor-core_1lpjj_6",
        "editor-core__textarea": "_editor-core__textarea_1lpjj_6"
    };
    var _tmpl$$b = template(`<div><textarea data-testid=editor-core__textarea>`);
    const EditorCore = (props)=>{
        const editor = props.editor();
        const onKeydown = async (e)=>{
            const scrollActions = [
                "Enter",
                "Backspace",
                "Delete",
                "Tab",
                "ArrowLeft",
                "ArrowRight",
                "ArrowUp",
                "ArrowDown",
                "Home",
                "End",
                "PageUp",
                "PageDown"
            ];
            const isShortcut = (key, ctrl = false, shift = false)=>e.key.toLowerCase() === key.toLowerCase() && e.ctrlKey === ctrl && e.shiftKey === shift;
            const handleArrowKey = (direction)=>{
                if (e.shiftKey) {
                    editor.getSelection(0)?.[`handleSelection${direction}`](editor.cursorAt(0), editor.lineContent(editor.cursorAt(0).line).length, editor.lineBreakIndices[Math.max(editor.cursorAt(0).line - 1, 0)], editor.totalLines());
                } else {
                    editor.clearSelection(0);
                }
                switch(direction){
                    case "Left":
                        editor.moveLeft(0);
                        break;
                    case "Right":
                        editor.moveRight(0);
                        break;
                    case "Up":
                        editor.moveUp(0);
                        break;
                    case "Down":
                        editor.moveDown(0);
                        break;
                }
            };
            switch(e.key){
                case "Enter":
                    editor.addLine(0);
                    break;
                case "Backspace":
                case "Delete":
                    editor.delete(0);
                    break;
                case "Tab":
                    if (e.shiftKey) {
                        e.preventDefault();
                        editor.shiftTab(0);
                    } else {
                        e.preventDefault();
                        editor.tab(0);
                    }
                    break;
                case "a":
                    if (isShortcut("a", true)) {
                        e.preventDefault();
                        editor.selectAll();
                    } else {
                        editor.insert("a", 0);
                    }
                    break;
                case "c":
                    if (isShortcut("c", true)) {
                        e.preventDefault();
                        const text = editor.copy();
                        window.api.copy(text);
                    } else {
                        editor.insert("c", 0);
                    }
                    break;
                case "v":
                case "V":
                    if (isShortcut("v", true)) {
                        e.preventDefault();
                        const text = await window.api.paste();
                        editor.paste(text);
                    } else {
                        editor.insert(e.key, 0);
                    }
                    break;
                case "x":
                case "X":
                    if (isShortcut("x", true)) {
                        e.preventDefault();
                        const text = editor.cut();
                        window.api.copy(text);
                    } else {
                        editor.insert(e.key, 0);
                    }
                    break;
                case "n":
                    if (isShortcut("n", true)) {
                        e.preventDefault();
                        TabStore.openTab({
                            editorId: EditorStore.getActiveEditor()?.id,
                            id: `Untitled-${TabStore.tabs.length + 1}`,
                            name: `Untitled-${TabStore.tabs.length + 1}`,
                            state: TabState.Untracked
                        });
                    } else {
                        editor.insert(e.key, 0);
                    }
                    break;
                case "w":
                    if (isShortcut("w", true)) {
                        e.preventDefault();
                        TabStore.closeTab(TabStore.activeTab?.id);
                    } else {
                        editor.insert(e.key, 0);
                    }
                    break;
                case "s":
                case "S":
                    if (isShortcut("s", true)) {
                        e.preventDefault();
                    } else {
                        editor.insert(e.key, 0);
                    }
                    break;
                case "ArrowLeft":
                    handleArrowKey("Left");
                    break;
                case "ArrowRight":
                    handleArrowKey("Right");
                    break;
                case "ArrowUp":
                    handleArrowKey("Up");
                    break;
                case "ArrowDown":
                    handleArrowKey("Down");
                    break;
                case "Home":
                    editor.moveToLineStart(0);
                    break;
                case "End":
                    editor.moveToLineEnd(0);
                    break;
                case "PageUp":
                    editor.moveTo(editor.cursorAt(0).character, editor.cursorAt(0).line - getNumberOfLinesOnScreen(lineHeight), 0);
                    break;
                case "PageDown":
                    editor.moveTo(editor.cursorAt(0).character, editor.cursorAt(0).line + getNumberOfLinesOnScreen(lineHeight), 0);
                    break;
                default:
                    if (e.key.length === 1) {
                        editor.insert(e.key, 0);
                    }
            }
            if (scrollActions.includes(e.key) || e.key.length === 1) {
                props.ensureCursorVisible();
            }
            window.api.parseRequest(editor.getText());
        };
        createEffect(()=>{
            window.api.onParseResult((_, serializedTree)=>{
                if (serializedTree.error) {
                    console.error("Error parsing text:", serializedTree.error);
                } else {
                    const rootNode = JSON.parse(serializedTree);
                    setParserTree(rootNode);
                }
            });
        });
        return (()=>{
            var _el$ = _tmpl$$b(), _el$2 = _el$.firstChild;
            _el$2.$$keydown = onKeydown;
            var _ref$ = props.ref;
            typeof _ref$ === "function" ? use(_ref$, _el$2) : props.ref = _el$2;
            createRenderEffect((_p$)=>{
                var _v$ = styles$a["editor-core"], _v$2 = styles$a["editor-core__textarea"];
                _v$ !== _p$.e && className(_el$, _p$.e = _v$);
                _v$2 !== _p$.t && className(_el$2, _p$.t = _v$2);
                return _p$;
            }, {
                e: void 0,
                t: void 0
            });
            return _el$;
        })();
    };
    delegateEvents([
        "keydown"
    ]);
    const textWidthCache = new Map();
    const textService = {
        measureTextWidth (content, font, fontSize) {
            if (textWidthCache.has(content)) {
                return textWidthCache.get(content);
            }
            const canvas = document.createElement("canvas");
            const context = canvas.getContext("2d");
            if (!context) return 0;
            context.font = `${fontSize}px ${font}`;
            const metrics = context.measureText(content);
            const width = metrics.width;
            textWidthCache.set(content, width);
            return width;
        },
        isFontMonospace (font, fontSize) {
            return this.measureTextWidth("a", font, fontSize) === this.measureTextWidth("b", font, fontSize);
        }
    };
    const cursor = "_cursor_10c6o_1";
    const styles$9 = {
        cursor: cursor
    };
    var _tmpl$$a = template(`<div>`);
    const Cursor$1 = (props)=>{
        const line = createMemo(()=>props.cursor().line);
        const character = createMemo(()=>props.cursor().character);
        const calculateHorizontalPosition = (_)=>{
            const lineIndex = Math.min(line(), props.editor().numberOfLines() - 1);
            return textService.measureTextWidth(props.editor().lineContent(lineIndex).substring(0, character()), "Hack", 14) + cursorHorizontalOffset;
        };
        const calculateVerticalPosition = (line2)=>{
            return Math.min(line2, props.editor().numberOfLines()) * lineHeight + cursorVerticalOffset;
        };
        const horizontalPosition = createMemo(()=>calculateHorizontalPosition(character()));
        const verticalPosition = createMemo(()=>calculateVerticalPosition(line()));
        return (()=>{
            var _el$ = _tmpl$$a();
            var _ref$ = props.ref;
            typeof _ref$ === "function" ? use(_ref$, _el$) : props.ref = _el$;
            createRenderEffect((_p$)=>{
                var _v$ = styles$9.cursor, _v$2 = `translateX(${horizontalPosition()}px) translateY(${verticalPosition()}px)`;
                _v$ !== _p$.e && className(_el$, _p$.e = _v$);
                _v$2 !== _p$.t && ((_p$.t = _v$2) != null ? _el$.style.setProperty("transform", _v$2) : _el$.style.removeProperty("transform"));
                return _p$;
            }, {
                e: void 0,
                t: void 0
            });
            return _el$;
        })();
    };
    const scriptRel = (function detectScriptRel() {
        const relList = typeof document !== 'undefined' && document.createElement('link').relList;
        return relList && relList.supports && relList.supports('modulepreload') ? 'modulepreload' : 'preload';
    })();
    const assetsURL = function(dep, importerUrl) {
        return new URL(dep, importerUrl).href;
    };
    const seen = {};
    const __vitePreload = function preload(baseModule, deps, importerUrl) {
        let promise = Promise.resolve();
        if (true && deps && deps.length > 0) {
            const links = document.getElementsByTagName('link');
            const cspNonceMeta = document.querySelector('meta[property=csp-nonce]');
            const cspNonce = cspNonceMeta?.nonce || cspNonceMeta?.getAttribute('nonce');
            promise = Promise.all(deps.map((dep)=>{
                dep = assetsURL(dep, importerUrl);
                if (dep in seen) return;
                seen[dep] = true;
                const isCss = dep.endsWith('.css');
                const cssSelector = isCss ? '[rel="stylesheet"]' : '';
                const isBaseRelative = !!importerUrl;
                if (isBaseRelative) {
                    for(let i = links.length - 1; i >= 0; i--){
                        const link = links[i];
                        if (link.href === dep && (!isCss || link.rel === 'stylesheet')) {
                            return;
                        }
                    }
                } else if (document.querySelector(`link[href="${dep}"]${cssSelector}`)) {
                    return;
                }
                const link = document.createElement('link');
                link.rel = isCss ? 'stylesheet' : scriptRel;
                if (!isCss) {
                    link.as = 'script';
                    link.crossOrigin = '';
                }
                link.href = dep;
                if (cspNonce) {
                    link.setAttribute('nonce', cspNonce);
                }
                document.head.appendChild(link);
                if (isCss) {
                    return new Promise((res, rej)=>{
                        link.addEventListener('load', res);
                        link.addEventListener('error', ()=>rej(new Error(`Unable to preload CSS for ${dep}`)));
                    });
                }
            }));
        }
        return promise.then(()=>baseModule()).catch((err)=>{
            const e = new Event('vite:preloadError', {
                cancelable: true
            });
            e.payload = err;
            window.dispatchEvent(e);
            if (!e.defaultPrevented) {
                throw err;
            }
        });
    };
    const bundledLanguagesInfo = [
        {
            "id": "abap",
            "name": "ABAP",
            "import": ()=>__vitePreload(()=>import('./abap-PfGvLjtO.js'), true ? [] : void 0, import.meta.url)
        },
        {
            "id": "actionscript-3",
            "name": "ActionScript",
            "import": ()=>__vitePreload(()=>import('./actionscript-3-_I2qoJDu.js'), true ? [] : void 0, import.meta.url)
        },
        {
            "id": "ada",
            "name": "Ada",
            "import": ()=>__vitePreload(()=>import('./ada-CjZNw5Pr.js'), true ? [] : void 0, import.meta.url)
        },
        {
            "id": "angular-html",
            "name": "Angular HTML",
            "import": ()=>__vitePreload(()=>import('./angular-html-CCA6uK5u.js').then((n)=>n.e), true ? __vite__mapDeps([0,1,2,3]) : void 0, import.meta.url)
        },
        {
            "id": "angular-ts",
            "name": "Angular TypeScript",
            "import": ()=>__vitePreload(()=>import('./angular-ts-BdzUJqpd.js'), true ? __vite__mapDeps([4,0,1,2,3,5]) : void 0, import.meta.url)
        },
        {
            "id": "apache",
            "name": "Apache Conf",
            "import": ()=>__vitePreload(()=>import('./apache-US6q4No-.js'), true ? [] : void 0, import.meta.url)
        },
        {
            "id": "apex",
            "name": "Apex",
            "import": ()=>__vitePreload(()=>import('./apex-C1njo6Pa.js'), true ? [] : void 0, import.meta.url)
        },
        {
            "id": "apl",
            "name": "APL",
            "import": ()=>__vitePreload(()=>import('./apl-C9W6vCle.js'), true ? __vite__mapDeps([6,1,2,3,7,8,9]) : void 0, import.meta.url)
        },
        {
            "id": "applescript",
            "name": "AppleScript",
            "import": ()=>__vitePreload(()=>import('./applescript-CnaU4fBc.js'), true ? [] : void 0, import.meta.url)
        },
        {
            "id": "ara",
            "name": "Ara",
            "import": ()=>__vitePreload(()=>import('./ara-DJeuA4UL.js'), true ? [] : void 0, import.meta.url)
        },
        {
            "id": "asciidoc",
            "name": "AsciiDoc",
            "aliases": [
                "adoc"
            ],
            "import": ()=>__vitePreload(()=>import('./asciidoc-sdyL2GNQ.js'), true ? __vite__mapDeps([10,1,2,3,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,8,9,28,29,30,31,32,33,34,35,36,37,7,38,39,40,41,42,43,5,44,45,46]) : void 0, import.meta.url)
        },
        {
            "id": "asm",
            "name": "Assembly",
            "import": ()=>__vitePreload(()=>import('./asm-Ckd3WCx6.js'), true ? [] : void 0, import.meta.url)
        },
        {
            "id": "astro",
            "name": "Astro",
            "import": ()=>__vitePreload(()=>import('./astro-DRosG70n.js'), true ? __vite__mapDeps([47,9,2,46,48,42,3,5,33,49,50]) : void 0, import.meta.url)
        },
        {
            "id": "awk",
            "name": "AWK",
            "import": ()=>__vitePreload(()=>import('./awk-Bp3NCCJk.js'), true ? [] : void 0, import.meta.url)
        },
        {
            "id": "ballerina",
            "name": "Ballerina",
            "import": ()=>__vitePreload(()=>import('./ballerina-HV56tcmn.js'), true ? [] : void 0, import.meta.url)
        },
        {
            "id": "bat",
            "name": "Batch File",
            "aliases": [
                "batch"
            ],
            "import": ()=>__vitePreload(()=>import('./bat-DH3piprL.js'), true ? [] : void 0, import.meta.url)
        },
        {
            "id": "beancount",
            "name": "Beancount",
            "import": ()=>__vitePreload(()=>import('./beancount-QTJZpiNr.js'), true ? [] : void 0, import.meta.url)
        },
        {
            "id": "berry",
            "name": "Berry",
            "aliases": [
                "be"
            ],
            "import": ()=>__vitePreload(()=>import('./berry-fg7zcndx.js'), true ? [] : void 0, import.meta.url)
        },
        {
            "id": "bibtex",
            "name": "BibTeX",
            "import": ()=>__vitePreload(()=>import('./bibtex-_nVQ7ksi.js'), true ? [] : void 0, import.meta.url)
        },
        {
            "id": "bicep",
            "name": "Bicep",
            "import": ()=>__vitePreload(()=>import('./bicep-5SOfe24I.js'), true ? [] : void 0, import.meta.url)
        },
        {
            "id": "blade",
            "name": "Blade",
            "import": ()=>__vitePreload(()=>import('./blade-DqwRBQPS.js'), true ? __vite__mapDeps([51,1,2,3,7,8,18,9]) : void 0, import.meta.url)
        },
        {
            "id": "c",
            "name": "C",
            "import": ()=>__vitePreload(()=>import('./c-RparLEUA.js'), true ? [] : void 0, import.meta.url)
        },
        {
            "id": "cadence",
            "name": "Cadence",
            "aliases": [
                "cdc"
            ],
            "import": ()=>__vitePreload(()=>import('./cadence-y7JF8AVn.js'), true ? [] : void 0, import.meta.url)
        },
        {
            "id": "clarity",
            "name": "Clarity",
            "import": ()=>__vitePreload(()=>import('./clarity-Cnus002V.js'), true ? [] : void 0, import.meta.url)
        },
        {
            "id": "clojure",
            "name": "Clojure",
            "aliases": [
                "clj"
            ],
            "import": ()=>__vitePreload(()=>import('./clojure-DUldyaQj.js'), true ? [] : void 0, import.meta.url)
        },
        {
            "id": "cmake",
            "name": "CMake",
            "import": ()=>__vitePreload(()=>import('./cmake-a-8EfZAH.js'), true ? [] : void 0, import.meta.url)
        },
        {
            "id": "cobol",
            "name": "COBOL",
            "import": ()=>__vitePreload(()=>import('./cobol-CbLmteZD.js'), true ? __vite__mapDeps([52,18,1,2,3,8]) : void 0, import.meta.url)
        },
        {
            "id": "codeowners",
            "name": "CODEOWNERS",
            "import": ()=>__vitePreload(()=>import('./codeowners-Cn8XxHOJ.js'), true ? [] : void 0, import.meta.url)
        },
        {
            "id": "codeql",
            "name": "CodeQL",
            "aliases": [
                "ql"
            ],
            "import": ()=>__vitePreload(()=>import('./codeql-DSqC2RW9.js'), true ? [] : void 0, import.meta.url)
        },
        {
            "id": "coffee",
            "name": "CoffeeScript",
            "aliases": [
                "coffeescript"
            ],
            "import": ()=>__vitePreload(()=>import('./coffee-CI2tvHVN.js'), true ? __vite__mapDeps([15,2]) : void 0, import.meta.url)
        },
        {
            "id": "common-lisp",
            "name": "Common Lisp",
            "aliases": [
                "lisp"
            ],
            "import": ()=>__vitePreload(()=>import('./common-lisp-C5mZjXQi.js'), true ? [] : void 0, import.meta.url)
        },
        {
            "id": "cpp",
            "name": "C++",
            "aliases": [
                "c++"
            ],
            "import": ()=>__vitePreload(()=>import('./cpp-DFohBy7Y.js'), true ? __vite__mapDeps([16,17,13,18]) : void 0, import.meta.url)
        },
        {
            "id": "crystal",
            "name": "Crystal",
            "import": ()=>__vitePreload(()=>import('./crystal-CRzE51zz.js'), true ? __vite__mapDeps([53,1,2,3,18,13,39]) : void 0, import.meta.url)
        },
        {
            "id": "csharp",
            "name": "C#",
            "aliases": [
                "c#",
                "cs"
            ],
            "import": ()=>__vitePreload(()=>import('./csharp-DhI_1ny9.js'), true ? [] : void 0, import.meta.url)
        },
        {
            "id": "css",
            "name": "CSS",
            "import": ()=>__vitePreload(()=>import('./css-DoNn9y_q.js'), true ? [] : void 0, import.meta.url)
        },
        {
            "id": "csv",
            "name": "CSV",
            "import": ()=>__vitePreload(()=>import('./csv-SV4Sx2_F.js'), true ? [] : void 0, import.meta.url)
        },
        {
            "id": "cue",
            "name": "CUE",
            "import": ()=>__vitePreload(()=>import('./cue-CLkJwmoA.js'), true ? [] : void 0, import.meta.url)
        },
        {
            "id": "cypher",
            "name": "Cypher",
            "aliases": [
                "cql"
            ],
            "import": ()=>__vitePreload(()=>import('./cypher-MPgrTNlt.js'), true ? [] : void 0, import.meta.url)
        },
        {
            "id": "d",
            "name": "D",
            "import": ()=>__vitePreload(()=>import('./d-CQFbVqSj.js'), true ? [] : void 0, import.meta.url)
        },
        {
            "id": "dart",
            "name": "Dart",
            "import": ()=>__vitePreload(()=>import('./dart-DFZ6KCMX.js'), true ? [] : void 0, import.meta.url)
        },
        {
            "id": "dax",
            "name": "DAX",
            "import": ()=>__vitePreload(()=>import('./dax-DT96b3ev.js'), true ? [] : void 0, import.meta.url)
        },
        {
            "id": "desktop",
            "name": "Desktop",
            "import": ()=>__vitePreload(()=>import('./desktop-CgQIgD52.js'), true ? [] : void 0, import.meta.url)
        },
        {
            "id": "diff",
            "name": "Diff",
            "import": ()=>__vitePreload(()=>import('./diff-VMUPACBq.js'), true ? [] : void 0, import.meta.url)
        },
        {
            "id": "docker",
            "name": "Dockerfile",
            "aliases": [
                "dockerfile"
            ],
            "import": ()=>__vitePreload(()=>import('./docker-t1MdAjrc.js'), true ? [] : void 0, import.meta.url)
        },
        {
            "id": "dream-maker",
            "name": "Dream Maker",
            "import": ()=>__vitePreload(()=>import('./dream-maker-CTzOhkuS.js'), true ? [] : void 0, import.meta.url)
        },
        {
            "id": "elixir",
            "name": "Elixir",
            "import": ()=>__vitePreload(()=>import('./elixir-DuNB1BBS.js'), true ? __vite__mapDeps([22,1,2,3]) : void 0, import.meta.url)
        },
        {
            "id": "elm",
            "name": "Elm",
            "import": ()=>__vitePreload(()=>import('./elm-CrGdvw7C.js'), true ? __vite__mapDeps([23,17,13]) : void 0, import.meta.url)
        },
        {
            "id": "emacs-lisp",
            "name": "Emacs Lisp",
            "aliases": [
                "elisp"
            ],
            "import": ()=>__vitePreload(()=>import('./emacs-lisp-B9JeC_yr.js'), true ? [] : void 0, import.meta.url)
        },
        {
            "id": "erb",
            "name": "ERB",
            "import": ()=>__vitePreload(()=>import('./erb-5Cd5eIHq.js'), true ? __vite__mapDeps([54,1,2,3,38,7,8,18,13,39,40]) : void 0, import.meta.url)
        },
        {
            "id": "erlang",
            "name": "Erlang",
            "aliases": [
                "erl"
            ],
            "import": ()=>__vitePreload(()=>import('./erlang-C0ORVSrU.js'), true ? [] : void 0, import.meta.url)
        },
        {
            "id": "fennel",
            "name": "Fennel",
            "import": ()=>__vitePreload(()=>import('./fennel-BDlLDsUs.js'), true ? [] : void 0, import.meta.url)
        },
        {
            "id": "fish",
            "name": "Fish",
            "import": ()=>__vitePreload(()=>import('./fish-Mo8MO8cG.js'), true ? [] : void 0, import.meta.url)
        },
        {
            "id": "fluent",
            "name": "Fluent",
            "aliases": [
                "ftl"
            ],
            "import": ()=>__vitePreload(()=>import('./fluent-OTCBTsog.js'), true ? [] : void 0, import.meta.url)
        },
        {
            "id": "fortran-fixed-form",
            "name": "Fortran (Fixed Form)",
            "aliases": [
                "f",
                "for",
                "f77"
            ],
            "import": ()=>__vitePreload(()=>import('./fortran-fixed-form-DxtoEefG.js'), true ? __vite__mapDeps([55,56]) : void 0, import.meta.url)
        },
        {
            "id": "fortran-free-form",
            "name": "Fortran (Free Form)",
            "aliases": [
                "f90",
                "f95",
                "f03",
                "f08",
                "f18"
            ],
            "import": ()=>__vitePreload(()=>import('./fortran-free-form-BoQi57qK.js'), true ? [] : void 0, import.meta.url)
        },
        {
            "id": "fsharp",
            "name": "F#",
            "aliases": [
                "f#",
                "fs"
            ],
            "import": ()=>__vitePreload(()=>import('./fsharp-BO-83zgp.js'), true ? __vite__mapDeps([57,58]) : void 0, import.meta.url)
        },
        {
            "id": "gdresource",
            "name": "GDResource",
            "import": ()=>__vitePreload(()=>import('./gdresource-B-Voa0yv.js'), true ? __vite__mapDeps([59,60,61]) : void 0, import.meta.url)
        },
        {
            "id": "gdscript",
            "name": "GDScript",
            "import": ()=>__vitePreload(()=>import('./gdscript-CccYvLzp.js'), true ? [] : void 0, import.meta.url)
        },
        {
            "id": "gdshader",
            "name": "GDShader",
            "import": ()=>__vitePreload(()=>import('./gdshader-BO43XYMV.js'), true ? [] : void 0, import.meta.url)
        },
        {
            "id": "genie",
            "name": "Genie",
            "import": ()=>__vitePreload(()=>import('./genie-COTUmeg_.js'), true ? [] : void 0, import.meta.url)
        },
        {
            "id": "gherkin",
            "name": "Gherkin",
            "import": ()=>__vitePreload(()=>import('./gherkin-YXIT6vWv.js'), true ? [] : void 0, import.meta.url)
        },
        {
            "id": "git-commit",
            "name": "Git Commit Message",
            "import": ()=>__vitePreload(()=>import('./git-commit-B_f177bH.js'), true ? __vite__mapDeps([62,20]) : void 0, import.meta.url)
        },
        {
            "id": "git-rebase",
            "name": "Git Rebase Message",
            "import": ()=>__vitePreload(()=>import('./git-rebase-Ct8XKp4j.js'), true ? __vite__mapDeps([63,39]) : void 0, import.meta.url)
        },
        {
            "id": "gleam",
            "name": "Gleam",
            "import": ()=>__vitePreload(()=>import('./gleam-BVXzhuzL.js'), true ? [] : void 0, import.meta.url)
        },
        {
            "id": "glimmer-js",
            "name": "Glimmer JS",
            "aliases": [
                "gjs"
            ],
            "import": ()=>__vitePreload(()=>import('./glimmer-js-MozmigTL.js'), true ? __vite__mapDeps([64,2,46,3,1]) : void 0, import.meta.url)
        },
        {
            "id": "glimmer-ts",
            "name": "Glimmer TS",
            "aliases": [
                "gts"
            ],
            "import": ()=>__vitePreload(()=>import('./glimmer-ts-BcEBv08f.js'), true ? __vite__mapDeps([65,46,3,2,1]) : void 0, import.meta.url)
        },
        {
            "id": "glsl",
            "name": "GLSL",
            "import": ()=>__vitePreload(()=>import('./glsl-vKfMnumi.js'), true ? __vite__mapDeps([17,13]) : void 0, import.meta.url)
        },
        {
            "id": "gnuplot",
            "name": "Gnuplot",
            "import": ()=>__vitePreload(()=>import('./gnuplot-TLobhHSn.js'), true ? [] : void 0, import.meta.url)
        },
        {
            "id": "go",
            "name": "Go",
            "import": ()=>__vitePreload(()=>import('./go-B3ORrHWL.js'), true ? [] : void 0, import.meta.url)
        },
        {
            "id": "graphql",
            "name": "GraphQL",
            "aliases": [
                "gql"
            ],
            "import": ()=>__vitePreload(()=>import('./graphql-YkF5oJML.js'), true ? __vite__mapDeps([66,2,46,28,50]) : void 0, import.meta.url)
        },
        {
            "id": "groovy",
            "name": "Groovy",
            "import": ()=>__vitePreload(()=>import('./groovy-xt9ETOUK.js'), true ? [] : void 0, import.meta.url)
        },
        {
            "id": "hack",
            "name": "Hack",
            "import": ()=>__vitePreload(()=>import('./hack-CgVeLdAF.js'), true ? __vite__mapDeps([67,1,2,3,18]) : void 0, import.meta.url)
        },
        {
            "id": "haml",
            "name": "Ruby Haml",
            "import": ()=>__vitePreload(()=>import('./haml-TrAu53lP.js'), true ? __vite__mapDeps([68,38,1,2,3,7,8,18,13,39,40,42,15,58]) : void 0, import.meta.url)
        },
        {
            "id": "handlebars",
            "name": "Handlebars",
            "aliases": [
                "hbs"
            ],
            "import": ()=>__vitePreload(()=>import('./handlebars-npo4hGWj.js'), true ? __vite__mapDeps([69,1,2,3,11]) : void 0, import.meta.url)
        },
        {
            "id": "haskell",
            "name": "Haskell",
            "aliases": [
                "hs"
            ],
            "import": ()=>__vitePreload(()=>import('./haskell-UXfZSk_5.js'), true ? [] : void 0, import.meta.url)
        },
        {
            "id": "haxe",
            "name": "Haxe",
            "import": ()=>__vitePreload(()=>import('./haxe-uPj594z5.js'), true ? [] : void 0, import.meta.url)
        },
        {
            "id": "hcl",
            "name": "HashiCorp HCL",
            "import": ()=>__vitePreload(()=>import('./hcl-i6gSlZqY.js'), true ? [] : void 0, import.meta.url)
        },
        {
            "id": "hjson",
            "name": "Hjson",
            "import": ()=>__vitePreload(()=>import('./hjson-Da_qJv9S.js'), true ? [] : void 0, import.meta.url)
        },
        {
            "id": "hlsl",
            "name": "HLSL",
            "import": ()=>__vitePreload(()=>import('./hlsl-DxdRzscs.js'), true ? [] : void 0, import.meta.url)
        },
        {
            "id": "html",
            "name": "HTML",
            "import": ()=>__vitePreload(()=>import('./html-Eq4sA2a8.js'), true ? __vite__mapDeps([1,2,3]) : void 0, import.meta.url)
        },
        {
            "id": "html-derivative",
            "name": "HTML (Derivative)",
            "import": ()=>__vitePreload(()=>import('./html-derivative-B_UhcMkx.js'), true ? __vite__mapDeps([70,1,2,3]) : void 0, import.meta.url)
        },
        {
            "id": "http",
            "name": "HTTP",
            "import": ()=>__vitePreload(()=>import('./http-Co-gn1i4.js'), true ? __vite__mapDeps([71,39,9,7,8,66,2,46,28,50]) : void 0, import.meta.url)
        },
        {
            "id": "hxml",
            "name": "HXML",
            "import": ()=>__vitePreload(()=>import('./hxml-Zl3a4P_8.js'), true ? __vite__mapDeps([72,73]) : void 0, import.meta.url)
        },
        {
            "id": "hy",
            "name": "Hy",
            "import": ()=>__vitePreload(()=>import('./hy-BnFtj81t.js'), true ? [] : void 0, import.meta.url)
        },
        {
            "id": "imba",
            "name": "Imba",
            "import": ()=>__vitePreload(()=>import('./imba-DBVe8Aym.js'), true ? __vite__mapDeps([74,46]) : void 0, import.meta.url)
        },
        {
            "id": "ini",
            "name": "INI",
            "aliases": [
                "properties"
            ],
            "import": ()=>__vitePreload(()=>import('./ini-UFCqVqOy.js'), true ? [] : void 0, import.meta.url)
        },
        {
            "id": "java",
            "name": "Java",
            "import": ()=>__vitePreload(()=>import('./java-D1WhEMP8.js'), true ? [] : void 0, import.meta.url)
        },
        {
            "id": "javascript",
            "name": "JavaScript",
            "aliases": [
                "js"
            ],
            "import": ()=>__vitePreload(()=>import('./javascript-C67l1L3o.js'), true ? [] : void 0, import.meta.url)
        },
        {
            "id": "jinja",
            "name": "Jinja",
            "import": ()=>__vitePreload(()=>import('./jinja-DVZkfrpO.js'), true ? __vite__mapDeps([75,1,2,3]) : void 0, import.meta.url)
        },
        {
            "id": "jison",
            "name": "Jison",
            "import": ()=>__vitePreload(()=>import('./jison-6pxZ7IDQ.js'), true ? __vite__mapDeps([76,2]) : void 0, import.meta.url)
        },
        {
            "id": "json",
            "name": "JSON",
            "import": ()=>__vitePreload(()=>import('./json-B3_XiHYH.js'), true ? [] : void 0, import.meta.url)
        },
        {
            "id": "json5",
            "name": "JSON5",
            "import": ()=>__vitePreload(()=>import('./json5-D9-7wPSE.js'), true ? [] : void 0, import.meta.url)
        },
        {
            "id": "jsonc",
            "name": "JSON with Comments",
            "import": ()=>__vitePreload(()=>import('./jsonc-hcRuV5XG.js'), true ? [] : void 0, import.meta.url)
        },
        {
            "id": "jsonl",
            "name": "JSON Lines",
            "import": ()=>__vitePreload(()=>import('./jsonl-rweqJBk5.js'), true ? [] : void 0, import.meta.url)
        },
        {
            "id": "jsonnet",
            "name": "Jsonnet",
            "import": ()=>__vitePreload(()=>import('./jsonnet-gOCFe-ye.js'), true ? [] : void 0, import.meta.url)
        },
        {
            "id": "jssm",
            "name": "JSSM",
            "aliases": [
                "fsl"
            ],
            "import": ()=>__vitePreload(()=>import('./jssm-D7LXcue7.js'), true ? [] : void 0, import.meta.url)
        },
        {
            "id": "jsx",
            "name": "JSX",
            "import": ()=>__vitePreload(()=>import('./jsx-Dhek_lNz.js'), true ? [] : void 0, import.meta.url)
        },
        {
            "id": "julia",
            "name": "Julia",
            "aliases": [
                "jl"
            ],
            "import": ()=>__vitePreload(()=>import('./julia-HEFZpZq1.js'), true ? __vite__mapDeps([29,16,17,13,18,30,2,31]) : void 0, import.meta.url)
        },
        {
            "id": "kotlin",
            "name": "Kotlin",
            "aliases": [
                "kt",
                "kts"
            ],
            "import": ()=>__vitePreload(()=>import('./kotlin-CWqfBwk5.js'), true ? [] : void 0, import.meta.url)
        },
        {
            "id": "kusto",
            "name": "Kusto",
            "aliases": [
                "kql"
            ],
            "import": ()=>__vitePreload(()=>import('./kusto-D_0DPS92.js'), true ? [] : void 0, import.meta.url)
        },
        {
            "id": "latex",
            "name": "LaTeX",
            "import": ()=>__vitePreload(()=>import('./latex-BA3YTv27.js'), true ? __vite__mapDeps([77,78,31,39,3,79,27,1,2,8,29,16,17,13,18,30,40,38,7,41,46,11,43]) : void 0, import.meta.url)
        },
        {
            "id": "less",
            "name": "Less",
            "import": ()=>__vitePreload(()=>import('./less-DL22pY4I.js'), true ? [] : void 0, import.meta.url)
        },
        {
            "id": "liquid",
            "name": "Liquid",
            "import": ()=>__vitePreload(()=>import('./liquid-Bqd5xN-j.js'), true ? __vite__mapDeps([80,1,2,3,9]) : void 0, import.meta.url)
        },
        {
            "id": "log",
            "name": "Log file",
            "import": ()=>__vitePreload(()=>import('./log-DErWLWEo.js'), true ? [] : void 0, import.meta.url)
        },
        {
            "id": "logo",
            "name": "Logo",
            "import": ()=>__vitePreload(()=>import('./logo-Ck7ZNctf.js'), true ? [] : void 0, import.meta.url)
        },
        {
            "id": "lua",
            "name": "Lua",
            "import": ()=>__vitePreload(()=>import('./lua-pd6nIbVt.js'), true ? __vite__mapDeps([40,13]) : void 0, import.meta.url)
        },
        {
            "id": "make",
            "name": "Makefile",
            "aliases": [
                "makefile"
            ],
            "import": ()=>__vitePreload(()=>import('./make-CH8ivb4o.js'), true ? [] : void 0, import.meta.url)
        },
        {
            "id": "markdown",
            "name": "Markdown",
            "aliases": [
                "md"
            ],
            "import": ()=>__vitePreload(()=>import('./markdown-CsacJmnW.js'), true ? [] : void 0, import.meta.url)
        },
        {
            "id": "marko",
            "name": "Marko",
            "import": ()=>__vitePreload(()=>import('./marko-C2AP0NfW.js'), true ? __vite__mapDeps([81,3,33,5,2]) : void 0, import.meta.url)
        },
        {
            "id": "matlab",
            "name": "MATLAB",
            "import": ()=>__vitePreload(()=>import('./matlab-DQ1RowLR.js'), true ? [] : void 0, import.meta.url)
        },
        {
            "id": "mdc",
            "name": "MDC",
            "import": ()=>__vitePreload(()=>import('./mdc-BGgFH6aU.js'), true ? __vite__mapDeps([82,58,11,70,1,2,3]) : void 0, import.meta.url)
        },
        {
            "id": "mdx",
            "name": "MDX",
            "import": ()=>__vitePreload(()=>import('./mdx-Di-XYxHU.js'), true ? [] : void 0, import.meta.url)
        },
        {
            "id": "mermaid",
            "name": "Mermaid",
            "import": ()=>__vitePreload(()=>import('./mermaid-BASv6wFz.js'), true ? [] : void 0, import.meta.url)
        },
        {
            "id": "mojo",
            "name": "Mojo",
            "import": ()=>__vitePreload(()=>import('./mojo-D33nq73j.js'), true ? [] : void 0, import.meta.url)
        },
        {
            "id": "move",
            "name": "Move",
            "import": ()=>__vitePreload(()=>import('./move-Cs0jCj0B.js'), true ? [] : void 0, import.meta.url)
        },
        {
            "id": "narrat",
            "name": "Narrat Language",
            "aliases": [
                "nar"
            ],
            "import": ()=>__vitePreload(()=>import('./narrat-BCS3F2yp.js'), true ? [] : void 0, import.meta.url)
        },
        {
            "id": "nextflow",
            "name": "Nextflow",
            "aliases": [
                "nf"
            ],
            "import": ()=>__vitePreload(()=>import('./nextflow-CR3STrlG.js'), true ? [] : void 0, import.meta.url)
        },
        {
            "id": "nginx",
            "name": "Nginx",
            "import": ()=>__vitePreload(()=>import('./nginx-BoKi2qIY.js'), true ? __vite__mapDeps([83,40,13]) : void 0, import.meta.url)
        },
        {
            "id": "nim",
            "name": "Nim",
            "import": ()=>__vitePreload(()=>import('./nim-CaD7WNYr.js'), true ? __vite__mapDeps([84,13,1,2,3,7,8,17,58]) : void 0, import.meta.url)
        },
        {
            "id": "nix",
            "name": "Nix",
            "import": ()=>__vitePreload(()=>import('./nix-B256vN7E.js'), true ? [] : void 0, import.meta.url)
        },
        {
            "id": "nushell",
            "name": "nushell",
            "aliases": [
                "nu"
            ],
            "import": ()=>__vitePreload(()=>import('./nushell-BBODmBJi.js'), true ? [] : void 0, import.meta.url)
        },
        {
            "id": "objective-c",
            "name": "Objective-C",
            "aliases": [
                "objc"
            ],
            "import": ()=>__vitePreload(()=>import('./objective-c-DOS22jA9.js'), true ? [] : void 0, import.meta.url)
        },
        {
            "id": "objective-cpp",
            "name": "Objective-C++",
            "import": ()=>__vitePreload(()=>import('./objective-cpp-TRdlEk2g.js'), true ? [] : void 0, import.meta.url)
        },
        {
            "id": "ocaml",
            "name": "OCaml",
            "import": ()=>__vitePreload(()=>import('./ocaml-qBzckQCJ.js'), true ? [] : void 0, import.meta.url)
        },
        {
            "id": "pascal",
            "name": "Pascal",
            "import": ()=>__vitePreload(()=>import('./pascal-Bqh6Osug.js'), true ? [] : void 0, import.meta.url)
        },
        {
            "id": "perl",
            "name": "Perl",
            "import": ()=>__vitePreload(()=>import('./perl-CzuAIuGO.js'), true ? __vite__mapDeps([37,1,2,3,7,8,18]) : void 0, import.meta.url)
        },
        {
            "id": "php",
            "name": "PHP",
            "import": ()=>__vitePreload(()=>import('./php-BhYZK4_-.js'), true ? __vite__mapDeps([85,1,2,3,7,8,18,9]) : void 0, import.meta.url)
        },
        {
            "id": "plsql",
            "name": "PL/SQL",
            "import": ()=>__vitePreload(()=>import('./plsql-C0fyqsO0.js'), true ? [] : void 0, import.meta.url)
        },
        {
            "id": "po",
            "name": "Gettext PO",
            "aliases": [
                "pot",
                "potx"
            ],
            "import": ()=>__vitePreload(()=>import('./po-CcCGIg8G.js'), true ? [] : void 0, import.meta.url)
        },
        {
            "id": "postcss",
            "name": "PostCSS",
            "import": ()=>__vitePreload(()=>import('./postcss-wLX4xaF-.js'), true ? [] : void 0, import.meta.url)
        },
        {
            "id": "powerquery",
            "name": "PowerQuery",
            "import": ()=>__vitePreload(()=>import('./powerquery-Cu21y3vL.js'), true ? [] : void 0, import.meta.url)
        },
        {
            "id": "powershell",
            "name": "PowerShell",
            "aliases": [
                "ps",
                "ps1"
            ],
            "import": ()=>__vitePreload(()=>import('./powershell-Ck7-Ofz9.js'), true ? [] : void 0, import.meta.url)
        },
        {
            "id": "prisma",
            "name": "Prisma",
            "import": ()=>__vitePreload(()=>import('./prisma-BZ6ds9Dc.js'), true ? [] : void 0, import.meta.url)
        },
        {
            "id": "prolog",
            "name": "Prolog",
            "import": ()=>__vitePreload(()=>import('./prolog--cKXH8mU.js'), true ? [] : void 0, import.meta.url)
        },
        {
            "id": "proto",
            "name": "Protocol Buffer 3",
            "import": ()=>__vitePreload(()=>import('./proto-B6XGAlnz.js'), true ? [] : void 0, import.meta.url)
        },
        {
            "id": "pug",
            "name": "Pug",
            "aliases": [
                "jade"
            ],
            "import": ()=>__vitePreload(()=>import('./pug-BuUjPLGk.js'), true ? __vite__mapDeps([86,2,3,42,5,48,15,1]) : void 0, import.meta.url)
        },
        {
            "id": "puppet",
            "name": "Puppet",
            "import": ()=>__vitePreload(()=>import('./puppet-CfutUqpN.js'), true ? [] : void 0, import.meta.url)
        },
        {
            "id": "purescript",
            "name": "PureScript",
            "import": ()=>__vitePreload(()=>import('./purescript-BlP6AdMt.js'), true ? [] : void 0, import.meta.url)
        },
        {
            "id": "python",
            "name": "Python",
            "aliases": [
                "py"
            ],
            "import": ()=>__vitePreload(()=>import('./python-DdAFQc43.js'), true ? [] : void 0, import.meta.url)
        },
        {
            "id": "qml",
            "name": "QML",
            "import": ()=>__vitePreload(()=>import('./qml-ByojCR7G.js'), true ? __vite__mapDeps([87,2]) : void 0, import.meta.url)
        },
        {
            "id": "qmldir",
            "name": "QML Directory",
            "import": ()=>__vitePreload(()=>import('./qmldir-CAUG0jcA.js'), true ? [] : void 0, import.meta.url)
        },
        {
            "id": "qss",
            "name": "Qt Style Sheets",
            "import": ()=>__vitePreload(()=>import('./qss-D0sDDoJ-.js'), true ? [] : void 0, import.meta.url)
        },
        {
            "id": "r",
            "name": "R",
            "import": ()=>__vitePreload(()=>import('./r-VExt3r4_.js'), true ? [] : void 0, import.meta.url)
        },
        {
            "id": "racket",
            "name": "Racket",
            "import": ()=>__vitePreload(()=>import('./racket-BPtp4fbM.js'), true ? [] : void 0, import.meta.url)
        },
        {
            "id": "raku",
            "name": "Raku",
            "aliases": [
                "perl6"
            ],
            "import": ()=>__vitePreload(()=>import('./raku-B5YGNUlb.js'), true ? [] : void 0, import.meta.url)
        },
        {
            "id": "razor",
            "name": "ASP.NET Razor",
            "import": ()=>__vitePreload(()=>import('./razor-B3Rc5T7r.js'), true ? __vite__mapDeps([88,1,2,3,19]) : void 0, import.meta.url)
        },
        {
            "id": "reg",
            "name": "Windows Registry Script",
            "import": ()=>__vitePreload(()=>import('./reg-DnkMdH7P.js'), true ? [] : void 0, import.meta.url)
        },
        {
            "id": "regexp",
            "name": "RegExp",
            "aliases": [
                "regex"
            ],
            "import": ()=>__vitePreload(()=>import('./regexp-1N4mqI49.js'), true ? [] : void 0, import.meta.url)
        },
        {
            "id": "rel",
            "name": "Rel",
            "import": ()=>__vitePreload(()=>import('./rel-CrB3NqNz.js'), true ? [] : void 0, import.meta.url)
        },
        {
            "id": "riscv",
            "name": "RISC-V",
            "import": ()=>__vitePreload(()=>import('./riscv-jcVfKuR4.js'), true ? [] : void 0, import.meta.url)
        },
        {
            "id": "rst",
            "name": "reStructuredText",
            "import": ()=>__vitePreload(()=>import('./rst-BpzPa-jL.js'), true ? __vite__mapDeps([89,70,1,2,3,16,17,13,18,30,39,11,90,38,7,8,40]) : void 0, import.meta.url)
        },
        {
            "id": "ruby",
            "name": "Ruby",
            "aliases": [
                "rb"
            ],
            "import": ()=>__vitePreload(()=>import('./ruby-5LGjs1Pm.js'), true ? __vite__mapDeps([38,1,2,3,7,8,18,13,39,40]) : void 0, import.meta.url)
        },
        {
            "id": "rust",
            "name": "Rust",
            "aliases": [
                "rs"
            ],
            "import": ()=>__vitePreload(()=>import('./rust-COW7ZJIp.js'), true ? [] : void 0, import.meta.url)
        },
        {
            "id": "sas",
            "name": "SAS",
            "import": ()=>__vitePreload(()=>import('./sas-DEQFkSQy.js'), true ? __vite__mapDeps([91,18]) : void 0, import.meta.url)
        },
        {
            "id": "sass",
            "name": "Sass",
            "import": ()=>__vitePreload(()=>import('./sass-oJwsKQdv.js'), true ? [] : void 0, import.meta.url)
        },
        {
            "id": "scala",
            "name": "Scala",
            "import": ()=>__vitePreload(()=>import('./scala-DWUNMMxx.js'), true ? [] : void 0, import.meta.url)
        },
        {
            "id": "scheme",
            "name": "Scheme",
            "import": ()=>__vitePreload(()=>import('./scheme-DvKkvYn6.js'), true ? [] : void 0, import.meta.url)
        },
        {
            "id": "scss",
            "name": "SCSS",
            "import": ()=>__vitePreload(()=>import('./scss-Ce0o3RlH.js'), true ? __vite__mapDeps([5,3]) : void 0, import.meta.url)
        },
        {
            "id": "shaderlab",
            "name": "ShaderLab",
            "aliases": [
                "shader"
            ],
            "import": ()=>__vitePreload(()=>import('./shaderlab-eCoehSuZ.js'), true ? __vite__mapDeps([92,93]) : void 0, import.meta.url)
        },
        {
            "id": "shellscript",
            "name": "Shell",
            "aliases": [
                "bash",
                "sh",
                "shell",
                "zsh"
            ],
            "import": ()=>__vitePreload(()=>import('./shellscript-bBop2RGH.js'), true ? [] : void 0, import.meta.url)
        },
        {
            "id": "shellsession",
            "name": "Shell Session",
            "aliases": [
                "console"
            ],
            "import": ()=>__vitePreload(()=>import('./shellsession-ZfIGBriP.js'), true ? __vite__mapDeps([94,39]) : void 0, import.meta.url)
        },
        {
            "id": "smalltalk",
            "name": "Smalltalk",
            "import": ()=>__vitePreload(()=>import('./smalltalk-CHhY1l2A.js'), true ? [] : void 0, import.meta.url)
        },
        {
            "id": "solidity",
            "name": "Solidity",
            "import": ()=>__vitePreload(()=>import('./solidity-BvJD7_HO.js'), true ? [] : void 0, import.meta.url)
        },
        {
            "id": "soy",
            "name": "Closure Templates",
            "aliases": [
                "closure-templates"
            ],
            "import": ()=>__vitePreload(()=>import('./soy-uFMLDv8F.js'), true ? __vite__mapDeps([95,1,2,3]) : void 0, import.meta.url)
        },
        {
            "id": "sparql",
            "name": "SPARQL",
            "import": ()=>__vitePreload(()=>import('./sparql-Cgg-C-NB.js'), true ? __vite__mapDeps([96,97]) : void 0, import.meta.url)
        },
        {
            "id": "splunk",
            "name": "Splunk Query Language",
            "aliases": [
                "spl"
            ],
            "import": ()=>__vitePreload(()=>import('./splunk-Bjyy5GTb.js'), true ? [] : void 0, import.meta.url)
        },
        {
            "id": "sql",
            "name": "SQL",
            "import": ()=>__vitePreload(()=>import('./sql-yVRMvi0O.js'), true ? [] : void 0, import.meta.url)
        },
        {
            "id": "ssh-config",
            "name": "SSH Config",
            "import": ()=>__vitePreload(()=>import('./ssh-config-Cf9fh-Of.js'), true ? [] : void 0, import.meta.url)
        },
        {
            "id": "stata",
            "name": "Stata",
            "import": ()=>__vitePreload(()=>import('./stata-DazvD6a_.js'), true ? __vite__mapDeps([98,18]) : void 0, import.meta.url)
        },
        {
            "id": "stylus",
            "name": "Stylus",
            "aliases": [
                "styl"
            ],
            "import": ()=>__vitePreload(()=>import('./stylus-k-WBxfe-.js'), true ? [] : void 0, import.meta.url)
        },
        {
            "id": "svelte",
            "name": "Svelte",
            "import": ()=>__vitePreload(()=>import('./svelte-a8rGLUzl.js'), true ? __vite__mapDeps([99,2,46,15,48,42,3,5,33,49,86,1,58]) : void 0, import.meta.url)
        },
        {
            "id": "swift",
            "name": "Swift",
            "import": ()=>__vitePreload(()=>import('./swift-CGjhQosP.js'), true ? [] : void 0, import.meta.url)
        },
        {
            "id": "system-verilog",
            "name": "SystemVerilog",
            "import": ()=>__vitePreload(()=>import('./system-verilog-CiSd1dc5.js'), true ? [] : void 0, import.meta.url)
        },
        {
            "id": "systemd",
            "name": "Systemd Units",
            "import": ()=>__vitePreload(()=>import('./systemd-ymdT5skM.js'), true ? [] : void 0, import.meta.url)
        },
        {
            "id": "tasl",
            "name": "Tasl",
            "import": ()=>__vitePreload(()=>import('./tasl-BBPcXWu6.js'), true ? [] : void 0, import.meta.url)
        },
        {
            "id": "tcl",
            "name": "Tcl",
            "import": ()=>__vitePreload(()=>import('./tcl-e6HSX4IZ.js'), true ? [] : void 0, import.meta.url)
        },
        {
            "id": "terraform",
            "name": "Terraform",
            "aliases": [
                "tf",
                "tfvars"
            ],
            "import": ()=>__vitePreload(()=>import('./terraform--6Vhp8t1.js'), true ? [] : void 0, import.meta.url)
        },
        {
            "id": "tex",
            "name": "TeX",
            "import": ()=>__vitePreload(()=>import('./tex-0uGjJ9BI.js'), true ? __vite__mapDeps([78,31]) : void 0, import.meta.url)
        },
        {
            "id": "toml",
            "name": "TOML",
            "import": ()=>__vitePreload(()=>import('./toml-DU9_HPOl.js'), true ? [] : void 0, import.meta.url)
        },
        {
            "id": "tsv",
            "name": "TSV",
            "import": ()=>__vitePreload(()=>import('./tsv-Cncuw_uP.js'), true ? [] : void 0, import.meta.url)
        },
        {
            "id": "tsx",
            "name": "TSX",
            "import": ()=>__vitePreload(()=>import('./tsx-Ds786Is9.js'), true ? [] : void 0, import.meta.url)
        },
        {
            "id": "turtle",
            "name": "Turtle",
            "import": ()=>__vitePreload(()=>import('./turtle-B3VrIQpU.js'), true ? [] : void 0, import.meta.url)
        },
        {
            "id": "twig",
            "name": "Twig",
            "import": ()=>__vitePreload(()=>import('./twig-DshGX0wd.js'), true ? __vite__mapDeps([100,3,2,5,85,1,7,8,18,9,30,38,13,39,40]) : void 0, import.meta.url)
        },
        {
            "id": "typescript",
            "name": "TypeScript",
            "aliases": [
                "ts"
            ],
            "import": ()=>__vitePreload(()=>import('./typescript-CYliDbTU.js'), true ? [] : void 0, import.meta.url)
        },
        {
            "id": "typespec",
            "name": "TypeSpec",
            "aliases": [
                "tsp"
            ],
            "import": ()=>__vitePreload(()=>import('./typespec-NwnmPXuL.js'), true ? [] : void 0, import.meta.url)
        },
        {
            "id": "typst",
            "name": "Typst",
            "aliases": [
                "typ"
            ],
            "import": ()=>__vitePreload(()=>import('./typst-BWa1TV7J.js'), true ? [] : void 0, import.meta.url)
        },
        {
            "id": "v",
            "name": "V",
            "import": ()=>__vitePreload(()=>import('./v-s2YH5juv.js'), true ? [] : void 0, import.meta.url)
        },
        {
            "id": "vala",
            "name": "Vala",
            "import": ()=>__vitePreload(()=>import('./vala-DT3-eqQ9.js'), true ? [] : void 0, import.meta.url)
        },
        {
            "id": "vb",
            "name": "Visual Basic",
            "aliases": [
                "cmd"
            ],
            "import": ()=>__vitePreload(()=>import('./vb-Awm61LJT.js'), true ? [] : void 0, import.meta.url)
        },
        {
            "id": "verilog",
            "name": "Verilog",
            "import": ()=>__vitePreload(()=>import('./verilog-BTySLpX1.js'), true ? [] : void 0, import.meta.url)
        },
        {
            "id": "vhdl",
            "name": "VHDL",
            "import": ()=>__vitePreload(()=>import('./vhdl-BL0e3dLh.js'), true ? [] : void 0, import.meta.url)
        },
        {
            "id": "viml",
            "name": "Vim Script",
            "aliases": [
                "vim",
                "vimscript"
            ],
            "import": ()=>__vitePreload(()=>import('./viml-C5CdLap9.js'), true ? [] : void 0, import.meta.url)
        },
        {
            "id": "vue",
            "name": "Vue",
            "import": ()=>__vitePreload(()=>import('./vue-BVB0WzpV.js'), true ? __vite__mapDeps([101,1,2,3,58,86,42,5,48,15,33,46,28,50,9,102,103,11,45,66,70]) : void 0, import.meta.url)
        },
        {
            "id": "vue-html",
            "name": "Vue HTML",
            "import": ()=>__vitePreload(()=>import('./vue-html-fGSNhmCZ.js'), true ? __vite__mapDeps([104,101,1,2,3,58,86,42,5,48,15,33,46,28,50,9,102,103,11,45,66,70]) : void 0, import.meta.url)
        },
        {
            "id": "vyper",
            "name": "Vyper",
            "aliases": [
                "vy"
            ],
            "import": ()=>__vitePreload(()=>import('./vyper-wFny-JOj.js'), true ? [] : void 0, import.meta.url)
        },
        {
            "id": "wasm",
            "name": "WebAssembly",
            "import": ()=>__vitePreload(()=>import('./wasm-DILJjEZQ.js'), true ? [] : void 0, import.meta.url)
        },
        {
            "id": "wenyan",
            "name": "Wenyan",
            "aliases": [
                "\u6587\u8A00"
            ],
            "import": ()=>__vitePreload(()=>import('./wenyan-eANXBf90.js'), true ? [] : void 0, import.meta.url)
        },
        {
            "id": "wgsl",
            "name": "WGSL",
            "import": ()=>__vitePreload(()=>import('./wgsl-q491FsLB.js'), true ? [] : void 0, import.meta.url)
        },
        {
            "id": "wikitext",
            "name": "Wikitext",
            "aliases": [
                "mediawiki",
                "wiki"
            ],
            "import": ()=>__vitePreload(()=>import('./wikitext-BSXkYJx4.js'), true ? __vite__mapDeps([105,1,2,3,106,8,40,13,34,37,7,18,31,38,39,85,9,107,108,11,109,14,15,16,17,20,21,25,26,86,42,5,48,102,33,35,44,110,111,30,29,41,43,46,19,57,58,112,69,24,22,77,78,79,27,113]) : void 0, import.meta.url)
        },
        {
            "id": "wolfram",
            "name": "Wolfram",
            "aliases": [
                "wl"
            ],
            "import": ()=>__vitePreload(()=>import('./wolfram-V2PbioLU.js'), true ? [] : void 0, import.meta.url)
        },
        {
            "id": "xml",
            "name": "XML",
            "import": ()=>__vitePreload(()=>import('./xml-CGBdWXsr.js'), true ? __vite__mapDeps([7,8]) : void 0, import.meta.url)
        },
        {
            "id": "xsl",
            "name": "XSL",
            "import": ()=>__vitePreload(()=>import('./xsl-D2rJ1u14.js'), true ? __vite__mapDeps([108,7,8]) : void 0, import.meta.url)
        },
        {
            "id": "yaml",
            "name": "YAML",
            "aliases": [
                "yml"
            ],
            "import": ()=>__vitePreload(()=>import('./yaml-CdzeB0Js.js'), true ? [] : void 0, import.meta.url)
        },
        {
            "id": "zenscript",
            "name": "ZenScript",
            "import": ()=>__vitePreload(()=>import('./zenscript-BnNVz2gQ.js'), true ? [] : void 0, import.meta.url)
        },
        {
            "id": "zig",
            "name": "Zig",
            "import": ()=>__vitePreload(()=>import('./zig-DEFo1IqQ.js'), true ? [] : void 0, import.meta.url)
        }
    ];
    const bundledLanguagesBase = Object.fromEntries(bundledLanguagesInfo.map((i)=>[
            i.id,
            i.import
        ]));
    const bundledLanguagesAlias = Object.fromEntries(bundledLanguagesInfo.flatMap((i)=>i.aliases?.map((a)=>[
                a,
                i.import
            ]) || []));
    const bundledLanguages = {
        ...bundledLanguagesBase,
        ...bundledLanguagesAlias
    };
    const getWasmInlined = async (info)=>{
        return __vitePreload(()=>import('./wasm-Dhj7AXtS.js'), true ? [] : void 0, import.meta.url).then((wasm)=>wasm.default(info));
    };
    const bundledThemesInfo = [
        {
            "id": "andromeeda",
            "displayName": "Andromeeda",
            "type": "dark",
            "import": ()=>__vitePreload(()=>import('./andromeeda-XcesA-8v.js'), true ? [] : void 0, import.meta.url)
        },
        {
            "id": "aurora-x",
            "displayName": "Aurora X",
            "type": "dark",
            "import": ()=>__vitePreload(()=>import('./aurora-x-BtMvd7nI.js'), true ? [] : void 0, import.meta.url)
        },
        {
            "id": "ayu-dark",
            "displayName": "Ayu Dark",
            "type": "dark",
            "import": ()=>__vitePreload(()=>import('./ayu-dark-BSDWFLrw.js'), true ? [] : void 0, import.meta.url)
        },
        {
            "id": "catppuccin-frappe",
            "displayName": "Catppuccin Frapp\xE9",
            "type": "dark",
            "import": ()=>__vitePreload(()=>import('./catppuccin-frappe-CRFGrv6f.js'), true ? [] : void 0, import.meta.url)
        },
        {
            "id": "catppuccin-latte",
            "displayName": "Catppuccin Latte",
            "type": "light",
            "import": ()=>__vitePreload(()=>import('./catppuccin-latte-DSqGxWPn.js'), true ? [] : void 0, import.meta.url)
        },
        {
            "id": "catppuccin-macchiato",
            "displayName": "Catppuccin Macchiato",
            "type": "dark",
            "import": ()=>__vitePreload(()=>import('./catppuccin-macchiato-CInxiyPh.js'), true ? [] : void 0, import.meta.url)
        },
        {
            "id": "catppuccin-mocha",
            "displayName": "Catppuccin Mocha",
            "type": "dark",
            "import": ()=>__vitePreload(()=>import('./catppuccin-mocha-CkBTWDRv.js'), true ? [] : void 0, import.meta.url)
        },
        {
            "id": "dark-plus",
            "displayName": "Dark Plus",
            "type": "dark",
            "import": ()=>__vitePreload(()=>import('./dark-plus-C21b1ENp.js'), true ? [] : void 0, import.meta.url)
        },
        {
            "id": "dracula",
            "displayName": "Dracula",
            "type": "dark",
            "import": ()=>__vitePreload(()=>import('./dracula-D8Iwym2_.js'), true ? [] : void 0, import.meta.url)
        },
        {
            "id": "dracula-soft",
            "displayName": "Dracula Soft",
            "type": "dark",
            "import": ()=>__vitePreload(()=>import('./dracula-soft-CkoGTrrs.js'), true ? [] : void 0, import.meta.url)
        },
        {
            "id": "github-dark",
            "displayName": "GitHub Dark",
            "type": "dark",
            "import": ()=>__vitePreload(()=>import('./github-dark-D3-fsOKS.js'), true ? [] : void 0, import.meta.url)
        },
        {
            "id": "github-dark-default",
            "displayName": "GitHub Dark Default",
            "type": "dark",
            "import": ()=>__vitePreload(()=>import('./github-dark-default-WvRGqzJx.js'), true ? [] : void 0, import.meta.url)
        },
        {
            "id": "github-dark-dimmed",
            "displayName": "GitHub Dark Dimmed",
            "type": "dark",
            "import": ()=>__vitePreload(()=>import('./github-dark-dimmed-Di1zCf-H.js'), true ? [] : void 0, import.meta.url)
        },
        {
            "id": "github-light",
            "displayName": "GitHub Light",
            "type": "light",
            "import": ()=>__vitePreload(()=>import('./github-light-DqqgOqlM.js'), true ? [] : void 0, import.meta.url)
        },
        {
            "id": "github-light-default",
            "displayName": "GitHub Light Default",
            "type": "light",
            "import": ()=>__vitePreload(()=>import('./github-light-default-G8HBrsqv.js'), true ? [] : void 0, import.meta.url)
        },
        {
            "id": "houston",
            "displayName": "Houston",
            "type": "dark",
            "import": ()=>__vitePreload(()=>import('./houston-Ds2aoFPM.js'), true ? [] : void 0, import.meta.url)
        },
        {
            "id": "light-plus",
            "displayName": "Light Plus",
            "type": "light",
            "import": ()=>__vitePreload(()=>import('./light-plus-CWstZaBa.js'), true ? [] : void 0, import.meta.url)
        },
        {
            "id": "material-theme",
            "displayName": "Material Theme",
            "type": "dark",
            "import": ()=>__vitePreload(()=>import('./material-theme-C7HGcq5Y.js'), true ? [] : void 0, import.meta.url)
        },
        {
            "id": "material-theme-darker",
            "displayName": "Material Theme Darker",
            "type": "dark",
            "import": ()=>__vitePreload(()=>import('./material-theme-darker-FOnLh-L0.js'), true ? [] : void 0, import.meta.url)
        },
        {
            "id": "material-theme-lighter",
            "displayName": "Material Theme Lighter",
            "type": "light",
            "import": ()=>__vitePreload(()=>import('./material-theme-lighter-vSf6DANo.js'), true ? [] : void 0, import.meta.url)
        },
        {
            "id": "material-theme-ocean",
            "displayName": "Material Theme Ocean",
            "type": "dark",
            "import": ()=>__vitePreload(()=>import('./material-theme-ocean-DMbtbbCz.js'), true ? [] : void 0, import.meta.url)
        },
        {
            "id": "material-theme-palenight",
            "displayName": "Material Theme Palenight",
            "type": "dark",
            "import": ()=>__vitePreload(()=>import('./material-theme-palenight-DTeOW6Ky.js'), true ? [] : void 0, import.meta.url)
        },
        {
            "id": "min-dark",
            "displayName": "Min Dark",
            "type": "dark",
            "import": ()=>__vitePreload(()=>import('./min-dark-DmM1b6Xt.js'), true ? [] : void 0, import.meta.url)
        },
        {
            "id": "min-light",
            "displayName": "Min Light",
            "type": "light",
            "import": ()=>__vitePreload(()=>import('./min-light-LTflx352.js'), true ? [] : void 0, import.meta.url)
        },
        {
            "id": "monokai",
            "displayName": "Monokai",
            "type": "dark",
            "import": ()=>__vitePreload(()=>import('./monokai-Bthv0J6S.js'), true ? [] : void 0, import.meta.url)
        },
        {
            "id": "night-owl",
            "displayName": "Night Owl",
            "type": "dark",
            "import": ()=>__vitePreload(()=>import('./night-owl-BR4iYaqi.js'), true ? [] : void 0, import.meta.url)
        },
        {
            "id": "nord",
            "displayName": "Nord",
            "type": "dark",
            "import": ()=>__vitePreload(()=>import('./nord-D_lPy4Xt.js'), true ? [] : void 0, import.meta.url)
        },
        {
            "id": "one-dark-pro",
            "displayName": "One Dark Pro",
            "type": "dark",
            "import": ()=>__vitePreload(()=>import('./one-dark-pro-CZ1ny2Mh.js'), true ? [] : void 0, import.meta.url)
        },
        {
            "id": "one-light",
            "displayName": "One Light",
            "type": "light",
            "import": ()=>__vitePreload(()=>import('./one-light-_kLkK7-A.js'), true ? [] : void 0, import.meta.url)
        },
        {
            "id": "poimandres",
            "displayName": "Poimandres",
            "type": "dark",
            "import": ()=>__vitePreload(()=>import('./poimandres-DSZtIj8k.js'), true ? [] : void 0, import.meta.url)
        },
        {
            "id": "red",
            "displayName": "Red",
            "type": "dark",
            "import": ()=>__vitePreload(()=>import('./red-C6MrXHm-.js'), true ? [] : void 0, import.meta.url)
        },
        {
            "id": "rose-pine",
            "displayName": "Ros\xE9 Pine",
            "type": "dark",
            "import": ()=>__vitePreload(()=>import('./rose-pine-DilFf0MP.js'), true ? [] : void 0, import.meta.url)
        },
        {
            "id": "rose-pine-dawn",
            "displayName": "Ros\xE9 Pine Dawn",
            "type": "light",
            "import": ()=>__vitePreload(()=>import('./rose-pine-dawn-CfPMt1Ll.js'), true ? [] : void 0, import.meta.url)
        },
        {
            "id": "rose-pine-moon",
            "displayName": "Ros\xE9 Pine Moon",
            "type": "dark",
            "import": ()=>__vitePreload(()=>import('./rose-pine-moon-CLrokwnN.js'), true ? [] : void 0, import.meta.url)
        },
        {
            "id": "slack-dark",
            "displayName": "Slack Dark",
            "type": "dark",
            "import": ()=>__vitePreload(()=>import('./slack-dark-COTrafp3.js'), true ? [] : void 0, import.meta.url)
        },
        {
            "id": "slack-ochin",
            "displayName": "Slack Ochin",
            "type": "light",
            "import": ()=>__vitePreload(()=>import('./slack-ochin-Bn0zfduE.js'), true ? [] : void 0, import.meta.url)
        },
        {
            "id": "snazzy-light",
            "displayName": "Snazzy Light",
            "type": "light",
            "import": ()=>__vitePreload(()=>import('./snazzy-light-GZteANtr.js'), true ? [] : void 0, import.meta.url)
        },
        {
            "id": "solarized-dark",
            "displayName": "Solarized Dark",
            "type": "dark",
            "import": ()=>__vitePreload(()=>import('./solarized-dark-WAbYFw7B.js'), true ? [] : void 0, import.meta.url)
        },
        {
            "id": "solarized-light",
            "displayName": "Solarized Light",
            "type": "light",
            "import": ()=>__vitePreload(()=>import('./solarized-light-BxC2XS5C.js'), true ? [] : void 0, import.meta.url)
        },
        {
            "id": "synthwave-84",
            "displayName": "Synthwave '84",
            "type": "dark",
            "import": ()=>__vitePreload(()=>import('./synthwave-84-z1XOph4_.js'), true ? [] : void 0, import.meta.url)
        },
        {
            "id": "tokyo-night",
            "displayName": "Tokyo Night",
            "type": "dark",
            "import": ()=>__vitePreload(()=>import('./tokyo-night-oJutVU4Y.js'), true ? [] : void 0, import.meta.url)
        },
        {
            "id": "vesper",
            "displayName": "Vesper",
            "type": "dark",
            "import": ()=>__vitePreload(()=>import('./vesper-Dlv2S9UC.js'), true ? [] : void 0, import.meta.url)
        },
        {
            "id": "vitesse-black",
            "displayName": "Vitesse Black",
            "type": "dark",
            "import": ()=>__vitePreload(()=>import('./vitesse-black-DfrRc2sA.js'), true ? [] : void 0, import.meta.url)
        },
        {
            "id": "vitesse-dark",
            "displayName": "Vitesse Dark",
            "type": "dark",
            "import": ()=>__vitePreload(()=>import('./vitesse-dark-fOaPHi-m.js'), true ? [] : void 0, import.meta.url)
        },
        {
            "id": "vitesse-light",
            "displayName": "Vitesse Light",
            "type": "light",
            "import": ()=>__vitePreload(()=>import('./vitesse-light-BJm3BE0e.js'), true ? [] : void 0, import.meta.url)
        }
    ];
    const bundledThemes = Object.fromEntries(bundledThemesInfo.map((i)=>[
            i.id,
            i.import
        ]));
    var FontStyle;
    (function(FontStyle) {
        FontStyle[FontStyle["NotSet"] = -1] = "NotSet";
        FontStyle[FontStyle["None"] = 0] = "None";
        FontStyle[FontStyle["Italic"] = 1] = "Italic";
        FontStyle[FontStyle["Bold"] = 2] = "Bold";
        FontStyle[FontStyle["Underline"] = 4] = "Underline";
    })(FontStyle || (FontStyle = {}));
    var EncodedTokenAttributes;
    (function(EncodedTokenAttributes2) {
        function toBinaryStr(encodedTokenAttributes) {
            return encodedTokenAttributes.toString(2).padStart(32, "0");
        }
        EncodedTokenAttributes2.toBinaryStr = toBinaryStr;
        function print(encodedTokenAttributes) {
            const languageId = EncodedTokenAttributes2.getLanguageId(encodedTokenAttributes);
            const tokenType = EncodedTokenAttributes2.getTokenType(encodedTokenAttributes);
            const fontStyle = EncodedTokenAttributes2.getFontStyle(encodedTokenAttributes);
            const foreground = EncodedTokenAttributes2.getForeground(encodedTokenAttributes);
            const background = EncodedTokenAttributes2.getBackground(encodedTokenAttributes);
            console.log({
                languageId,
                tokenType,
                fontStyle,
                foreground,
                background
            });
        }
        EncodedTokenAttributes2.print = print;
        function getLanguageId(encodedTokenAttributes) {
            return (encodedTokenAttributes & 255) >>> 0;
        }
        EncodedTokenAttributes2.getLanguageId = getLanguageId;
        function getTokenType(encodedTokenAttributes) {
            return (encodedTokenAttributes & 768) >>> 8;
        }
        EncodedTokenAttributes2.getTokenType = getTokenType;
        function containsBalancedBrackets(encodedTokenAttributes) {
            return (encodedTokenAttributes & 1024) !== 0;
        }
        EncodedTokenAttributes2.containsBalancedBrackets = containsBalancedBrackets;
        function getFontStyle(encodedTokenAttributes) {
            return (encodedTokenAttributes & 30720) >>> 11;
        }
        EncodedTokenAttributes2.getFontStyle = getFontStyle;
        function getForeground(encodedTokenAttributes) {
            return (encodedTokenAttributes & 16744448) >>> 15;
        }
        EncodedTokenAttributes2.getForeground = getForeground;
        function getBackground(encodedTokenAttributes) {
            return (encodedTokenAttributes & 4278190080) >>> 24;
        }
        EncodedTokenAttributes2.getBackground = getBackground;
        function set(encodedTokenAttributes, languageId, tokenType, containsBalancedBrackets2, fontStyle, foreground, background) {
            let _languageId = EncodedTokenAttributes2.getLanguageId(encodedTokenAttributes);
            let _tokenType = EncodedTokenAttributes2.getTokenType(encodedTokenAttributes);
            let _containsBalancedBracketsBit = EncodedTokenAttributes2.containsBalancedBrackets(encodedTokenAttributes) ? 1 : 0;
            let _fontStyle = EncodedTokenAttributes2.getFontStyle(encodedTokenAttributes);
            let _foreground = EncodedTokenAttributes2.getForeground(encodedTokenAttributes);
            let _background = EncodedTokenAttributes2.getBackground(encodedTokenAttributes);
            if (languageId !== 0) {
                _languageId = languageId;
            }
            if (tokenType !== 8) {
                _tokenType = fromOptionalTokenType(tokenType);
            }
            if (containsBalancedBrackets2 !== null) {
                _containsBalancedBracketsBit = containsBalancedBrackets2 ? 1 : 0;
            }
            if (fontStyle !== -1) {
                _fontStyle = fontStyle;
            }
            if (foreground !== 0) {
                _foreground = foreground;
            }
            if (background !== 0) {
                _background = background;
            }
            return (_languageId << 0 | _tokenType << 8 | _containsBalancedBracketsBit << 10 | _fontStyle << 11 | _foreground << 15 | _background << 24) >>> 0;
        }
        EncodedTokenAttributes2.set = set;
    })(EncodedTokenAttributes || (EncodedTokenAttributes = {}));
    function toOptionalTokenType(standardType) {
        return standardType;
    }
    function fromOptionalTokenType(standardType) {
        return standardType;
    }
    function createMatchers(selector, matchesName) {
        const results = [];
        const tokenizer = newTokenizer(selector);
        let token = tokenizer.next();
        while(token !== null){
            let priority = 0;
            if (token.length === 2 && token.charAt(1) === ":") {
                switch(token.charAt(0)){
                    case "R":
                        priority = 1;
                        break;
                    case "L":
                        priority = -1;
                        break;
                    default:
                        console.log(`Unknown priority ${token} in scope selector`);
                }
                token = tokenizer.next();
            }
            let matcher = parseConjunction();
            results.push({
                matcher,
                priority
            });
            if (token !== ",") {
                break;
            }
            token = tokenizer.next();
        }
        return results;
        function parseOperand() {
            if (token === "-") {
                token = tokenizer.next();
                const expressionToNegate = parseOperand();
                return (matcherInput)=>!!expressionToNegate && !expressionToNegate(matcherInput);
            }
            if (token === "(") {
                token = tokenizer.next();
                const expressionInParents = parseInnerExpression();
                if (token === ")") {
                    token = tokenizer.next();
                }
                return expressionInParents;
            }
            if (isIdentifier(token)) {
                const identifiers = [];
                do {
                    identifiers.push(token);
                    token = tokenizer.next();
                }while (isIdentifier(token));
                return (matcherInput)=>matchesName(identifiers, matcherInput);
            }
            return null;
        }
        function parseConjunction() {
            const matchers = [];
            let matcher = parseOperand();
            while(matcher){
                matchers.push(matcher);
                matcher = parseOperand();
            }
            return (matcherInput)=>matchers.every((matcher2)=>matcher2(matcherInput));
        }
        function parseInnerExpression() {
            const matchers = [];
            let matcher = parseConjunction();
            while(matcher){
                matchers.push(matcher);
                if (token === "|" || token === ",") {
                    do {
                        token = tokenizer.next();
                    }while (token === "|" || token === ",");
                } else {
                    break;
                }
                matcher = parseConjunction();
            }
            return (matcherInput)=>matchers.some((matcher2)=>matcher2(matcherInput));
        }
    }
    function isIdentifier(token) {
        return !!token && !!token.match(/[\w\.:]+/);
    }
    function newTokenizer(input) {
        let regex = /([LR]:|[\w\.:][\w\.:\-]*|[\,\|\-\(\)])/g;
        let match = regex.exec(input);
        return {
            next: ()=>{
                if (!match) {
                    return null;
                }
                const res = match[0];
                match = regex.exec(input);
                return res;
            }
        };
    }
    function disposeOnigString(str) {
        if (typeof str.dispose === "function") {
            str.dispose();
        }
    }
    function clone(something) {
        return doClone(something);
    }
    function doClone(something) {
        if (Array.isArray(something)) {
            return cloneArray(something);
        }
        if (typeof something === "object") {
            return cloneObj(something);
        }
        return something;
    }
    function cloneArray(arr) {
        let r = [];
        for(let i = 0, len = arr.length; i < len; i++){
            r[i] = doClone(arr[i]);
        }
        return r;
    }
    function cloneObj(obj) {
        let r = {};
        for(let key in obj){
            r[key] = doClone(obj[key]);
        }
        return r;
    }
    function mergeObjects(target, ...sources) {
        sources.forEach((source)=>{
            for(let key in source){
                target[key] = source[key];
            }
        });
        return target;
    }
    function basename(path) {
        const idx = ~path.lastIndexOf("/") || ~path.lastIndexOf("\\");
        if (idx === 0) {
            return path;
        } else if (~idx === path.length - 1) {
            return basename(path.substring(0, path.length - 1));
        } else {
            return path.substr(~idx + 1);
        }
    }
    let CAPTURING_REGEX_SOURCE = /\$(\d+)|\${(\d+):\/(downcase|upcase)}/g;
    class RegexSource {
        static hasCaptures(regexSource) {
            if (regexSource === null) {
                return false;
            }
            CAPTURING_REGEX_SOURCE.lastIndex = 0;
            return CAPTURING_REGEX_SOURCE.test(regexSource);
        }
        static replaceCaptures(regexSource, captureSource, captureIndices) {
            return regexSource.replace(CAPTURING_REGEX_SOURCE, (match, index, commandIndex, command)=>{
                let capture = captureIndices[parseInt(index || commandIndex, 10)];
                if (capture) {
                    let result = captureSource.substring(capture.start, capture.end);
                    while(result[0] === "."){
                        result = result.substring(1);
                    }
                    switch(command){
                        case "downcase":
                            return result.toLowerCase();
                        case "upcase":
                            return result.toUpperCase();
                        default:
                            return result;
                    }
                } else {
                    return match;
                }
            });
        }
    }
    function strcmp(a, b) {
        if (a < b) {
            return -1;
        }
        if (a > b) {
            return 1;
        }
        return 0;
    }
    function strArrCmp(a, b) {
        if (a === null && b === null) {
            return 0;
        }
        if (!a) {
            return -1;
        }
        if (!b) {
            return 1;
        }
        let len1 = a.length;
        let len2 = b.length;
        if (len1 === len2) {
            for(let i = 0; i < len1; i++){
                let res = strcmp(a[i], b[i]);
                if (res !== 0) {
                    return res;
                }
            }
            return 0;
        }
        return len1 - len2;
    }
    function isValidHexColor(hex) {
        if (/^#[0-9a-f]{6}$/i.test(hex)) {
            return true;
        }
        if (/^#[0-9a-f]{8}$/i.test(hex)) {
            return true;
        }
        if (/^#[0-9a-f]{3}$/i.test(hex)) {
            return true;
        }
        if (/^#[0-9a-f]{4}$/i.test(hex)) {
            return true;
        }
        return false;
    }
    function escapeRegExpCharacters(value) {
        return value.replace(/[\-\\\{\}\*\+\?\|\^\$\.\,\[\]\(\)\#\s]/g, "\\$&");
    }
    class CachedFn {
        fn;
        cache = new Map();
        constructor(fn){
            this.fn = fn;
        }
        get(key) {
            if (this.cache.has(key)) {
                return this.cache.get(key);
            }
            const value = this.fn(key);
            this.cache.set(key, value);
            return value;
        }
    }
    class TopLevelRuleReference {
        scopeName;
        constructor(scopeName){
            this.scopeName = scopeName;
        }
        toKey() {
            return this.scopeName;
        }
    }
    class TopLevelRepositoryRuleReference {
        scopeName;
        ruleName;
        constructor(scopeName, ruleName){
            this.scopeName = scopeName;
            this.ruleName = ruleName;
        }
        toKey() {
            return `${this.scopeName}#${this.ruleName}`;
        }
    }
    class ExternalReferenceCollector {
        _references = [];
        _seenReferenceKeys = new Set();
        get references() {
            return this._references;
        }
        visitedRule = new Set();
        add(reference) {
            const key = reference.toKey();
            if (this._seenReferenceKeys.has(key)) {
                return;
            }
            this._seenReferenceKeys.add(key);
            this._references.push(reference);
        }
    }
    class ScopeDependencyProcessor {
        repo;
        initialScopeName;
        seenFullScopeRequests = new Set();
        seenPartialScopeRequests = new Set();
        Q;
        constructor(repo, initialScopeName){
            this.repo = repo;
            this.initialScopeName = initialScopeName;
            this.seenFullScopeRequests.add(this.initialScopeName);
            this.Q = [
                new TopLevelRuleReference(this.initialScopeName)
            ];
        }
        processQueue() {
            const q = this.Q;
            this.Q = [];
            const deps = new ExternalReferenceCollector();
            for (const dep of q){
                collectReferencesOfReference(dep, this.initialScopeName, this.repo, deps);
            }
            for (const dep of deps.references){
                if (dep instanceof TopLevelRuleReference) {
                    if (this.seenFullScopeRequests.has(dep.scopeName)) {
                        continue;
                    }
                    this.seenFullScopeRequests.add(dep.scopeName);
                    this.Q.push(dep);
                } else {
                    if (this.seenFullScopeRequests.has(dep.scopeName)) {
                        continue;
                    }
                    if (this.seenPartialScopeRequests.has(dep.toKey())) {
                        continue;
                    }
                    this.seenPartialScopeRequests.add(dep.toKey());
                    this.Q.push(dep);
                }
            }
        }
    }
    function collectReferencesOfReference(reference, baseGrammarScopeName, repo, result) {
        const selfGrammar = repo.lookup(reference.scopeName);
        if (!selfGrammar) {
            if (reference.scopeName === baseGrammarScopeName) {
                throw new Error(`No grammar provided for <${baseGrammarScopeName}>`);
            }
            return;
        }
        const baseGrammar = repo.lookup(baseGrammarScopeName);
        if (reference instanceof TopLevelRuleReference) {
            collectExternalReferencesInTopLevelRule({
                baseGrammar,
                selfGrammar
            }, result);
        } else {
            collectExternalReferencesInTopLevelRepositoryRule(reference.ruleName, {
                baseGrammar,
                selfGrammar,
                repository: selfGrammar.repository
            }, result);
        }
        const injections = repo.injections(reference.scopeName);
        if (injections) {
            for (const injection of injections){
                result.add(new TopLevelRuleReference(injection));
            }
        }
    }
    function collectExternalReferencesInTopLevelRepositoryRule(ruleName, context, result) {
        if (context.repository && context.repository[ruleName]) {
            const rule = context.repository[ruleName];
            collectExternalReferencesInRules([
                rule
            ], context, result);
        }
    }
    function collectExternalReferencesInTopLevelRule(context, result) {
        if (context.selfGrammar.patterns && Array.isArray(context.selfGrammar.patterns)) {
            collectExternalReferencesInRules(context.selfGrammar.patterns, {
                ...context,
                repository: context.selfGrammar.repository
            }, result);
        }
        if (context.selfGrammar.injections) {
            collectExternalReferencesInRules(Object.values(context.selfGrammar.injections), {
                ...context,
                repository: context.selfGrammar.repository
            }, result);
        }
    }
    function collectExternalReferencesInRules(rules, context, result) {
        for (const rule of rules){
            if (result.visitedRule.has(rule)) {
                continue;
            }
            result.visitedRule.add(rule);
            const patternRepository = rule.repository ? mergeObjects({}, context.repository, rule.repository) : context.repository;
            if (Array.isArray(rule.patterns)) {
                collectExternalReferencesInRules(rule.patterns, {
                    ...context,
                    repository: patternRepository
                }, result);
            }
            const include = rule.include;
            if (!include) {
                continue;
            }
            const reference = parseInclude(include);
            switch(reference.kind){
                case 0:
                    collectExternalReferencesInTopLevelRule({
                        ...context,
                        selfGrammar: context.baseGrammar
                    }, result);
                    break;
                case 1:
                    collectExternalReferencesInTopLevelRule(context, result);
                    break;
                case 2:
                    collectExternalReferencesInTopLevelRepositoryRule(reference.ruleName, {
                        ...context,
                        repository: patternRepository
                    }, result);
                    break;
                case 3:
                case 4:
                    const selfGrammar = reference.scopeName === context.selfGrammar.scopeName ? context.selfGrammar : reference.scopeName === context.baseGrammar.scopeName ? context.baseGrammar : void 0;
                    if (selfGrammar) {
                        const newContext = {
                            baseGrammar: context.baseGrammar,
                            selfGrammar,
                            repository: patternRepository
                        };
                        if (reference.kind === 4) {
                            collectExternalReferencesInTopLevelRepositoryRule(reference.ruleName, newContext, result);
                        } else {
                            collectExternalReferencesInTopLevelRule(newContext, result);
                        }
                    } else {
                        if (reference.kind === 4) {
                            result.add(new TopLevelRepositoryRuleReference(reference.scopeName, reference.ruleName));
                        } else {
                            result.add(new TopLevelRuleReference(reference.scopeName));
                        }
                    }
                    break;
            }
        }
    }
    class BaseReference {
        kind = 0;
    }
    class SelfReference {
        kind = 1;
    }
    class RelativeReference {
        ruleName;
        kind = 2;
        constructor(ruleName){
            this.ruleName = ruleName;
        }
    }
    class TopLevelReference {
        scopeName;
        kind = 3;
        constructor(scopeName){
            this.scopeName = scopeName;
        }
    }
    class TopLevelRepositoryReference {
        scopeName;
        ruleName;
        kind = 4;
        constructor(scopeName, ruleName){
            this.scopeName = scopeName;
            this.ruleName = ruleName;
        }
    }
    function parseInclude(include) {
        if (include === "$base") {
            return new BaseReference();
        } else if (include === "$self") {
            return new SelfReference();
        }
        const indexOfSharp = include.indexOf("#");
        if (indexOfSharp === -1) {
            return new TopLevelReference(include);
        } else if (indexOfSharp === 0) {
            return new RelativeReference(include.substring(1));
        } else {
            const scopeName = include.substring(0, indexOfSharp);
            const ruleName = include.substring(indexOfSharp + 1);
            return new TopLevelRepositoryReference(scopeName, ruleName);
        }
    }
    const HAS_BACK_REFERENCES = /\\(\d+)/;
    const BACK_REFERENCING_END = /\\(\d+)/g;
    const endRuleId = -1;
    const whileRuleId = -2;
    function ruleIdFromNumber(id) {
        return id;
    }
    function ruleIdToNumber(id) {
        return id;
    }
    class Rule {
        $location;
        id;
        _nameIsCapturing;
        _name;
        _contentNameIsCapturing;
        _contentName;
        constructor($location, id, name, contentName){
            this.$location = $location;
            this.id = id;
            this._name = name || null;
            this._nameIsCapturing = RegexSource.hasCaptures(this._name);
            this._contentName = contentName || null;
            this._contentNameIsCapturing = RegexSource.hasCaptures(this._contentName);
        }
        get debugName() {
            const location = this.$location ? `${basename(this.$location.filename)}:${this.$location.line}` : "unknown";
            return `${this.constructor.name}#${this.id} @ ${location}`;
        }
        getName(lineText, captureIndices) {
            if (!this._nameIsCapturing || this._name === null || lineText === null || captureIndices === null) {
                return this._name;
            }
            return RegexSource.replaceCaptures(this._name, lineText, captureIndices);
        }
        getContentName(lineText, captureIndices) {
            if (!this._contentNameIsCapturing || this._contentName === null) {
                return this._contentName;
            }
            return RegexSource.replaceCaptures(this._contentName, lineText, captureIndices);
        }
    }
    class CaptureRule extends Rule {
        retokenizeCapturedWithRuleId;
        constructor($location, id, name, contentName, retokenizeCapturedWithRuleId){
            super($location, id, name, contentName);
            this.retokenizeCapturedWithRuleId = retokenizeCapturedWithRuleId;
        }
        dispose() {}
        collectPatterns(grammar, out) {
            throw new Error("Not supported!");
        }
        compile(grammar, endRegexSource) {
            throw new Error("Not supported!");
        }
        compileAG(grammar, endRegexSource, allowA, allowG) {
            throw new Error("Not supported!");
        }
    }
    class MatchRule extends Rule {
        _match;
        captures;
        _cachedCompiledPatterns;
        constructor($location, id, name, match, captures){
            super($location, id, name, null);
            this._match = new RegExpSource(match, this.id);
            this.captures = captures;
            this._cachedCompiledPatterns = null;
        }
        dispose() {
            if (this._cachedCompiledPatterns) {
                this._cachedCompiledPatterns.dispose();
                this._cachedCompiledPatterns = null;
            }
        }
        get debugMatchRegExp() {
            return `${this._match.source}`;
        }
        collectPatterns(grammar, out) {
            out.push(this._match);
        }
        compile(grammar, endRegexSource) {
            return this._getCachedCompiledPatterns(grammar).compile(grammar);
        }
        compileAG(grammar, endRegexSource, allowA, allowG) {
            return this._getCachedCompiledPatterns(grammar).compileAG(grammar, allowA, allowG);
        }
        _getCachedCompiledPatterns(grammar) {
            if (!this._cachedCompiledPatterns) {
                this._cachedCompiledPatterns = new RegExpSourceList();
                this.collectPatterns(grammar, this._cachedCompiledPatterns);
            }
            return this._cachedCompiledPatterns;
        }
    }
    class IncludeOnlyRule extends Rule {
        hasMissingPatterns;
        patterns;
        _cachedCompiledPatterns;
        constructor($location, id, name, contentName, patterns){
            super($location, id, name, contentName);
            this.patterns = patterns.patterns;
            this.hasMissingPatterns = patterns.hasMissingPatterns;
            this._cachedCompiledPatterns = null;
        }
        dispose() {
            if (this._cachedCompiledPatterns) {
                this._cachedCompiledPatterns.dispose();
                this._cachedCompiledPatterns = null;
            }
        }
        collectPatterns(grammar, out) {
            for (const pattern of this.patterns){
                const rule = grammar.getRule(pattern);
                rule.collectPatterns(grammar, out);
            }
        }
        compile(grammar, endRegexSource) {
            return this._getCachedCompiledPatterns(grammar).compile(grammar);
        }
        compileAG(grammar, endRegexSource, allowA, allowG) {
            return this._getCachedCompiledPatterns(grammar).compileAG(grammar, allowA, allowG);
        }
        _getCachedCompiledPatterns(grammar) {
            if (!this._cachedCompiledPatterns) {
                this._cachedCompiledPatterns = new RegExpSourceList();
                this.collectPatterns(grammar, this._cachedCompiledPatterns);
            }
            return this._cachedCompiledPatterns;
        }
    }
    class BeginEndRule extends Rule {
        _begin;
        beginCaptures;
        _end;
        endHasBackReferences;
        endCaptures;
        applyEndPatternLast;
        hasMissingPatterns;
        patterns;
        _cachedCompiledPatterns;
        constructor($location, id, name, contentName, begin, beginCaptures, end, endCaptures, applyEndPatternLast, patterns){
            super($location, id, name, contentName);
            this._begin = new RegExpSource(begin, this.id);
            this.beginCaptures = beginCaptures;
            this._end = new RegExpSource(end ? end : "￿", -1);
            this.endHasBackReferences = this._end.hasBackReferences;
            this.endCaptures = endCaptures;
            this.applyEndPatternLast = applyEndPatternLast || false;
            this.patterns = patterns.patterns;
            this.hasMissingPatterns = patterns.hasMissingPatterns;
            this._cachedCompiledPatterns = null;
        }
        dispose() {
            if (this._cachedCompiledPatterns) {
                this._cachedCompiledPatterns.dispose();
                this._cachedCompiledPatterns = null;
            }
        }
        get debugBeginRegExp() {
            return `${this._begin.source}`;
        }
        get debugEndRegExp() {
            return `${this._end.source}`;
        }
        getEndWithResolvedBackReferences(lineText, captureIndices) {
            return this._end.resolveBackReferences(lineText, captureIndices);
        }
        collectPatterns(grammar, out) {
            out.push(this._begin);
        }
        compile(grammar, endRegexSource) {
            return this._getCachedCompiledPatterns(grammar, endRegexSource).compile(grammar);
        }
        compileAG(grammar, endRegexSource, allowA, allowG) {
            return this._getCachedCompiledPatterns(grammar, endRegexSource).compileAG(grammar, allowA, allowG);
        }
        _getCachedCompiledPatterns(grammar, endRegexSource) {
            if (!this._cachedCompiledPatterns) {
                this._cachedCompiledPatterns = new RegExpSourceList();
                for (const pattern of this.patterns){
                    const rule = grammar.getRule(pattern);
                    rule.collectPatterns(grammar, this._cachedCompiledPatterns);
                }
                if (this.applyEndPatternLast) {
                    this._cachedCompiledPatterns.push(this._end.hasBackReferences ? this._end.clone() : this._end);
                } else {
                    this._cachedCompiledPatterns.unshift(this._end.hasBackReferences ? this._end.clone() : this._end);
                }
            }
            if (this._end.hasBackReferences) {
                if (this.applyEndPatternLast) {
                    this._cachedCompiledPatterns.setSource(this._cachedCompiledPatterns.length() - 1, endRegexSource);
                } else {
                    this._cachedCompiledPatterns.setSource(0, endRegexSource);
                }
            }
            return this._cachedCompiledPatterns;
        }
    }
    class BeginWhileRule extends Rule {
        _begin;
        beginCaptures;
        whileCaptures;
        _while;
        whileHasBackReferences;
        hasMissingPatterns;
        patterns;
        _cachedCompiledPatterns;
        _cachedCompiledWhilePatterns;
        constructor($location, id, name, contentName, begin, beginCaptures, _while, whileCaptures, patterns){
            super($location, id, name, contentName);
            this._begin = new RegExpSource(begin, this.id);
            this.beginCaptures = beginCaptures;
            this.whileCaptures = whileCaptures;
            this._while = new RegExpSource(_while, whileRuleId);
            this.whileHasBackReferences = this._while.hasBackReferences;
            this.patterns = patterns.patterns;
            this.hasMissingPatterns = patterns.hasMissingPatterns;
            this._cachedCompiledPatterns = null;
            this._cachedCompiledWhilePatterns = null;
        }
        dispose() {
            if (this._cachedCompiledPatterns) {
                this._cachedCompiledPatterns.dispose();
                this._cachedCompiledPatterns = null;
            }
            if (this._cachedCompiledWhilePatterns) {
                this._cachedCompiledWhilePatterns.dispose();
                this._cachedCompiledWhilePatterns = null;
            }
        }
        get debugBeginRegExp() {
            return `${this._begin.source}`;
        }
        get debugWhileRegExp() {
            return `${this._while.source}`;
        }
        getWhileWithResolvedBackReferences(lineText, captureIndices) {
            return this._while.resolveBackReferences(lineText, captureIndices);
        }
        collectPatterns(grammar, out) {
            out.push(this._begin);
        }
        compile(grammar, endRegexSource) {
            return this._getCachedCompiledPatterns(grammar).compile(grammar);
        }
        compileAG(grammar, endRegexSource, allowA, allowG) {
            return this._getCachedCompiledPatterns(grammar).compileAG(grammar, allowA, allowG);
        }
        _getCachedCompiledPatterns(grammar) {
            if (!this._cachedCompiledPatterns) {
                this._cachedCompiledPatterns = new RegExpSourceList();
                for (const pattern of this.patterns){
                    const rule = grammar.getRule(pattern);
                    rule.collectPatterns(grammar, this._cachedCompiledPatterns);
                }
            }
            return this._cachedCompiledPatterns;
        }
        compileWhile(grammar, endRegexSource) {
            return this._getCachedCompiledWhilePatterns(grammar, endRegexSource).compile(grammar);
        }
        compileWhileAG(grammar, endRegexSource, allowA, allowG) {
            return this._getCachedCompiledWhilePatterns(grammar, endRegexSource).compileAG(grammar, allowA, allowG);
        }
        _getCachedCompiledWhilePatterns(grammar, endRegexSource) {
            if (!this._cachedCompiledWhilePatterns) {
                this._cachedCompiledWhilePatterns = new RegExpSourceList();
                this._cachedCompiledWhilePatterns.push(this._while.hasBackReferences ? this._while.clone() : this._while);
            }
            if (this._while.hasBackReferences) {
                this._cachedCompiledWhilePatterns.setSource(0, endRegexSource ? endRegexSource : "￿");
            }
            return this._cachedCompiledWhilePatterns;
        }
    }
    class RuleFactory {
        static createCaptureRule(helper, $location, name, contentName, retokenizeCapturedWithRuleId) {
            return helper.registerRule((id)=>{
                return new CaptureRule($location, id, name, contentName, retokenizeCapturedWithRuleId);
            });
        }
        static getCompiledRuleId(desc, helper, repository) {
            if (!desc.id) {
                helper.registerRule((id)=>{
                    desc.id = id;
                    if (desc.match) {
                        return new MatchRule(desc.$vscodeTextmateLocation, desc.id, desc.name, desc.match, RuleFactory._compileCaptures(desc.captures, helper, repository));
                    }
                    if (typeof desc.begin === "undefined") {
                        if (desc.repository) {
                            repository = mergeObjects({}, repository, desc.repository);
                        }
                        let patterns = desc.patterns;
                        if (typeof patterns === "undefined" && desc.include) {
                            patterns = [
                                {
                                    include: desc.include
                                }
                            ];
                        }
                        return new IncludeOnlyRule(desc.$vscodeTextmateLocation, desc.id, desc.name, desc.contentName, RuleFactory._compilePatterns(patterns, helper, repository));
                    }
                    if (desc.while) {
                        return new BeginWhileRule(desc.$vscodeTextmateLocation, desc.id, desc.name, desc.contentName, desc.begin, RuleFactory._compileCaptures(desc.beginCaptures || desc.captures, helper, repository), desc.while, RuleFactory._compileCaptures(desc.whileCaptures || desc.captures, helper, repository), RuleFactory._compilePatterns(desc.patterns, helper, repository));
                    }
                    return new BeginEndRule(desc.$vscodeTextmateLocation, desc.id, desc.name, desc.contentName, desc.begin, RuleFactory._compileCaptures(desc.beginCaptures || desc.captures, helper, repository), desc.end, RuleFactory._compileCaptures(desc.endCaptures || desc.captures, helper, repository), desc.applyEndPatternLast, RuleFactory._compilePatterns(desc.patterns, helper, repository));
                });
            }
            return desc.id;
        }
        static _compileCaptures(captures, helper, repository) {
            let r = [];
            if (captures) {
                let maximumCaptureId = 0;
                for(const captureId in captures){
                    if (captureId === "$vscodeTextmateLocation") {
                        continue;
                    }
                    const numericCaptureId = parseInt(captureId, 10);
                    if (numericCaptureId > maximumCaptureId) {
                        maximumCaptureId = numericCaptureId;
                    }
                }
                for(let i = 0; i <= maximumCaptureId; i++){
                    r[i] = null;
                }
                for(const captureId in captures){
                    if (captureId === "$vscodeTextmateLocation") {
                        continue;
                    }
                    const numericCaptureId = parseInt(captureId, 10);
                    let retokenizeCapturedWithRuleId = 0;
                    if (captures[captureId].patterns) {
                        retokenizeCapturedWithRuleId = RuleFactory.getCompiledRuleId(captures[captureId], helper, repository);
                    }
                    r[numericCaptureId] = RuleFactory.createCaptureRule(helper, captures[captureId].$vscodeTextmateLocation, captures[captureId].name, captures[captureId].contentName, retokenizeCapturedWithRuleId);
                }
            }
            return r;
        }
        static _compilePatterns(patterns, helper, repository) {
            let r = [];
            if (patterns) {
                for(let i = 0, len = patterns.length; i < len; i++){
                    const pattern = patterns[i];
                    let ruleId = -1;
                    if (pattern.include) {
                        const reference = parseInclude(pattern.include);
                        switch(reference.kind){
                            case 0:
                            case 1:
                                ruleId = RuleFactory.getCompiledRuleId(repository[pattern.include], helper, repository);
                                break;
                            case 2:
                                let localIncludedRule = repository[reference.ruleName];
                                if (localIncludedRule) {
                                    ruleId = RuleFactory.getCompiledRuleId(localIncludedRule, helper, repository);
                                }
                                break;
                            case 3:
                            case 4:
                                const externalGrammarName = reference.scopeName;
                                const externalGrammarInclude = reference.kind === 4 ? reference.ruleName : null;
                                const externalGrammar = helper.getExternalGrammar(externalGrammarName, repository);
                                if (externalGrammar) {
                                    if (externalGrammarInclude) {
                                        let externalIncludedRule = externalGrammar.repository[externalGrammarInclude];
                                        if (externalIncludedRule) {
                                            ruleId = RuleFactory.getCompiledRuleId(externalIncludedRule, helper, externalGrammar.repository);
                                        }
                                    } else {
                                        ruleId = RuleFactory.getCompiledRuleId(externalGrammar.repository.$self, helper, externalGrammar.repository);
                                    }
                                }
                                break;
                        }
                    } else {
                        ruleId = RuleFactory.getCompiledRuleId(pattern, helper, repository);
                    }
                    if (ruleId !== -1) {
                        const rule = helper.getRule(ruleId);
                        let skipRule = false;
                        if (rule instanceof IncludeOnlyRule || rule instanceof BeginEndRule || rule instanceof BeginWhileRule) {
                            if (rule.hasMissingPatterns && rule.patterns.length === 0) {
                                skipRule = true;
                            }
                        }
                        if (skipRule) {
                            continue;
                        }
                        r.push(ruleId);
                    }
                }
            }
            return {
                patterns: r,
                hasMissingPatterns: (patterns ? patterns.length : 0) !== r.length
            };
        }
    }
    class RegExpSource {
        source;
        ruleId;
        hasAnchor;
        hasBackReferences;
        _anchorCache;
        constructor(regExpSource, ruleId){
            if (regExpSource) {
                const len = regExpSource.length;
                let lastPushedPos = 0;
                let output = [];
                let hasAnchor = false;
                for(let pos = 0; pos < len; pos++){
                    const ch = regExpSource.charAt(pos);
                    if (ch === "\\") {
                        if (pos + 1 < len) {
                            const nextCh = regExpSource.charAt(pos + 1);
                            if (nextCh === "z") {
                                output.push(regExpSource.substring(lastPushedPos, pos));
                                output.push("$(?!\\n)(?<!\\n)");
                                lastPushedPos = pos + 2;
                            } else if (nextCh === "A" || nextCh === "G") {
                                hasAnchor = true;
                            }
                            pos++;
                        }
                    }
                }
                this.hasAnchor = hasAnchor;
                if (lastPushedPos === 0) {
                    this.source = regExpSource;
                } else {
                    output.push(regExpSource.substring(lastPushedPos, len));
                    this.source = output.join("");
                }
            } else {
                this.hasAnchor = false;
                this.source = regExpSource;
            }
            if (this.hasAnchor) {
                this._anchorCache = this._buildAnchorCache();
            } else {
                this._anchorCache = null;
            }
            this.ruleId = ruleId;
            this.hasBackReferences = HAS_BACK_REFERENCES.test(this.source);
        }
        clone() {
            return new RegExpSource(this.source, this.ruleId);
        }
        setSource(newSource) {
            if (this.source === newSource) {
                return;
            }
            this.source = newSource;
            if (this.hasAnchor) {
                this._anchorCache = this._buildAnchorCache();
            }
        }
        resolveBackReferences(lineText, captureIndices) {
            let capturedValues = captureIndices.map((capture)=>{
                return lineText.substring(capture.start, capture.end);
            });
            BACK_REFERENCING_END.lastIndex = 0;
            return this.source.replace(BACK_REFERENCING_END, (match, g1)=>{
                return escapeRegExpCharacters(capturedValues[parseInt(g1, 10)] || "");
            });
        }
        _buildAnchorCache() {
            let A0_G0_result = [];
            let A0_G1_result = [];
            let A1_G0_result = [];
            let A1_G1_result = [];
            let pos, len, ch, nextCh;
            for(pos = 0, len = this.source.length; pos < len; pos++){
                ch = this.source.charAt(pos);
                A0_G0_result[pos] = ch;
                A0_G1_result[pos] = ch;
                A1_G0_result[pos] = ch;
                A1_G1_result[pos] = ch;
                if (ch === "\\") {
                    if (pos + 1 < len) {
                        nextCh = this.source.charAt(pos + 1);
                        if (nextCh === "A") {
                            A0_G0_result[pos + 1] = "￿";
                            A0_G1_result[pos + 1] = "￿";
                            A1_G0_result[pos + 1] = "A";
                            A1_G1_result[pos + 1] = "A";
                        } else if (nextCh === "G") {
                            A0_G0_result[pos + 1] = "￿";
                            A0_G1_result[pos + 1] = "G";
                            A1_G0_result[pos + 1] = "￿";
                            A1_G1_result[pos + 1] = "G";
                        } else {
                            A0_G0_result[pos + 1] = nextCh;
                            A0_G1_result[pos + 1] = nextCh;
                            A1_G0_result[pos + 1] = nextCh;
                            A1_G1_result[pos + 1] = nextCh;
                        }
                        pos++;
                    }
                }
            }
            return {
                A0_G0: A0_G0_result.join(""),
                A0_G1: A0_G1_result.join(""),
                A1_G0: A1_G0_result.join(""),
                A1_G1: A1_G1_result.join("")
            };
        }
        resolveAnchors(allowA, allowG) {
            if (!this.hasAnchor || !this._anchorCache) {
                return this.source;
            }
            if (allowA) {
                if (allowG) {
                    return this._anchorCache.A1_G1;
                } else {
                    return this._anchorCache.A1_G0;
                }
            } else {
                if (allowG) {
                    return this._anchorCache.A0_G1;
                } else {
                    return this._anchorCache.A0_G0;
                }
            }
        }
    }
    class RegExpSourceList {
        _items;
        _hasAnchors;
        _cached;
        _anchorCache;
        constructor(){
            this._items = [];
            this._hasAnchors = false;
            this._cached = null;
            this._anchorCache = {
                A0_G0: null,
                A0_G1: null,
                A1_G0: null,
                A1_G1: null
            };
        }
        dispose() {
            this._disposeCaches();
        }
        _disposeCaches() {
            if (this._cached) {
                this._cached.dispose();
                this._cached = null;
            }
            if (this._anchorCache.A0_G0) {
                this._anchorCache.A0_G0.dispose();
                this._anchorCache.A0_G0 = null;
            }
            if (this._anchorCache.A0_G1) {
                this._anchorCache.A0_G1.dispose();
                this._anchorCache.A0_G1 = null;
            }
            if (this._anchorCache.A1_G0) {
                this._anchorCache.A1_G0.dispose();
                this._anchorCache.A1_G0 = null;
            }
            if (this._anchorCache.A1_G1) {
                this._anchorCache.A1_G1.dispose();
                this._anchorCache.A1_G1 = null;
            }
        }
        push(item) {
            this._items.push(item);
            this._hasAnchors = this._hasAnchors || item.hasAnchor;
        }
        unshift(item) {
            this._items.unshift(item);
            this._hasAnchors = this._hasAnchors || item.hasAnchor;
        }
        length() {
            return this._items.length;
        }
        setSource(index, newSource) {
            if (this._items[index].source !== newSource) {
                this._disposeCaches();
                this._items[index].setSource(newSource);
            }
        }
        compile(onigLib) {
            if (!this._cached) {
                let regExps = this._items.map((e)=>e.source);
                this._cached = new CompiledRule(onigLib, regExps, this._items.map((e)=>e.ruleId));
            }
            return this._cached;
        }
        compileAG(onigLib, allowA, allowG) {
            if (!this._hasAnchors) {
                return this.compile(onigLib);
            } else {
                if (allowA) {
                    if (allowG) {
                        if (!this._anchorCache.A1_G1) {
                            this._anchorCache.A1_G1 = this._resolveAnchors(onigLib, allowA, allowG);
                        }
                        return this._anchorCache.A1_G1;
                    } else {
                        if (!this._anchorCache.A1_G0) {
                            this._anchorCache.A1_G0 = this._resolveAnchors(onigLib, allowA, allowG);
                        }
                        return this._anchorCache.A1_G0;
                    }
                } else {
                    if (allowG) {
                        if (!this._anchorCache.A0_G1) {
                            this._anchorCache.A0_G1 = this._resolveAnchors(onigLib, allowA, allowG);
                        }
                        return this._anchorCache.A0_G1;
                    } else {
                        if (!this._anchorCache.A0_G0) {
                            this._anchorCache.A0_G0 = this._resolveAnchors(onigLib, allowA, allowG);
                        }
                        return this._anchorCache.A0_G0;
                    }
                }
            }
        }
        _resolveAnchors(onigLib, allowA, allowG) {
            let regExps = this._items.map((e)=>e.resolveAnchors(allowA, allowG));
            return new CompiledRule(onigLib, regExps, this._items.map((e)=>e.ruleId));
        }
    }
    class CompiledRule {
        regExps;
        rules;
        scanner;
        constructor(onigLib, regExps, rules){
            this.regExps = regExps;
            this.rules = rules;
            this.scanner = onigLib.createOnigScanner(regExps);
        }
        dispose() {
            if (typeof this.scanner.dispose === "function") {
                this.scanner.dispose();
            }
        }
        toString() {
            const r = [];
            for(let i = 0, len = this.rules.length; i < len; i++){
                r.push("   - " + this.rules[i] + ": " + this.regExps[i]);
            }
            return r.join("\n");
        }
        findNextMatchSync(string, startPosition, options) {
            const result = this.scanner.findNextMatchSync(string, startPosition, options);
            if (!result) {
                return null;
            }
            return {
                ruleId: this.rules[result.index],
                captureIndices: result.captureIndices
            };
        }
    }
    class Theme {
        _colorMap;
        _defaults;
        _root;
        static createFromRawTheme(source, colorMap) {
            return this.createFromParsedTheme(parseTheme(source), colorMap);
        }
        static createFromParsedTheme(source, colorMap) {
            return resolveParsedThemeRules(source, colorMap);
        }
        _cachedMatchRoot = new CachedFn((scopeName)=>this._root.match(scopeName));
        constructor(_colorMap, _defaults, _root){
            this._colorMap = _colorMap;
            this._defaults = _defaults;
            this._root = _root;
        }
        getColorMap() {
            return this._colorMap.getColorMap();
        }
        getDefaults() {
            return this._defaults;
        }
        match(scopePath) {
            if (scopePath === null) {
                return this._defaults;
            }
            const scopeName = scopePath.scopeName;
            const matchingTrieElements = this._cachedMatchRoot.get(scopeName);
            const effectiveRule = matchingTrieElements.find((v)=>_scopePathMatchesParentScopes(scopePath.parent, v.parentScopes));
            if (!effectiveRule) {
                return null;
            }
            return new StyleAttributes(effectiveRule.fontStyle, effectiveRule.foreground, effectiveRule.background);
        }
    }
    class ScopeStack {
        parent;
        scopeName;
        static push(path, scopeNames) {
            for (const name of scopeNames){
                path = new ScopeStack(path, name);
            }
            return path;
        }
        static from(...segments) {
            let result = null;
            for(let i = 0; i < segments.length; i++){
                result = new ScopeStack(result, segments[i]);
            }
            return result;
        }
        constructor(parent, scopeName){
            this.parent = parent;
            this.scopeName = scopeName;
        }
        push(scopeName) {
            return new ScopeStack(this, scopeName);
        }
        getSegments() {
            let item = this;
            const result = [];
            while(item){
                result.push(item.scopeName);
                item = item.parent;
            }
            result.reverse();
            return result;
        }
        toString() {
            return this.getSegments().join(" ");
        }
        extends(other) {
            if (this === other) {
                return true;
            }
            if (this.parent === null) {
                return false;
            }
            return this.parent.extends(other);
        }
        getExtensionIfDefined(base) {
            const result = [];
            let item = this;
            while(item && item !== base){
                result.push(item.scopeName);
                item = item.parent;
            }
            return item === base ? result.reverse() : void 0;
        }
    }
    function _scopePathMatchesParentScopes(scopePath, parentScopes) {
        if (parentScopes === null) {
            return true;
        }
        let index = 0;
        let scopePattern = parentScopes[index];
        while(scopePath){
            if (_matchesScope(scopePath.scopeName, scopePattern)) {
                index++;
                if (index === parentScopes.length) {
                    return true;
                }
                scopePattern = parentScopes[index];
            }
            scopePath = scopePath.parent;
        }
        return false;
    }
    function _matchesScope(scopeName, scopePattern) {
        return scopePattern === scopeName || scopeName.startsWith(scopePattern) && scopeName[scopePattern.length] === ".";
    }
    class StyleAttributes {
        fontStyle;
        foregroundId;
        backgroundId;
        constructor(fontStyle, foregroundId, backgroundId){
            this.fontStyle = fontStyle;
            this.foregroundId = foregroundId;
            this.backgroundId = backgroundId;
        }
    }
    function parseTheme(source) {
        if (!source) {
            return [];
        }
        if (!source.settings || !Array.isArray(source.settings)) {
            return [];
        }
        let settings = source.settings;
        let result = [], resultLen = 0;
        for(let i = 0, len = settings.length; i < len; i++){
            let entry = settings[i];
            if (!entry.settings) {
                continue;
            }
            let scopes;
            if (typeof entry.scope === "string") {
                let _scope = entry.scope;
                _scope = _scope.replace(/^[,]+/, "");
                _scope = _scope.replace(/[,]+$/, "");
                scopes = _scope.split(",");
            } else if (Array.isArray(entry.scope)) {
                scopes = entry.scope;
            } else {
                scopes = [
                    ""
                ];
            }
            let fontStyle = -1;
            if (typeof entry.settings.fontStyle === "string") {
                fontStyle = 0;
                let segments = entry.settings.fontStyle.split(" ");
                for(let j = 0, lenJ = segments.length; j < lenJ; j++){
                    let segment = segments[j];
                    switch(segment){
                        case "italic":
                            fontStyle = fontStyle | 1;
                            break;
                        case "bold":
                            fontStyle = fontStyle | 2;
                            break;
                        case "underline":
                            fontStyle = fontStyle | 4;
                            break;
                        case "strikethrough":
                            fontStyle = fontStyle | 8;
                            break;
                    }
                }
            }
            let foreground = null;
            if (typeof entry.settings.foreground === "string" && isValidHexColor(entry.settings.foreground)) {
                foreground = entry.settings.foreground;
            }
            let background = null;
            if (typeof entry.settings.background === "string" && isValidHexColor(entry.settings.background)) {
                background = entry.settings.background;
            }
            for(let j = 0, lenJ = scopes.length; j < lenJ; j++){
                let _scope = scopes[j].trim();
                let segments = _scope.split(" ");
                let scope = segments[segments.length - 1];
                let parentScopes = null;
                if (segments.length > 1) {
                    parentScopes = segments.slice(0, segments.length - 1);
                    parentScopes.reverse();
                }
                result[resultLen++] = new ParsedThemeRule(scope, parentScopes, i, fontStyle, foreground, background);
            }
        }
        return result;
    }
    class ParsedThemeRule {
        scope;
        parentScopes;
        index;
        fontStyle;
        foreground;
        background;
        constructor(scope, parentScopes, index, fontStyle, foreground, background){
            this.scope = scope;
            this.parentScopes = parentScopes;
            this.index = index;
            this.fontStyle = fontStyle;
            this.foreground = foreground;
            this.background = background;
        }
    }
    function resolveParsedThemeRules(parsedThemeRules, _colorMap) {
        parsedThemeRules.sort((a, b)=>{
            let r = strcmp(a.scope, b.scope);
            if (r !== 0) {
                return r;
            }
            r = strArrCmp(a.parentScopes, b.parentScopes);
            if (r !== 0) {
                return r;
            }
            return a.index - b.index;
        });
        let defaultFontStyle = 0;
        let defaultForeground = "#000000";
        let defaultBackground = "#ffffff";
        while(parsedThemeRules.length >= 1 && parsedThemeRules[0].scope === ""){
            let incomingDefaults = parsedThemeRules.shift();
            if (incomingDefaults.fontStyle !== -1) {
                defaultFontStyle = incomingDefaults.fontStyle;
            }
            if (incomingDefaults.foreground !== null) {
                defaultForeground = incomingDefaults.foreground;
            }
            if (incomingDefaults.background !== null) {
                defaultBackground = incomingDefaults.background;
            }
        }
        let colorMap = new ColorMap(_colorMap);
        let defaults = new StyleAttributes(defaultFontStyle, colorMap.getId(defaultForeground), colorMap.getId(defaultBackground));
        let root = new ThemeTrieElement(new ThemeTrieElementRule(0, null, -1, 0, 0), []);
        for(let i = 0, len = parsedThemeRules.length; i < len; i++){
            let rule = parsedThemeRules[i];
            root.insert(0, rule.scope, rule.parentScopes, rule.fontStyle, colorMap.getId(rule.foreground), colorMap.getId(rule.background));
        }
        return new Theme(colorMap, defaults, root);
    }
    class ColorMap {
        _isFrozen;
        _lastColorId;
        _id2color;
        _color2id;
        constructor(_colorMap){
            this._lastColorId = 0;
            this._id2color = [];
            this._color2id = Object.create(null);
            if (Array.isArray(_colorMap)) {
                this._isFrozen = true;
                for(let i = 0, len = _colorMap.length; i < len; i++){
                    this._color2id[_colorMap[i]] = i;
                    this._id2color[i] = _colorMap[i];
                }
            } else {
                this._isFrozen = false;
            }
        }
        getId(color) {
            if (color === null) {
                return 0;
            }
            color = color.toUpperCase();
            let value = this._color2id[color];
            if (value) {
                return value;
            }
            if (this._isFrozen) {
                throw new Error(`Missing color in color map - ${color}`);
            }
            value = ++this._lastColorId;
            this._color2id[color] = value;
            this._id2color[value] = color;
            return value;
        }
        getColorMap() {
            return this._id2color.slice(0);
        }
    }
    class ThemeTrieElementRule {
        scopeDepth;
        parentScopes;
        fontStyle;
        foreground;
        background;
        constructor(scopeDepth, parentScopes, fontStyle, foreground, background){
            this.scopeDepth = scopeDepth;
            this.parentScopes = parentScopes;
            this.fontStyle = fontStyle;
            this.foreground = foreground;
            this.background = background;
        }
        clone() {
            return new ThemeTrieElementRule(this.scopeDepth, this.parentScopes, this.fontStyle, this.foreground, this.background);
        }
        static cloneArr(arr) {
            let r = [];
            for(let i = 0, len = arr.length; i < len; i++){
                r[i] = arr[i].clone();
            }
            return r;
        }
        acceptOverwrite(scopeDepth, fontStyle, foreground, background) {
            if (this.scopeDepth > scopeDepth) {
                console.log("how did this happen?");
            } else {
                this.scopeDepth = scopeDepth;
            }
            if (fontStyle !== -1) {
                this.fontStyle = fontStyle;
            }
            if (foreground !== 0) {
                this.foreground = foreground;
            }
            if (background !== 0) {
                this.background = background;
            }
        }
    }
    class ThemeTrieElement {
        _mainRule;
        _children;
        _rulesWithParentScopes;
        constructor(_mainRule, rulesWithParentScopes = [], _children = {}){
            this._mainRule = _mainRule;
            this._children = _children;
            this._rulesWithParentScopes = rulesWithParentScopes;
        }
        static _sortBySpecificity(arr) {
            if (arr.length === 1) {
                return arr;
            }
            arr.sort(this._cmpBySpecificity);
            return arr;
        }
        static _cmpBySpecificity(a, b) {
            if (a.scopeDepth === b.scopeDepth) {
                const aParentScopes = a.parentScopes;
                const bParentScopes = b.parentScopes;
                let aParentScopesLen = aParentScopes === null ? 0 : aParentScopes.length;
                let bParentScopesLen = bParentScopes === null ? 0 : bParentScopes.length;
                if (aParentScopesLen === bParentScopesLen) {
                    for(let i = 0; i < aParentScopesLen; i++){
                        const aLen = aParentScopes[i].length;
                        const bLen = bParentScopes[i].length;
                        if (aLen !== bLen) {
                            return bLen - aLen;
                        }
                    }
                }
                return bParentScopesLen - aParentScopesLen;
            }
            return b.scopeDepth - a.scopeDepth;
        }
        match(scope) {
            if (scope === "") {
                return ThemeTrieElement._sortBySpecificity([].concat(this._mainRule).concat(this._rulesWithParentScopes));
            }
            let dotIndex = scope.indexOf(".");
            let head;
            let tail;
            if (dotIndex === -1) {
                head = scope;
                tail = "";
            } else {
                head = scope.substring(0, dotIndex);
                tail = scope.substring(dotIndex + 1);
            }
            if (this._children.hasOwnProperty(head)) {
                return this._children[head].match(tail);
            }
            return ThemeTrieElement._sortBySpecificity([].concat(this._mainRule).concat(this._rulesWithParentScopes));
        }
        insert(scopeDepth, scope, parentScopes, fontStyle, foreground, background) {
            if (scope === "") {
                this._doInsertHere(scopeDepth, parentScopes, fontStyle, foreground, background);
                return;
            }
            let dotIndex = scope.indexOf(".");
            let head;
            let tail;
            if (dotIndex === -1) {
                head = scope;
                tail = "";
            } else {
                head = scope.substring(0, dotIndex);
                tail = scope.substring(dotIndex + 1);
            }
            let child;
            if (this._children.hasOwnProperty(head)) {
                child = this._children[head];
            } else {
                child = new ThemeTrieElement(this._mainRule.clone(), ThemeTrieElementRule.cloneArr(this._rulesWithParentScopes));
                this._children[head] = child;
            }
            child.insert(scopeDepth + 1, tail, parentScopes, fontStyle, foreground, background);
        }
        _doInsertHere(scopeDepth, parentScopes, fontStyle, foreground, background) {
            if (parentScopes === null) {
                this._mainRule.acceptOverwrite(scopeDepth, fontStyle, foreground, background);
                return;
            }
            for(let i = 0, len = this._rulesWithParentScopes.length; i < len; i++){
                let rule = this._rulesWithParentScopes[i];
                if (strArrCmp(rule.parentScopes, parentScopes) === 0) {
                    rule.acceptOverwrite(scopeDepth, fontStyle, foreground, background);
                    return;
                }
            }
            if (fontStyle === -1) {
                fontStyle = this._mainRule.fontStyle;
            }
            if (foreground === 0) {
                foreground = this._mainRule.foreground;
            }
            if (background === 0) {
                background = this._mainRule.background;
            }
            this._rulesWithParentScopes.push(new ThemeTrieElementRule(scopeDepth, parentScopes, fontStyle, foreground, background));
        }
    }
    class BasicScopeAttributes {
        languageId;
        tokenType;
        constructor(languageId, tokenType){
            this.languageId = languageId;
            this.tokenType = tokenType;
        }
    }
    class BasicScopeAttributesProvider {
        _defaultAttributes;
        _embeddedLanguagesMatcher;
        constructor(initialLanguageId, embeddedLanguages){
            this._defaultAttributes = new BasicScopeAttributes(initialLanguageId, 8);
            this._embeddedLanguagesMatcher = new ScopeMatcher(Object.entries(embeddedLanguages || {}));
        }
        getDefaultAttributes() {
            return this._defaultAttributes;
        }
        getBasicScopeAttributes(scopeName) {
            if (scopeName === null) {
                return BasicScopeAttributesProvider._NULL_SCOPE_METADATA;
            }
            return this._getBasicScopeAttributes.get(scopeName);
        }
        static _NULL_SCOPE_METADATA = new BasicScopeAttributes(0, 0);
        _getBasicScopeAttributes = new CachedFn((scopeName)=>{
            const languageId = this._scopeToLanguage(scopeName);
            const standardTokenType = this._toStandardTokenType(scopeName);
            return new BasicScopeAttributes(languageId, standardTokenType);
        });
        _scopeToLanguage(scope) {
            return this._embeddedLanguagesMatcher.match(scope) || 0;
        }
        _toStandardTokenType(scopeName) {
            const m = scopeName.match(BasicScopeAttributesProvider.STANDARD_TOKEN_TYPE_REGEXP);
            if (!m) {
                return 8;
            }
            switch(m[1]){
                case "comment":
                    return 1;
                case "string":
                    return 2;
                case "regex":
                    return 3;
                case "meta.embedded":
                    return 0;
            }
            throw new Error("Unexpected match for standard token type!");
        }
        static STANDARD_TOKEN_TYPE_REGEXP = /\b(comment|string|regex|meta\.embedded)\b/;
    }
    class ScopeMatcher {
        values;
        scopesRegExp;
        constructor(values){
            if (values.length === 0) {
                this.values = null;
                this.scopesRegExp = null;
            } else {
                this.values = new Map(values);
                const escapedScopes = values.map(([scopeName, value])=>escapeRegExpCharacters(scopeName));
                escapedScopes.sort();
                escapedScopes.reverse();
                this.scopesRegExp = new RegExp(`^((${escapedScopes.join(")|(")}))($|\\.)`, "");
            }
        }
        match(scope) {
            if (!this.scopesRegExp) {
                return void 0;
            }
            const m = scope.match(this.scopesRegExp);
            if (!m) {
                return void 0;
            }
            return this.values.get(m[1]);
        }
    }
    class TokenizeStringResult {
        stack;
        stoppedEarly;
        constructor(stack, stoppedEarly){
            this.stack = stack;
            this.stoppedEarly = stoppedEarly;
        }
    }
    function _tokenizeString(grammar, lineText, isFirstLine, linePos, stack, lineTokens, checkWhileConditions, timeLimit) {
        const lineLength = lineText.content.length;
        let STOP = false;
        let anchorPosition = -1;
        if (checkWhileConditions) {
            const whileCheckResult = _checkWhileConditions(grammar, lineText, isFirstLine, linePos, stack, lineTokens);
            stack = whileCheckResult.stack;
            linePos = whileCheckResult.linePos;
            isFirstLine = whileCheckResult.isFirstLine;
            anchorPosition = whileCheckResult.anchorPosition;
        }
        const startTime = Date.now();
        while(!STOP){
            if (timeLimit !== 0) {
                const elapsedTime = Date.now() - startTime;
                if (elapsedTime > timeLimit) {
                    return new TokenizeStringResult(stack, true);
                }
            }
            scanNext();
        }
        return new TokenizeStringResult(stack, false);
        function scanNext() {
            const r = matchRuleOrInjections(grammar, lineText, isFirstLine, linePos, stack, anchorPosition);
            if (!r) {
                lineTokens.produce(stack, lineLength);
                STOP = true;
                return;
            }
            const captureIndices = r.captureIndices;
            const matchedRuleId = r.matchedRuleId;
            const hasAdvanced = captureIndices && captureIndices.length > 0 ? captureIndices[0].end > linePos : false;
            if (matchedRuleId === endRuleId) {
                const poppedRule = stack.getRule(grammar);
                lineTokens.produce(stack, captureIndices[0].start);
                stack = stack.withContentNameScopesList(stack.nameScopesList);
                handleCaptures(grammar, lineText, isFirstLine, stack, lineTokens, poppedRule.endCaptures, captureIndices);
                lineTokens.produce(stack, captureIndices[0].end);
                const popped = stack;
                stack = stack.parent;
                anchorPosition = popped.getAnchorPos();
                if (!hasAdvanced && popped.getEnterPos() === linePos) {
                    stack = popped;
                    lineTokens.produce(stack, lineLength);
                    STOP = true;
                    return;
                }
            } else {
                const _rule = grammar.getRule(matchedRuleId);
                lineTokens.produce(stack, captureIndices[0].start);
                const beforePush = stack;
                const scopeName = _rule.getName(lineText.content, captureIndices);
                const nameScopesList = stack.contentNameScopesList.pushAttributed(scopeName, grammar);
                stack = stack.push(matchedRuleId, linePos, anchorPosition, captureIndices[0].end === lineLength, null, nameScopesList, nameScopesList);
                if (_rule instanceof BeginEndRule) {
                    const pushedRule = _rule;
                    handleCaptures(grammar, lineText, isFirstLine, stack, lineTokens, pushedRule.beginCaptures, captureIndices);
                    lineTokens.produce(stack, captureIndices[0].end);
                    anchorPosition = captureIndices[0].end;
                    const contentName = pushedRule.getContentName(lineText.content, captureIndices);
                    const contentNameScopesList = nameScopesList.pushAttributed(contentName, grammar);
                    stack = stack.withContentNameScopesList(contentNameScopesList);
                    if (pushedRule.endHasBackReferences) {
                        stack = stack.withEndRule(pushedRule.getEndWithResolvedBackReferences(lineText.content, captureIndices));
                    }
                    if (!hasAdvanced && beforePush.hasSameRuleAs(stack)) {
                        stack = stack.pop();
                        lineTokens.produce(stack, lineLength);
                        STOP = true;
                        return;
                    }
                } else if (_rule instanceof BeginWhileRule) {
                    const pushedRule = _rule;
                    handleCaptures(grammar, lineText, isFirstLine, stack, lineTokens, pushedRule.beginCaptures, captureIndices);
                    lineTokens.produce(stack, captureIndices[0].end);
                    anchorPosition = captureIndices[0].end;
                    const contentName = pushedRule.getContentName(lineText.content, captureIndices);
                    const contentNameScopesList = nameScopesList.pushAttributed(contentName, grammar);
                    stack = stack.withContentNameScopesList(contentNameScopesList);
                    if (pushedRule.whileHasBackReferences) {
                        stack = stack.withEndRule(pushedRule.getWhileWithResolvedBackReferences(lineText.content, captureIndices));
                    }
                    if (!hasAdvanced && beforePush.hasSameRuleAs(stack)) {
                        stack = stack.pop();
                        lineTokens.produce(stack, lineLength);
                        STOP = true;
                        return;
                    }
                } else {
                    const matchingRule = _rule;
                    handleCaptures(grammar, lineText, isFirstLine, stack, lineTokens, matchingRule.captures, captureIndices);
                    lineTokens.produce(stack, captureIndices[0].end);
                    stack = stack.pop();
                    if (!hasAdvanced) {
                        stack = stack.safePop();
                        lineTokens.produce(stack, lineLength);
                        STOP = true;
                        return;
                    }
                }
            }
            if (captureIndices[0].end > linePos) {
                linePos = captureIndices[0].end;
                isFirstLine = false;
            }
        }
    }
    function _checkWhileConditions(grammar, lineText, isFirstLine, linePos, stack, lineTokens) {
        let anchorPosition = stack.beginRuleCapturedEOL ? 0 : -1;
        const whileRules = [];
        for(let node = stack; node; node = node.pop()){
            const nodeRule = node.getRule(grammar);
            if (nodeRule instanceof BeginWhileRule) {
                whileRules.push({
                    rule: nodeRule,
                    stack: node
                });
            }
        }
        for(let whileRule = whileRules.pop(); whileRule; whileRule = whileRules.pop()){
            const { ruleScanner, findOptions } = prepareRuleWhileSearch(whileRule.rule, grammar, whileRule.stack.endRule, isFirstLine, linePos === anchorPosition);
            const r = ruleScanner.findNextMatchSync(lineText, linePos, findOptions);
            if (r) {
                const matchedRuleId = r.ruleId;
                if (matchedRuleId !== whileRuleId) {
                    stack = whileRule.stack.pop();
                    break;
                }
                if (r.captureIndices && r.captureIndices.length) {
                    lineTokens.produce(whileRule.stack, r.captureIndices[0].start);
                    handleCaptures(grammar, lineText, isFirstLine, whileRule.stack, lineTokens, whileRule.rule.whileCaptures, r.captureIndices);
                    lineTokens.produce(whileRule.stack, r.captureIndices[0].end);
                    anchorPosition = r.captureIndices[0].end;
                    if (r.captureIndices[0].end > linePos) {
                        linePos = r.captureIndices[0].end;
                        isFirstLine = false;
                    }
                }
            } else {
                stack = whileRule.stack.pop();
                break;
            }
        }
        return {
            stack,
            linePos,
            anchorPosition,
            isFirstLine
        };
    }
    function matchRuleOrInjections(grammar, lineText, isFirstLine, linePos, stack, anchorPosition) {
        const matchResult = matchRule(grammar, lineText, isFirstLine, linePos, stack, anchorPosition);
        const injections = grammar.getInjections();
        if (injections.length === 0) {
            return matchResult;
        }
        const injectionResult = matchInjections(injections, grammar, lineText, isFirstLine, linePos, stack, anchorPosition);
        if (!injectionResult) {
            return matchResult;
        }
        if (!matchResult) {
            return injectionResult;
        }
        const matchResultScore = matchResult.captureIndices[0].start;
        const injectionResultScore = injectionResult.captureIndices[0].start;
        if (injectionResultScore < matchResultScore || injectionResult.priorityMatch && injectionResultScore === matchResultScore) {
            return injectionResult;
        }
        return matchResult;
    }
    function matchRule(grammar, lineText, isFirstLine, linePos, stack, anchorPosition) {
        const rule = stack.getRule(grammar);
        const { ruleScanner, findOptions } = prepareRuleSearch(rule, grammar, stack.endRule, isFirstLine, linePos === anchorPosition);
        const r = ruleScanner.findNextMatchSync(lineText, linePos, findOptions);
        if (r) {
            return {
                captureIndices: r.captureIndices,
                matchedRuleId: r.ruleId
            };
        }
        return null;
    }
    function matchInjections(injections, grammar, lineText, isFirstLine, linePos, stack, anchorPosition) {
        let bestMatchRating = Number.MAX_VALUE;
        let bestMatchCaptureIndices = null;
        let bestMatchRuleId;
        let bestMatchResultPriority = 0;
        const scopes = stack.contentNameScopesList.getScopeNames();
        for(let i = 0, len = injections.length; i < len; i++){
            const injection = injections[i];
            if (!injection.matcher(scopes)) {
                continue;
            }
            const rule = grammar.getRule(injection.ruleId);
            const { ruleScanner, findOptions } = prepareRuleSearch(rule, grammar, null, isFirstLine, linePos === anchorPosition);
            const matchResult = ruleScanner.findNextMatchSync(lineText, linePos, findOptions);
            if (!matchResult) {
                continue;
            }
            const matchRating = matchResult.captureIndices[0].start;
            if (matchRating >= bestMatchRating) {
                continue;
            }
            bestMatchRating = matchRating;
            bestMatchCaptureIndices = matchResult.captureIndices;
            bestMatchRuleId = matchResult.ruleId;
            bestMatchResultPriority = injection.priority;
            if (bestMatchRating === linePos) {
                break;
            }
        }
        if (bestMatchCaptureIndices) {
            return {
                priorityMatch: bestMatchResultPriority === -1,
                captureIndices: bestMatchCaptureIndices,
                matchedRuleId: bestMatchRuleId
            };
        }
        return null;
    }
    function prepareRuleSearch(rule, grammar, endRegexSource, allowA, allowG) {
        const ruleScanner = rule.compileAG(grammar, endRegexSource, allowA, allowG);
        return {
            ruleScanner,
            findOptions: 0
        };
    }
    function prepareRuleWhileSearch(rule, grammar, endRegexSource, allowA, allowG) {
        const ruleScanner = rule.compileWhileAG(grammar, endRegexSource, allowA, allowG);
        return {
            ruleScanner,
            findOptions: 0
        };
    }
    function handleCaptures(grammar, lineText, isFirstLine, stack, lineTokens, captures, captureIndices) {
        if (captures.length === 0) {
            return;
        }
        const lineTextContent = lineText.content;
        const len = Math.min(captures.length, captureIndices.length);
        const localStack = [];
        const maxEnd = captureIndices[0].end;
        for(let i = 0; i < len; i++){
            const captureRule = captures[i];
            if (captureRule === null) {
                continue;
            }
            const captureIndex = captureIndices[i];
            if (captureIndex.length === 0) {
                continue;
            }
            if (captureIndex.start > maxEnd) {
                break;
            }
            while(localStack.length > 0 && localStack[localStack.length - 1].endPos <= captureIndex.start){
                lineTokens.produceFromScopes(localStack[localStack.length - 1].scopes, localStack[localStack.length - 1].endPos);
                localStack.pop();
            }
            if (localStack.length > 0) {
                lineTokens.produceFromScopes(localStack[localStack.length - 1].scopes, captureIndex.start);
            } else {
                lineTokens.produce(stack, captureIndex.start);
            }
            if (captureRule.retokenizeCapturedWithRuleId) {
                const scopeName = captureRule.getName(lineTextContent, captureIndices);
                const nameScopesList = stack.contentNameScopesList.pushAttributed(scopeName, grammar);
                const contentName = captureRule.getContentName(lineTextContent, captureIndices);
                const contentNameScopesList = nameScopesList.pushAttributed(contentName, grammar);
                const stackClone = stack.push(captureRule.retokenizeCapturedWithRuleId, captureIndex.start, -1, false, null, nameScopesList, contentNameScopesList);
                const onigSubStr = grammar.createOnigString(lineTextContent.substring(0, captureIndex.end));
                _tokenizeString(grammar, onigSubStr, isFirstLine && captureIndex.start === 0, captureIndex.start, stackClone, lineTokens, false, 0);
                disposeOnigString(onigSubStr);
                continue;
            }
            const captureRuleScopeName = captureRule.getName(lineTextContent, captureIndices);
            if (captureRuleScopeName !== null) {
                const base = localStack.length > 0 ? localStack[localStack.length - 1].scopes : stack.contentNameScopesList;
                const captureRuleScopesList = base.pushAttributed(captureRuleScopeName, grammar);
                localStack.push(new LocalStackElement(captureRuleScopesList, captureIndex.end));
            }
        }
        while(localStack.length > 0){
            lineTokens.produceFromScopes(localStack[localStack.length - 1].scopes, localStack[localStack.length - 1].endPos);
            localStack.pop();
        }
    }
    class LocalStackElement {
        scopes;
        endPos;
        constructor(scopes, endPos){
            this.scopes = scopes;
            this.endPos = endPos;
        }
    }
    function createGrammar(scopeName, grammar, initialLanguage, embeddedLanguages, tokenTypes, balancedBracketSelectors, grammarRepository, onigLib) {
        return new Grammar(scopeName, grammar, initialLanguage, embeddedLanguages, tokenTypes, balancedBracketSelectors, grammarRepository, onigLib);
    }
    function collectInjections(result, selector, rule, ruleFactoryHelper, grammar) {
        const matchers = createMatchers(selector, nameMatcher);
        const ruleId = RuleFactory.getCompiledRuleId(rule, ruleFactoryHelper, grammar.repository);
        for (const matcher of matchers){
            result.push({
                debugSelector: selector,
                matcher: matcher.matcher,
                ruleId,
                grammar,
                priority: matcher.priority
            });
        }
    }
    function nameMatcher(identifers, scopes) {
        if (scopes.length < identifers.length) {
            return false;
        }
        let lastIndex = 0;
        return identifers.every((identifier)=>{
            for(let i = lastIndex; i < scopes.length; i++){
                if (scopesAreMatching(scopes[i], identifier)) {
                    lastIndex = i + 1;
                    return true;
                }
            }
            return false;
        });
    }
    function scopesAreMatching(thisScopeName, scopeName) {
        if (!thisScopeName) {
            return false;
        }
        if (thisScopeName === scopeName) {
            return true;
        }
        const len = scopeName.length;
        return thisScopeName.length > len && thisScopeName.substr(0, len) === scopeName && thisScopeName[len] === ".";
    }
    class Grammar {
        _rootScopeName;
        balancedBracketSelectors;
        _onigLib;
        _rootId;
        _lastRuleId;
        _ruleId2desc;
        _includedGrammars;
        _grammarRepository;
        _grammar;
        _injections;
        _basicScopeAttributesProvider;
        _tokenTypeMatchers;
        get themeProvider() {
            return this._grammarRepository;
        }
        constructor(_rootScopeName, grammar, initialLanguage, embeddedLanguages, tokenTypes, balancedBracketSelectors, grammarRepository, _onigLib){
            this._rootScopeName = _rootScopeName;
            this.balancedBracketSelectors = balancedBracketSelectors;
            this._onigLib = _onigLib;
            this._basicScopeAttributesProvider = new BasicScopeAttributesProvider(initialLanguage, embeddedLanguages);
            this._rootId = -1;
            this._lastRuleId = 0;
            this._ruleId2desc = [
                null
            ];
            this._includedGrammars = {};
            this._grammarRepository = grammarRepository;
            this._grammar = initGrammar(grammar, null);
            this._injections = null;
            this._tokenTypeMatchers = [];
            if (tokenTypes) {
                for (const selector of Object.keys(tokenTypes)){
                    const matchers = createMatchers(selector, nameMatcher);
                    for (const matcher of matchers){
                        this._tokenTypeMatchers.push({
                            matcher: matcher.matcher,
                            type: tokenTypes[selector]
                        });
                    }
                }
            }
        }
        dispose() {
            for (const rule of this._ruleId2desc){
                if (rule) {
                    rule.dispose();
                }
            }
        }
        createOnigScanner(sources) {
            return this._onigLib.createOnigScanner(sources);
        }
        createOnigString(sources) {
            return this._onigLib.createOnigString(sources);
        }
        getMetadataForScope(scope) {
            return this._basicScopeAttributesProvider.getBasicScopeAttributes(scope);
        }
        _collectInjections() {
            const grammarRepository = {
                lookup: (scopeName2)=>{
                    if (scopeName2 === this._rootScopeName) {
                        return this._grammar;
                    }
                    return this.getExternalGrammar(scopeName2);
                },
                injections: (scopeName2)=>{
                    return this._grammarRepository.injections(scopeName2);
                }
            };
            const result = [];
            const scopeName = this._rootScopeName;
            const grammar = grammarRepository.lookup(scopeName);
            if (grammar) {
                const rawInjections = grammar.injections;
                if (rawInjections) {
                    for(let expression in rawInjections){
                        collectInjections(result, expression, rawInjections[expression], this, grammar);
                    }
                }
                const injectionScopeNames = this._grammarRepository.injections(scopeName);
                if (injectionScopeNames) {
                    injectionScopeNames.forEach((injectionScopeName)=>{
                        const injectionGrammar = this.getExternalGrammar(injectionScopeName);
                        if (injectionGrammar) {
                            const selector = injectionGrammar.injectionSelector;
                            if (selector) {
                                collectInjections(result, selector, injectionGrammar, this, injectionGrammar);
                            }
                        }
                    });
                }
            }
            result.sort((i1, i2)=>i1.priority - i2.priority);
            return result;
        }
        getInjections() {
            if (this._injections === null) {
                this._injections = this._collectInjections();
            }
            return this._injections;
        }
        registerRule(factory) {
            const id = ++this._lastRuleId;
            const result = factory(ruleIdFromNumber(id));
            this._ruleId2desc[id] = result;
            return result;
        }
        getRule(ruleId) {
            return this._ruleId2desc[ruleIdToNumber(ruleId)];
        }
        getExternalGrammar(scopeName, repository) {
            if (this._includedGrammars[scopeName]) {
                return this._includedGrammars[scopeName];
            } else if (this._grammarRepository) {
                const rawIncludedGrammar = this._grammarRepository.lookup(scopeName);
                if (rawIncludedGrammar) {
                    this._includedGrammars[scopeName] = initGrammar(rawIncludedGrammar, repository && repository.$base);
                    return this._includedGrammars[scopeName];
                }
            }
            return void 0;
        }
        tokenizeLine(lineText, prevState, timeLimit = 0) {
            const r = this._tokenize(lineText, prevState, false, timeLimit);
            return {
                tokens: r.lineTokens.getResult(r.ruleStack, r.lineLength),
                ruleStack: r.ruleStack,
                stoppedEarly: r.stoppedEarly
            };
        }
        tokenizeLine2(lineText, prevState, timeLimit = 0) {
            const r = this._tokenize(lineText, prevState, true, timeLimit);
            return {
                tokens: r.lineTokens.getBinaryResult(r.ruleStack, r.lineLength),
                ruleStack: r.ruleStack,
                stoppedEarly: r.stoppedEarly
            };
        }
        _tokenize(lineText, prevState, emitBinaryTokens, timeLimit) {
            if (this._rootId === -1) {
                this._rootId = RuleFactory.getCompiledRuleId(this._grammar.repository.$self, this, this._grammar.repository);
                this.getInjections();
            }
            let isFirstLine;
            if (!prevState || prevState === StateStackImpl.NULL) {
                isFirstLine = true;
                const rawDefaultMetadata = this._basicScopeAttributesProvider.getDefaultAttributes();
                const defaultStyle = this.themeProvider.getDefaults();
                const defaultMetadata = EncodedTokenAttributes.set(0, rawDefaultMetadata.languageId, rawDefaultMetadata.tokenType, null, defaultStyle.fontStyle, defaultStyle.foregroundId, defaultStyle.backgroundId);
                const rootScopeName = this.getRule(this._rootId).getName(null, null);
                let scopeList;
                if (rootScopeName) {
                    scopeList = AttributedScopeStack.createRootAndLookUpScopeName(rootScopeName, defaultMetadata, this);
                } else {
                    scopeList = AttributedScopeStack.createRoot("unknown", defaultMetadata);
                }
                prevState = new StateStackImpl(null, this._rootId, -1, -1, false, null, scopeList, scopeList);
            } else {
                isFirstLine = false;
                prevState.reset();
            }
            lineText = lineText + "\n";
            const onigLineText = this.createOnigString(lineText);
            const lineLength = onigLineText.content.length;
            const lineTokens = new LineTokens(emitBinaryTokens, lineText, this._tokenTypeMatchers, this.balancedBracketSelectors);
            const r = _tokenizeString(this, onigLineText, isFirstLine, 0, prevState, lineTokens, true, timeLimit);
            disposeOnigString(onigLineText);
            return {
                lineLength,
                lineTokens,
                ruleStack: r.stack,
                stoppedEarly: r.stoppedEarly
            };
        }
    }
    function initGrammar(grammar, base) {
        grammar = clone(grammar);
        grammar.repository = grammar.repository || {};
        grammar.repository.$self = {
            $vscodeTextmateLocation: grammar.$vscodeTextmateLocation,
            patterns: grammar.patterns,
            name: grammar.scopeName
        };
        grammar.repository.$base = base || grammar.repository.$self;
        return grammar;
    }
    class AttributedScopeStack {
        parent;
        scopePath;
        tokenAttributes;
        static fromExtension(namesScopeList, contentNameScopesList) {
            let current = namesScopeList;
            let scopeNames = namesScopeList?.scopePath ?? null;
            for (const frame of contentNameScopesList){
                scopeNames = ScopeStack.push(scopeNames, frame.scopeNames);
                current = new AttributedScopeStack(current, scopeNames, frame.encodedTokenAttributes);
            }
            return current;
        }
        static createRoot(scopeName, tokenAttributes) {
            return new AttributedScopeStack(null, new ScopeStack(null, scopeName), tokenAttributes);
        }
        static createRootAndLookUpScopeName(scopeName, tokenAttributes, grammar) {
            const rawRootMetadata = grammar.getMetadataForScope(scopeName);
            const scopePath = new ScopeStack(null, scopeName);
            const rootStyle = grammar.themeProvider.themeMatch(scopePath);
            const resolvedTokenAttributes = AttributedScopeStack.mergeAttributes(tokenAttributes, rawRootMetadata, rootStyle);
            return new AttributedScopeStack(null, scopePath, resolvedTokenAttributes);
        }
        get scopeName() {
            return this.scopePath.scopeName;
        }
        constructor(parent, scopePath, tokenAttributes){
            this.parent = parent;
            this.scopePath = scopePath;
            this.tokenAttributes = tokenAttributes;
        }
        toString() {
            return this.getScopeNames().join(" ");
        }
        equals(other) {
            return AttributedScopeStack.equals(this, other);
        }
        static equals(a, b) {
            do {
                if (a === b) {
                    return true;
                }
                if (!a && !b) {
                    return true;
                }
                if (!a || !b) {
                    return false;
                }
                if (a.scopeName !== b.scopeName || a.tokenAttributes !== b.tokenAttributes) {
                    return false;
                }
                a = a.parent;
                b = b.parent;
            }while (true);
        }
        static mergeAttributes(existingTokenAttributes, basicScopeAttributes, styleAttributes) {
            let fontStyle = -1;
            let foreground = 0;
            let background = 0;
            if (styleAttributes !== null) {
                fontStyle = styleAttributes.fontStyle;
                foreground = styleAttributes.foregroundId;
                background = styleAttributes.backgroundId;
            }
            return EncodedTokenAttributes.set(existingTokenAttributes, basicScopeAttributes.languageId, basicScopeAttributes.tokenType, null, fontStyle, foreground, background);
        }
        pushAttributed(scopePath, grammar) {
            if (scopePath === null) {
                return this;
            }
            if (scopePath.indexOf(" ") === -1) {
                return AttributedScopeStack._pushAttributed(this, scopePath, grammar);
            }
            const scopes = scopePath.split(/ /g);
            let result = this;
            for (const scope of scopes){
                result = AttributedScopeStack._pushAttributed(result, scope, grammar);
            }
            return result;
        }
        static _pushAttributed(target, scopeName, grammar) {
            const rawMetadata = grammar.getMetadataForScope(scopeName);
            const newPath = target.scopePath.push(scopeName);
            const scopeThemeMatchResult = grammar.themeProvider.themeMatch(newPath);
            const metadata = AttributedScopeStack.mergeAttributes(target.tokenAttributes, rawMetadata, scopeThemeMatchResult);
            return new AttributedScopeStack(target, newPath, metadata);
        }
        getScopeNames() {
            return this.scopePath.getSegments();
        }
        getExtensionIfDefined(base) {
            const result = [];
            let self = this;
            while(self && self !== base){
                result.push({
                    encodedTokenAttributes: self.tokenAttributes,
                    scopeNames: self.scopePath.getExtensionIfDefined(self.parent?.scopePath ?? null)
                });
                self = self.parent;
            }
            return self === base ? result.reverse() : void 0;
        }
    }
    class StateStackImpl {
        parent;
        ruleId;
        beginRuleCapturedEOL;
        endRule;
        nameScopesList;
        contentNameScopesList;
        _stackElementBrand = void 0;
        static NULL = new StateStackImpl(null, 0, 0, 0, false, null, null, null);
        _enterPos;
        _anchorPos;
        depth;
        constructor(parent, ruleId, enterPos, anchorPos, beginRuleCapturedEOL, endRule, nameScopesList, contentNameScopesList){
            this.parent = parent;
            this.ruleId = ruleId;
            this.beginRuleCapturedEOL = beginRuleCapturedEOL;
            this.endRule = endRule;
            this.nameScopesList = nameScopesList;
            this.contentNameScopesList = contentNameScopesList;
            this.depth = this.parent ? this.parent.depth + 1 : 1;
            this._enterPos = enterPos;
            this._anchorPos = anchorPos;
        }
        equals(other) {
            if (other === null) {
                return false;
            }
            return StateStackImpl._equals(this, other);
        }
        static _equals(a, b) {
            if (a === b) {
                return true;
            }
            if (!this._structuralEquals(a, b)) {
                return false;
            }
            return AttributedScopeStack.equals(a.contentNameScopesList, b.contentNameScopesList);
        }
        static _structuralEquals(a, b) {
            do {
                if (a === b) {
                    return true;
                }
                if (!a && !b) {
                    return true;
                }
                if (!a || !b) {
                    return false;
                }
                if (a.depth !== b.depth || a.ruleId !== b.ruleId || a.endRule !== b.endRule) {
                    return false;
                }
                a = a.parent;
                b = b.parent;
            }while (true);
        }
        clone() {
            return this;
        }
        static _reset(el) {
            while(el){
                el._enterPos = -1;
                el._anchorPos = -1;
                el = el.parent;
            }
        }
        reset() {
            StateStackImpl._reset(this);
        }
        pop() {
            return this.parent;
        }
        safePop() {
            if (this.parent) {
                return this.parent;
            }
            return this;
        }
        push(ruleId, enterPos, anchorPos, beginRuleCapturedEOL, endRule, nameScopesList, contentNameScopesList) {
            return new StateStackImpl(this, ruleId, enterPos, anchorPos, beginRuleCapturedEOL, endRule, nameScopesList, contentNameScopesList);
        }
        getEnterPos() {
            return this._enterPos;
        }
        getAnchorPos() {
            return this._anchorPos;
        }
        getRule(grammar) {
            return grammar.getRule(this.ruleId);
        }
        toString() {
            const r = [];
            this._writeString(r, 0);
            return "[" + r.join(",") + "]";
        }
        _writeString(res, outIndex) {
            if (this.parent) {
                outIndex = this.parent._writeString(res, outIndex);
            }
            res[outIndex++] = `(${this.ruleId}, ${this.nameScopesList?.toString()}, ${this.contentNameScopesList?.toString()})`;
            return outIndex;
        }
        withContentNameScopesList(contentNameScopeStack) {
            if (this.contentNameScopesList === contentNameScopeStack) {
                return this;
            }
            return this.parent.push(this.ruleId, this._enterPos, this._anchorPos, this.beginRuleCapturedEOL, this.endRule, this.nameScopesList, contentNameScopeStack);
        }
        withEndRule(endRule) {
            if (this.endRule === endRule) {
                return this;
            }
            return new StateStackImpl(this.parent, this.ruleId, this._enterPos, this._anchorPos, this.beginRuleCapturedEOL, endRule, this.nameScopesList, this.contentNameScopesList);
        }
        hasSameRuleAs(other) {
            let el = this;
            while(el && el._enterPos === other._enterPos){
                if (el.ruleId === other.ruleId) {
                    return true;
                }
                el = el.parent;
            }
            return false;
        }
        toStateStackFrame() {
            return {
                ruleId: ruleIdToNumber(this.ruleId),
                beginRuleCapturedEOL: this.beginRuleCapturedEOL,
                endRule: this.endRule,
                nameScopesList: this.nameScopesList?.getExtensionIfDefined(this.parent?.nameScopesList ?? null) ?? [],
                contentNameScopesList: this.contentNameScopesList?.getExtensionIfDefined(this.nameScopesList) ?? []
            };
        }
        static pushFrame(self, frame) {
            const namesScopeList = AttributedScopeStack.fromExtension(self?.nameScopesList ?? null, frame.nameScopesList);
            return new StateStackImpl(self, ruleIdFromNumber(frame.ruleId), frame.enterPos ?? -1, frame.anchorPos ?? -1, frame.beginRuleCapturedEOL, frame.endRule, namesScopeList, AttributedScopeStack.fromExtension(namesScopeList, frame.contentNameScopesList));
        }
    }
    class BalancedBracketSelectors {
        balancedBracketScopes;
        unbalancedBracketScopes;
        allowAny = false;
        constructor(balancedBracketScopes, unbalancedBracketScopes){
            this.balancedBracketScopes = balancedBracketScopes.flatMap((selector)=>{
                if (selector === "*") {
                    this.allowAny = true;
                    return [];
                }
                return createMatchers(selector, nameMatcher).map((m)=>m.matcher);
            });
            this.unbalancedBracketScopes = unbalancedBracketScopes.flatMap((selector)=>createMatchers(selector, nameMatcher).map((m)=>m.matcher));
        }
        get matchesAlways() {
            return this.allowAny && this.unbalancedBracketScopes.length === 0;
        }
        get matchesNever() {
            return this.balancedBracketScopes.length === 0 && !this.allowAny;
        }
        match(scopes) {
            for (const excluder of this.unbalancedBracketScopes){
                if (excluder(scopes)) {
                    return false;
                }
            }
            for (const includer of this.balancedBracketScopes){
                if (includer(scopes)) {
                    return true;
                }
            }
            return this.allowAny;
        }
    }
    class LineTokens {
        balancedBracketSelectors;
        _emitBinaryTokens;
        _lineText;
        _tokens;
        _binaryTokens;
        _lastTokenEndIndex;
        _tokenTypeOverrides;
        constructor(emitBinaryTokens, lineText, tokenTypeOverrides, balancedBracketSelectors){
            this.balancedBracketSelectors = balancedBracketSelectors;
            this._emitBinaryTokens = emitBinaryTokens;
            this._tokenTypeOverrides = tokenTypeOverrides;
            {
                this._lineText = null;
            }
            this._tokens = [];
            this._binaryTokens = [];
            this._lastTokenEndIndex = 0;
        }
        produce(stack, endIndex) {
            this.produceFromScopes(stack.contentNameScopesList, endIndex);
        }
        produceFromScopes(scopesList, endIndex) {
            if (this._lastTokenEndIndex >= endIndex) {
                return;
            }
            if (this._emitBinaryTokens) {
                let metadata = scopesList?.tokenAttributes ?? 0;
                let containsBalancedBrackets = false;
                if (this.balancedBracketSelectors?.matchesAlways) {
                    containsBalancedBrackets = true;
                }
                if (this._tokenTypeOverrides.length > 0 || this.balancedBracketSelectors && !this.balancedBracketSelectors.matchesAlways && !this.balancedBracketSelectors.matchesNever) {
                    const scopes2 = scopesList?.getScopeNames() ?? [];
                    for (const tokenType of this._tokenTypeOverrides){
                        if (tokenType.matcher(scopes2)) {
                            metadata = EncodedTokenAttributes.set(metadata, 0, toOptionalTokenType(tokenType.type), null, -1, 0, 0);
                        }
                    }
                    if (this.balancedBracketSelectors) {
                        containsBalancedBrackets = this.balancedBracketSelectors.match(scopes2);
                    }
                }
                if (containsBalancedBrackets) {
                    metadata = EncodedTokenAttributes.set(metadata, 0, 8, containsBalancedBrackets, -1, 0, 0);
                }
                if (this._binaryTokens.length > 0 && this._binaryTokens[this._binaryTokens.length - 1] === metadata) {
                    this._lastTokenEndIndex = endIndex;
                    return;
                }
                this._binaryTokens.push(this._lastTokenEndIndex);
                this._binaryTokens.push(metadata);
                this._lastTokenEndIndex = endIndex;
                return;
            }
            const scopes = scopesList?.getScopeNames() ?? [];
            this._tokens.push({
                startIndex: this._lastTokenEndIndex,
                endIndex,
                scopes
            });
            this._lastTokenEndIndex = endIndex;
        }
        getResult(stack, lineLength) {
            if (this._tokens.length > 0 && this._tokens[this._tokens.length - 1].startIndex === lineLength - 1) {
                this._tokens.pop();
            }
            if (this._tokens.length === 0) {
                this._lastTokenEndIndex = -1;
                this.produce(stack, lineLength);
                this._tokens[this._tokens.length - 1].startIndex = 0;
            }
            return this._tokens;
        }
        getBinaryResult(stack, lineLength) {
            if (this._binaryTokens.length > 0 && this._binaryTokens[this._binaryTokens.length - 2] === lineLength - 1) {
                this._binaryTokens.pop();
                this._binaryTokens.pop();
            }
            if (this._binaryTokens.length === 0) {
                this._lastTokenEndIndex = -1;
                this.produce(stack, lineLength);
                this._binaryTokens[this._binaryTokens.length - 2] = 0;
            }
            const result = new Uint32Array(this._binaryTokens.length);
            for(let i = 0, len = this._binaryTokens.length; i < len; i++){
                result[i] = this._binaryTokens[i];
            }
            return result;
        }
    }
    class SyncRegistry {
        _onigLibPromise;
        _grammars = new Map();
        _rawGrammars = new Map();
        _injectionGrammars = new Map();
        _theme;
        constructor(theme, _onigLibPromise){
            this._onigLibPromise = _onigLibPromise;
            this._theme = theme;
        }
        dispose() {
            for (const grammar of this._grammars.values()){
                grammar.dispose();
            }
        }
        setTheme(theme) {
            this._theme = theme;
        }
        getColorMap() {
            return this._theme.getColorMap();
        }
        addGrammar(grammar, injectionScopeNames) {
            this._rawGrammars.set(grammar.scopeName, grammar);
            if (injectionScopeNames) {
                this._injectionGrammars.set(grammar.scopeName, injectionScopeNames);
            }
        }
        lookup(scopeName) {
            return this._rawGrammars.get(scopeName);
        }
        injections(targetScope) {
            return this._injectionGrammars.get(targetScope);
        }
        getDefaults() {
            return this._theme.getDefaults();
        }
        themeMatch(scopePath) {
            return this._theme.match(scopePath);
        }
        async grammarForScopeName(scopeName, initialLanguage, embeddedLanguages, tokenTypes, balancedBracketSelectors) {
            if (!this._grammars.has(scopeName)) {
                let rawGrammar = this._rawGrammars.get(scopeName);
                if (!rawGrammar) {
                    return null;
                }
                this._grammars.set(scopeName, createGrammar(scopeName, rawGrammar, initialLanguage, embeddedLanguages, tokenTypes, balancedBracketSelectors, this, await this._onigLibPromise));
            }
            return this._grammars.get(scopeName);
        }
    }
    let Registry$1 = class Registry {
        _options;
        _syncRegistry;
        _ensureGrammarCache;
        constructor(options){
            this._options = options;
            this._syncRegistry = new SyncRegistry(Theme.createFromRawTheme(options.theme, options.colorMap), options.onigLib);
            this._ensureGrammarCache = new Map();
        }
        dispose() {
            this._syncRegistry.dispose();
        }
        setTheme(theme, colorMap) {
            this._syncRegistry.setTheme(Theme.createFromRawTheme(theme, colorMap));
        }
        getColorMap() {
            return this._syncRegistry.getColorMap();
        }
        loadGrammarWithEmbeddedLanguages(initialScopeName, initialLanguage, embeddedLanguages) {
            return this.loadGrammarWithConfiguration(initialScopeName, initialLanguage, {
                embeddedLanguages
            });
        }
        loadGrammarWithConfiguration(initialScopeName, initialLanguage, configuration) {
            return this._loadGrammar(initialScopeName, initialLanguage, configuration.embeddedLanguages, configuration.tokenTypes, new BalancedBracketSelectors(configuration.balancedBracketSelectors || [], configuration.unbalancedBracketSelectors || []));
        }
        loadGrammar(initialScopeName) {
            return this._loadGrammar(initialScopeName, 0, null, null, null);
        }
        async _loadGrammar(initialScopeName, initialLanguage, embeddedLanguages, tokenTypes, balancedBracketSelectors) {
            const dependencyProcessor = new ScopeDependencyProcessor(this._syncRegistry, initialScopeName);
            while(dependencyProcessor.Q.length > 0){
                await Promise.all(dependencyProcessor.Q.map((request)=>this._loadSingleGrammar(request.scopeName)));
                dependencyProcessor.processQueue();
            }
            return this._grammarForScopeName(initialScopeName, initialLanguage, embeddedLanguages, tokenTypes, balancedBracketSelectors);
        }
        async _loadSingleGrammar(scopeName) {
            if (!this._ensureGrammarCache.has(scopeName)) {
                this._ensureGrammarCache.set(scopeName, this._doLoadSingleGrammar(scopeName));
            }
            return this._ensureGrammarCache.get(scopeName);
        }
        async _doLoadSingleGrammar(scopeName) {
            const grammar = await this._options.loadGrammar(scopeName);
            if (grammar) {
                const injections = typeof this._options.getInjections === "function" ? this._options.getInjections(scopeName) : void 0;
                this._syncRegistry.addGrammar(grammar, injections);
            }
        }
        async addGrammar(rawGrammar, injections = [], initialLanguage = 0, embeddedLanguages = null) {
            this._syncRegistry.addGrammar(rawGrammar, injections);
            return await this._grammarForScopeName(rawGrammar.scopeName, initialLanguage, embeddedLanguages);
        }
        _grammarForScopeName(scopeName, initialLanguage = 0, embeddedLanguages = null, tokenTypes = null, balancedBracketSelectors = null) {
            return this._syncRegistry.grammarForScopeName(scopeName, initialLanguage, embeddedLanguages, tokenTypes, balancedBracketSelectors);
        }
    };
    const INITIAL = StateStackImpl.NULL;
    const MetadataConsts = {
        LANGUAGEID_MASK: 255,
        TOKEN_TYPE_MASK: 768,
        BALANCED_BRACKETS_MASK: 1024,
        FONT_STYLE_MASK: 14336,
        FOREGROUND_MASK: 8372224,
        BACKGROUND_MASK: 4286578688,
        LANGUAGEID_OFFSET: 0,
        TOKEN_TYPE_OFFSET: 8,
        BALANCED_BRACKETS_OFFSET: 10,
        FONT_STYLE_OFFSET: 11,
        FOREGROUND_OFFSET: 15,
        BACKGROUND_OFFSET: 24
    };
    class StackElementMetadata {
        static toBinaryStr(metadata) {
            let r = metadata.toString(2);
            while(r.length < 32)r = `0${r}`;
            return r;
        }
        static getLanguageId(metadata) {
            return (metadata & MetadataConsts.LANGUAGEID_MASK) >>> MetadataConsts.LANGUAGEID_OFFSET;
        }
        static getTokenType(metadata) {
            return (metadata & MetadataConsts.TOKEN_TYPE_MASK) >>> MetadataConsts.TOKEN_TYPE_OFFSET;
        }
        static getFontStyle(metadata) {
            return (metadata & MetadataConsts.FONT_STYLE_MASK) >>> MetadataConsts.FONT_STYLE_OFFSET;
        }
        static getForeground(metadata) {
            return (metadata & MetadataConsts.FOREGROUND_MASK) >>> MetadataConsts.FOREGROUND_OFFSET;
        }
        static getBackground(metadata) {
            return (metadata & MetadataConsts.BACKGROUND_MASK) >>> MetadataConsts.BACKGROUND_OFFSET;
        }
        static containsBalancedBrackets(metadata) {
            return (metadata & MetadataConsts.BALANCED_BRACKETS_MASK) !== 0;
        }
        static set(metadata, languageId, tokenType, fontStyle, foreground, background) {
            let _languageId = StackElementMetadata.getLanguageId(metadata);
            let _tokenType = StackElementMetadata.getTokenType(metadata);
            let _fontStyle = StackElementMetadata.getFontStyle(metadata);
            let _foreground = StackElementMetadata.getForeground(metadata);
            let _background = StackElementMetadata.getBackground(metadata);
            const _containsBalancedBracketsBit = StackElementMetadata.containsBalancedBrackets(metadata) ? 1 : 0;
            if (languageId !== 0) _languageId = languageId;
            if (tokenType !== 0) {
                _tokenType = tokenType === 8 ? 0 : tokenType;
            }
            if (fontStyle !== FontStyle.NotSet) _fontStyle = fontStyle;
            if (foreground !== 0) _foreground = foreground;
            if (background !== 0) _background = background;
            return (_languageId << MetadataConsts.LANGUAGEID_OFFSET | _tokenType << MetadataConsts.TOKEN_TYPE_OFFSET | _fontStyle << MetadataConsts.FONT_STYLE_OFFSET | _containsBalancedBracketsBit << MetadataConsts.BALANCED_BRACKETS_OFFSET | _foreground << MetadataConsts.FOREGROUND_OFFSET | _background << MetadataConsts.BACKGROUND_OFFSET) >>> 0;
        }
    }
    function toArray(x) {
        return Array.isArray(x) ? x : [
            x
        ];
    }
    function splitLines(code, preserveEnding = false) {
        const parts = code.split(/(\r?\n)/g);
        let index = 0;
        const lines = [];
        for(let i = 0; i < parts.length; i += 2){
            const line = preserveEnding ? parts[i] + (parts[i + 1] || '') : parts[i];
            lines.push([
                line,
                index
            ]);
            index += parts[i].length;
            index += parts[i + 1]?.length || 0;
        }
        return lines;
    }
    function isPlainLang(lang) {
        return !lang || [
            'plaintext',
            'txt',
            'text',
            'plain'
        ].includes(lang);
    }
    function isSpecialLang(lang) {
        return lang === 'ansi' || isPlainLang(lang);
    }
    function isNoneTheme(theme) {
        return theme === 'none';
    }
    function isSpecialTheme(theme) {
        return isNoneTheme(theme);
    }
    function addClassToHast(node, className) {
        if (!className) return node;
        node.properties ||= {};
        node.properties.class ||= [];
        if (typeof node.properties.class === 'string') node.properties.class = node.properties.class.split(/\s+/g);
        if (!Array.isArray(node.properties.class)) node.properties.class = [];
        const targets = Array.isArray(className) ? className : className.split(/\s+/g);
        for (const c of targets){
            if (c && !node.properties.class.includes(c)) node.properties.class.push(c);
        }
        return node;
    }
    function splitToken(token, offsets) {
        let lastOffset = 0;
        const tokens = [];
        for (const offset of offsets){
            if (offset > lastOffset) {
                tokens.push({
                    ...token,
                    content: token.content.slice(lastOffset, offset),
                    offset: token.offset + lastOffset
                });
            }
            lastOffset = offset;
        }
        if (lastOffset < token.content.length) {
            tokens.push({
                ...token,
                content: token.content.slice(lastOffset),
                offset: token.offset + lastOffset
            });
        }
        return tokens;
    }
    function splitTokens(tokens, breakpoints) {
        const sorted = Array.from(breakpoints instanceof Set ? breakpoints : new Set(breakpoints)).sort((a, b)=>a - b);
        if (!sorted.length) return tokens;
        return tokens.map((line)=>{
            return line.flatMap((token)=>{
                const breakpointsInToken = sorted.filter((i)=>token.offset < i && i < token.offset + token.content.length).map((i)=>i - token.offset).sort((a, b)=>a - b);
                if (!breakpointsInToken.length) return token;
                return splitToken(token, breakpointsInToken);
            });
        });
    }
    function resolveColorReplacements(theme, options) {
        const replacements = typeof theme === 'string' ? {} : {
            ...theme.colorReplacements
        };
        const themeName = typeof theme === 'string' ? theme : theme.name;
        for (const [key, value] of Object.entries(options?.colorReplacements || {})){
            if (typeof value === 'string') replacements[key] = value;
            else if (key === themeName) Object.assign(replacements, value);
        }
        return replacements;
    }
    function applyColorReplacements(color, replacements) {
        if (!color) return color;
        return replacements?.[color?.toLowerCase()] || color;
    }
    function getTokenStyleObject(token) {
        const styles = {};
        if (token.color) styles.color = token.color;
        if (token.bgColor) styles['background-color'] = token.bgColor;
        if (token.fontStyle) {
            if (token.fontStyle & FontStyle.Italic) styles['font-style'] = 'italic';
            if (token.fontStyle & FontStyle.Bold) styles['font-weight'] = 'bold';
            if (token.fontStyle & FontStyle.Underline) styles['text-decoration'] = 'underline';
        }
        return styles;
    }
    function stringifyTokenStyle(token) {
        return Object.entries(token).map(([key, value])=>`${key}:${value}`).join(';');
    }
    function createPositionConverter(code) {
        const lines = splitLines(code, true).map(([line])=>line);
        function indexToPos(index) {
            let character = index;
            let line = 0;
            for (const lineText of lines){
                if (character < lineText.length) break;
                character -= lineText.length;
                line++;
            }
            return {
                line,
                character
            };
        }
        function posToIndex(line, character) {
            let index = 0;
            for(let i = 0; i < line; i++)index += lines[i].length;
            index += character;
            return index;
        }
        return {
            lines,
            indexToPos,
            posToIndex
        };
    }
    var namedColors = [
        "black",
        "red",
        "green",
        "yellow",
        "blue",
        "magenta",
        "cyan",
        "white",
        "brightBlack",
        "brightRed",
        "brightGreen",
        "brightYellow",
        "brightBlue",
        "brightMagenta",
        "brightCyan",
        "brightWhite"
    ];
    var decorations = {
        1: "bold",
        2: "dim",
        3: "italic",
        4: "underline",
        7: "reverse",
        9: "strikethrough"
    };
    function findSequence(value, position) {
        const nextEscape = value.indexOf("\x1B[", position);
        if (nextEscape !== -1) {
            const nextClose = value.indexOf("m", nextEscape);
            return {
                sequence: value.substring(nextEscape + 2, nextClose).split(";"),
                startPosition: nextEscape,
                position: nextClose + 1
            };
        }
        return {
            position: value.length
        };
    }
    function parseColor(sequence, index) {
        let offset = 1;
        const colorMode = sequence[index + offset++];
        let color;
        if (colorMode === "2") {
            const rgb = [
                sequence[index + offset++],
                sequence[index + offset++],
                sequence[index + offset]
            ].map((x)=>Number.parseInt(x));
            if (rgb.length === 3 && !rgb.some((x)=>Number.isNaN(x))) {
                color = {
                    type: "rgb",
                    rgb
                };
            }
        } else if (colorMode === "5") {
            const colorIndex = Number.parseInt(sequence[index + offset]);
            if (!Number.isNaN(colorIndex)) {
                color = {
                    type: "table",
                    index: Number(colorIndex)
                };
            }
        }
        return [
            offset,
            color
        ];
    }
    function parseSequence(sequence) {
        const commands = [];
        for(let i = 0; i < sequence.length; i++){
            const code = sequence[i];
            const codeInt = Number.parseInt(code);
            if (Number.isNaN(codeInt)) continue;
            if (codeInt === 0) {
                commands.push({
                    type: "resetAll"
                });
            } else if (codeInt <= 9) {
                const decoration = decorations[codeInt];
                if (decoration) {
                    commands.push({
                        type: "setDecoration",
                        value: decorations[codeInt]
                    });
                }
            } else if (codeInt <= 29) {
                const decoration = decorations[codeInt - 20];
                if (decoration) {
                    commands.push({
                        type: "resetDecoration",
                        value: decoration
                    });
                }
            } else if (codeInt <= 37) {
                commands.push({
                    type: "setForegroundColor",
                    value: {
                        type: "named",
                        name: namedColors[codeInt - 30]
                    }
                });
            } else if (codeInt === 38) {
                const [offset, color] = parseColor(sequence, i);
                if (color) {
                    commands.push({
                        type: "setForegroundColor",
                        value: color
                    });
                }
                i += offset;
            } else if (codeInt === 39) {
                commands.push({
                    type: "resetForegroundColor"
                });
            } else if (codeInt <= 47) {
                commands.push({
                    type: "setBackgroundColor",
                    value: {
                        type: "named",
                        name: namedColors[codeInt - 40]
                    }
                });
            } else if (codeInt === 48) {
                const [offset, color] = parseColor(sequence, i);
                if (color) {
                    commands.push({
                        type: "setBackgroundColor",
                        value: color
                    });
                }
                i += offset;
            } else if (codeInt === 49) {
                commands.push({
                    type: "resetBackgroundColor"
                });
            } else if (codeInt >= 90 && codeInt <= 97) {
                commands.push({
                    type: "setForegroundColor",
                    value: {
                        type: "named",
                        name: namedColors[codeInt - 90 + 8]
                    }
                });
            } else if (codeInt >= 100 && codeInt <= 107) {
                commands.push({
                    type: "setBackgroundColor",
                    value: {
                        type: "named",
                        name: namedColors[codeInt - 100 + 8]
                    }
                });
            }
        }
        return commands;
    }
    function createAnsiSequenceParser() {
        let foreground = null;
        let background = null;
        let decorations2 = new Set();
        return {
            parse (value) {
                const tokens = [];
                let position = 0;
                do {
                    const findResult = findSequence(value, position);
                    const text = findResult.sequence ? value.substring(position, findResult.startPosition) : value.substring(position);
                    if (text.length > 0) {
                        tokens.push({
                            value: text,
                            foreground,
                            background,
                            decorations: new Set(decorations2)
                        });
                    }
                    if (findResult.sequence) {
                        const commands = parseSequence(findResult.sequence);
                        for (const styleToken of commands){
                            if (styleToken.type === "resetAll") {
                                foreground = null;
                                background = null;
                                decorations2.clear();
                            } else if (styleToken.type === "resetForegroundColor") {
                                foreground = null;
                            } else if (styleToken.type === "resetBackgroundColor") {
                                background = null;
                            } else if (styleToken.type === "resetDecoration") {
                                decorations2.delete(styleToken.value);
                            }
                        }
                        for (const styleToken of commands){
                            if (styleToken.type === "setForegroundColor") {
                                foreground = styleToken.value;
                            } else if (styleToken.type === "setBackgroundColor") {
                                background = styleToken.value;
                            } else if (styleToken.type === "setDecoration") {
                                decorations2.add(styleToken.value);
                            }
                        }
                    }
                    position = findResult.position;
                }while (position < value.length);
                return tokens;
            }
        };
    }
    var defaultNamedColorsMap = {
        black: "#000000",
        red: "#bb0000",
        green: "#00bb00",
        yellow: "#bbbb00",
        blue: "#0000bb",
        magenta: "#ff00ff",
        cyan: "#00bbbb",
        white: "#eeeeee",
        brightBlack: "#555555",
        brightRed: "#ff5555",
        brightGreen: "#00ff00",
        brightYellow: "#ffff55",
        brightBlue: "#5555ff",
        brightMagenta: "#ff55ff",
        brightCyan: "#55ffff",
        brightWhite: "#ffffff"
    };
    function createColorPalette(namedColorsMap = defaultNamedColorsMap) {
        function namedColor(name) {
            return namedColorsMap[name];
        }
        function rgbColor(rgb) {
            return `#${rgb.map((x)=>Math.max(0, Math.min(x, 255)).toString(16).padStart(2, "0")).join("")}`;
        }
        let colorTable;
        function getColorTable() {
            if (colorTable) {
                return colorTable;
            }
            colorTable = [];
            for(let i = 0; i < namedColors.length; i++){
                colorTable.push(namedColor(namedColors[i]));
            }
            let levels = [
                0,
                95,
                135,
                175,
                215,
                255
            ];
            for(let r = 0; r < 6; r++){
                for(let g = 0; g < 6; g++){
                    for(let b = 0; b < 6; b++){
                        colorTable.push(rgbColor([
                            levels[r],
                            levels[g],
                            levels[b]
                        ]));
                    }
                }
            }
            let level = 8;
            for(let i = 0; i < 24; i++, level += 10){
                colorTable.push(rgbColor([
                    level,
                    level,
                    level
                ]));
            }
            return colorTable;
        }
        function tableColor(index) {
            return getColorTable()[index];
        }
        function value(color) {
            switch(color.type){
                case "named":
                    return namedColor(color.name);
                case "rgb":
                    return rgbColor(color.rgb);
                case "table":
                    return tableColor(color.index);
            }
        }
        return {
            value
        };
    }
    function tokenizeAnsiWithTheme(theme, fileContents, options) {
        const colorReplacements = resolveColorReplacements(theme, options);
        const lines = splitLines(fileContents);
        const colorPalette = createColorPalette(Object.fromEntries(namedColors.map((name)=>[
                name,
                theme.colors?.[`terminal.ansi${name[0].toUpperCase()}${name.substring(1)}`]
            ])));
        const parser = createAnsiSequenceParser();
        return lines.map((line)=>parser.parse(line[0]).map((token)=>{
                let color;
                let bgColor;
                if (token.decorations.has('reverse')) {
                    color = token.background ? colorPalette.value(token.background) : theme.bg;
                    bgColor = token.foreground ? colorPalette.value(token.foreground) : theme.fg;
                } else {
                    color = token.foreground ? colorPalette.value(token.foreground) : theme.fg;
                    bgColor = token.background ? colorPalette.value(token.background) : undefined;
                }
                color = applyColorReplacements(color, colorReplacements);
                bgColor = applyColorReplacements(bgColor, colorReplacements);
                if (token.decorations.has('dim')) color = dimColor(color);
                let fontStyle = FontStyle.None;
                if (token.decorations.has('bold')) fontStyle |= FontStyle.Bold;
                if (token.decorations.has('italic')) fontStyle |= FontStyle.Italic;
                if (token.decorations.has('underline')) fontStyle |= FontStyle.Underline;
                return {
                    content: token.value,
                    offset: line[1],
                    color,
                    bgColor,
                    fontStyle
                };
            }));
    }
    function dimColor(color) {
        const hexMatch = color.match(/#([0-9a-f]{3})([0-9a-f]{3})?([0-9a-f]{2})?/);
        if (hexMatch) {
            if (hexMatch[3]) {
                const alpha = Math.round(Number.parseInt(hexMatch[3], 16) / 2).toString(16).padStart(2, '0');
                return `#${hexMatch[1]}${hexMatch[2]}${alpha}`;
            } else if (hexMatch[2]) {
                return `#${hexMatch[1]}${hexMatch[2]}80`;
            } else {
                return `#${Array.from(hexMatch[1]).map((x)=>`${x}${x}`).join('')}80`;
            }
        }
        const cssVarMatch = color.match(/var\((--[\w-]+-ansi-[\w-]+)\)/);
        if (cssVarMatch) return `var(${cssVarMatch[1]}-dim)`;
        return color;
    }
    function codeToTokensBase$1(internal, code, options = {}) {
        const { lang = 'text', theme: themeName = internal.getLoadedThemes()[0] } = options;
        if (isPlainLang(lang) || isNoneTheme(themeName)) return splitLines(code).map((line)=>[
                {
                    content: line[0],
                    offset: line[1]
                }
            ]);
        const { theme, colorMap } = internal.setTheme(themeName);
        if (lang === 'ansi') return tokenizeAnsiWithTheme(theme, code, options);
        const _grammar = internal.getLanguage(lang);
        return tokenizeWithTheme(code, _grammar, theme, colorMap, options);
    }
    function tokenizeWithTheme(code, grammar, theme, colorMap, options) {
        const colorReplacements = resolveColorReplacements(theme, options);
        const { tokenizeMaxLineLength = 0, tokenizeTimeLimit = 500 } = options;
        const lines = splitLines(code);
        let ruleStack = INITIAL;
        let actual = [];
        const final = [];
        for(let i = 0, len = lines.length; i < len; i++){
            const [line, lineOffset] = lines[i];
            if (line === '') {
                actual = [];
                final.push([]);
                continue;
            }
            if (tokenizeMaxLineLength > 0 && line.length >= tokenizeMaxLineLength) {
                actual = [];
                final.push([
                    {
                        content: line,
                        offset: lineOffset,
                        color: '',
                        fontStyle: 0
                    }
                ]);
                continue;
            }
            let resultWithScopes;
            let tokensWithScopes;
            let tokensWithScopesIndex;
            if (options.includeExplanation) {
                resultWithScopes = grammar.tokenizeLine(line, ruleStack);
                tokensWithScopes = resultWithScopes.tokens;
                tokensWithScopesIndex = 0;
            }
            const result = grammar.tokenizeLine2(line, ruleStack, tokenizeTimeLimit);
            const tokensLength = result.tokens.length / 2;
            for(let j = 0; j < tokensLength; j++){
                const startIndex = result.tokens[2 * j];
                const nextStartIndex = j + 1 < tokensLength ? result.tokens[2 * j + 2] : line.length;
                if (startIndex === nextStartIndex) continue;
                const metadata = result.tokens[2 * j + 1];
                const color = applyColorReplacements(colorMap[StackElementMetadata.getForeground(metadata)], colorReplacements);
                const fontStyle = StackElementMetadata.getFontStyle(metadata);
                const token = {
                    content: line.substring(startIndex, nextStartIndex),
                    offset: lineOffset + startIndex,
                    color,
                    fontStyle
                };
                if (options.includeExplanation) {
                    token.explanation = [];
                    let offset = 0;
                    while(startIndex + offset < nextStartIndex){
                        const tokenWithScopes = tokensWithScopes[tokensWithScopesIndex];
                        const tokenWithScopesText = line.substring(tokenWithScopes.startIndex, tokenWithScopes.endIndex);
                        offset += tokenWithScopesText.length;
                        token.explanation.push({
                            content: tokenWithScopesText,
                            scopes: explainThemeScopes(theme, tokenWithScopes.scopes)
                        });
                        tokensWithScopesIndex += 1;
                    }
                }
                actual.push(token);
            }
            final.push(actual);
            actual = [];
            ruleStack = result.ruleStack;
        }
        return final;
    }
    function explainThemeScopes(theme, scopes) {
        const result = [];
        for(let i = 0, len = scopes.length; i < len; i++){
            const parentScopes = scopes.slice(0, i);
            const scope = scopes[i];
            result[i] = {
                scopeName: scope,
                themeMatches: explainThemeScope(theme, scope, parentScopes)
            };
        }
        return result;
    }
    function matchesOne(selector, scope) {
        const selectorPrefix = `${selector}.`;
        if (selector === scope || scope.substring(0, selectorPrefix.length) === selectorPrefix) return true;
        return false;
    }
    function matches(selector, selectorParentScopes, scope, parentScopes) {
        if (!matchesOne(selector, scope)) return false;
        let selectorParentIndex = selectorParentScopes.length - 1;
        let parentIndex = parentScopes.length - 1;
        while(selectorParentIndex >= 0 && parentIndex >= 0){
            if (matchesOne(selectorParentScopes[selectorParentIndex], parentScopes[parentIndex])) selectorParentIndex -= 1;
            parentIndex -= 1;
        }
        if (selectorParentIndex === -1) return true;
        return false;
    }
    function explainThemeScope(theme, scope, parentScopes) {
        const result = [];
        let resultLen = 0;
        for(let i = 0, len = theme.settings.length; i < len; i++){
            const setting = theme.settings[i];
            let selectors;
            if (typeof setting.scope === 'string') selectors = setting.scope.split(/,/).map((scope)=>scope.trim());
            else if (Array.isArray(setting.scope)) selectors = setting.scope;
            else continue;
            for(let j = 0, lenJ = selectors.length; j < lenJ; j++){
                const rawSelector = selectors[j];
                const rawSelectorPieces = rawSelector.split(/ /);
                const selector = rawSelectorPieces[rawSelectorPieces.length - 1];
                const selectorParentScopes = rawSelectorPieces.slice(0, rawSelectorPieces.length - 1);
                if (matches(selector, selectorParentScopes, scope, parentScopes)) {
                    result[resultLen++] = setting;
                    j = lenJ;
                }
            }
        }
        return result;
    }
    function codeToTokensWithThemes$1(internal, code, options) {
        const themes = Object.entries(options.themes).filter((i)=>i[1]).map((i)=>({
                color: i[0],
                theme: i[1]
            }));
        const tokens = syncThemesTokenization(...themes.map((t)=>codeToTokensBase$1(internal, code, {
                ...options,
                theme: t.theme
            })));
        const mergedTokens = tokens[0].map((line, lineIdx)=>line.map((_token, tokenIdx)=>{
                const mergedToken = {
                    content: _token.content,
                    variants: {},
                    offset: _token.offset
                };
                tokens.forEach((t, themeIdx)=>{
                    const { content: _, explanation: __, offset: ___, ...styles } = t[lineIdx][tokenIdx];
                    mergedToken.variants[themes[themeIdx].color] = styles;
                });
                return mergedToken;
            }));
        return mergedTokens;
    }
    function syncThemesTokenization(...themes) {
        const outThemes = themes.map(()=>[]);
        const count = themes.length;
        for(let i = 0; i < themes[0].length; i++){
            const lines = themes.map((t)=>t[i]);
            const outLines = outThemes.map(()=>[]);
            outThemes.forEach((t, i)=>t.push(outLines[i]));
            const indexes = lines.map(()=>0);
            const current = lines.map((l)=>l[0]);
            while(current.every((t)=>t)){
                const minLength = Math.min(...current.map((t)=>t.content.length));
                for(let n = 0; n < count; n++){
                    const token = current[n];
                    if (token.content.length === minLength) {
                        outLines[n].push(token);
                        indexes[n] += 1;
                        current[n] = lines[n][indexes[n]];
                    } else {
                        outLines[n].push({
                            ...token,
                            content: token.content.slice(0, minLength)
                        });
                        current[n] = {
                            ...token,
                            content: token.content.slice(minLength),
                            offset: token.offset + minLength
                        };
                    }
                }
            }
        }
        return outThemes;
    }
    class ShikiError extends Error {
        constructor(message){
            super(message);
            this.name = 'ShikiError';
        }
    }
    function codeToTokens$1(internal, code, options) {
        let bg;
        let fg;
        let tokens;
        let themeName;
        let rootStyle;
        if ('themes' in options) {
            const { defaultColor = 'light', cssVariablePrefix = '--shiki-' } = options;
            const themes = Object.entries(options.themes).filter((i)=>i[1]).map((i)=>({
                    color: i[0],
                    theme: i[1]
                })).sort((a, b)=>a.color === defaultColor ? -1 : b.color === defaultColor ? 1 : 0);
            if (themes.length === 0) throw new ShikiError('`themes` option must not be empty');
            const themeTokens = codeToTokensWithThemes$1(internal, code, options);
            if (defaultColor && !themes.find((t)=>t.color === defaultColor)) throw new ShikiError(`\`themes\` option must contain the defaultColor key \`${defaultColor}\``);
            const themeRegs = themes.map((t)=>internal.getTheme(t.theme));
            const themesOrder = themes.map((t)=>t.color);
            tokens = themeTokens.map((line)=>line.map((token)=>mergeToken(token, themesOrder, cssVariablePrefix, defaultColor)));
            const themeColorReplacements = themes.map((t)=>resolveColorReplacements(t.theme, options));
            fg = themes.map((t, idx)=>(idx === 0 && defaultColor ? '' : `${cssVariablePrefix + t.color}:`) + (applyColorReplacements(themeRegs[idx].fg, themeColorReplacements[idx]) || 'inherit')).join(';');
            bg = themes.map((t, idx)=>(idx === 0 && defaultColor ? '' : `${cssVariablePrefix + t.color}-bg:`) + (applyColorReplacements(themeRegs[idx].bg, themeColorReplacements[idx]) || 'inherit')).join(';');
            themeName = `shiki-themes ${themeRegs.map((t)=>t.name).join(' ')}`;
            rootStyle = defaultColor ? undefined : [
                fg,
                bg
            ].join(';');
        } else if ('theme' in options) {
            const colorReplacements = resolveColorReplacements(options.theme, options.colorReplacements);
            tokens = codeToTokensBase$1(internal, code, options);
            const _theme = internal.getTheme(options.theme);
            bg = applyColorReplacements(_theme.bg, colorReplacements);
            fg = applyColorReplacements(_theme.fg, colorReplacements);
            themeName = _theme.name;
        } else {
            throw new ShikiError('Invalid options, either `theme` or `themes` must be provided');
        }
        return {
            tokens,
            fg,
            bg,
            themeName,
            rootStyle
        };
    }
    function mergeToken(merged, variantsOrder, cssVariablePrefix, defaultColor) {
        const token = {
            content: merged.content,
            explanation: merged.explanation,
            offset: merged.offset
        };
        const styles = variantsOrder.map((t)=>getTokenStyleObject(merged.variants[t]));
        const styleKeys = new Set(styles.flatMap((t)=>Object.keys(t)));
        const mergedStyles = styles.reduce((acc, cur, idx)=>{
            for (const key of styleKeys){
                const value = cur[key] || 'inherit';
                if (idx === 0 && defaultColor) {
                    acc[key] = value;
                } else {
                    const keyName = key === 'color' ? '' : key === 'background-color' ? '-bg' : `-${key}`;
                    const varKey = cssVariablePrefix + variantsOrder[idx] + (key === 'color' ? '' : keyName);
                    if (acc[key]) acc[key] += `;${varKey}:${value}`;
                    else acc[key] = `${varKey}:${value}`;
                }
            }
            return acc;
        }, {});
        token.htmlStyle = defaultColor ? stringifyTokenStyle(mergedStyles) : Object.values(mergedStyles).join(';');
        return token;
    }
    function transformerDecorations() {
        const map = new WeakMap();
        function getContext(shiki) {
            if (!map.has(shiki.meta)) {
                const converter = createPositionConverter(shiki.source);
                function normalizePosition(p) {
                    if (typeof p === 'number') {
                        return {
                            ...converter.indexToPos(p),
                            offset: p
                        };
                    } else {
                        return {
                            ...p,
                            offset: converter.posToIndex(p.line, p.character)
                        };
                    }
                }
                const decorations = (shiki.options.decorations || []).map((d)=>({
                        ...d,
                        start: normalizePosition(d.start),
                        end: normalizePosition(d.end)
                    }));
                verifyIntersections(decorations);
                map.set(shiki.meta, {
                    decorations,
                    converter,
                    source: shiki.source
                });
            }
            return map.get(shiki.meta);
        }
        function verifyIntersections(items) {
            for(let i = 0; i < items.length; i++){
                const foo = items[i];
                if (foo.start.offset > foo.end.offset) throw new ShikiError(`Invalid decoration range: ${JSON.stringify(foo.start)} - ${JSON.stringify(foo.end)}`);
                for(let j = i + 1; j < items.length; j++){
                    const bar = items[j];
                    const isFooHasBarStart = foo.start.offset < bar.start.offset && bar.start.offset < foo.end.offset;
                    const isFooHasBarEnd = foo.start.offset < bar.end.offset && bar.end.offset < foo.end.offset;
                    const isBarHasFooStart = bar.start.offset < foo.start.offset && foo.start.offset < bar.end.offset;
                    const isBarHasFooEnd = bar.start.offset < foo.end.offset && foo.end.offset < bar.end.offset;
                    if (isFooHasBarStart || isFooHasBarEnd || isBarHasFooStart || isBarHasFooEnd) {
                        if (isFooHasBarEnd && isFooHasBarEnd) continue;
                        if (isBarHasFooStart && isBarHasFooEnd) continue;
                        throw new ShikiError(`Decorations ${JSON.stringify(foo.start)} and ${JSON.stringify(bar.start)} intersect.`);
                    }
                }
            }
        }
        return {
            name: 'shiki:decorations',
            tokens (tokens) {
                if (!this.options.decorations?.length) return;
                const ctx = getContext(this);
                const breakpoints = ctx.decorations.flatMap((d)=>[
                        d.start.offset,
                        d.end.offset
                    ]);
                const splitted = splitTokens(tokens, breakpoints);
                return splitted;
            },
            code (codeEl) {
                if (!this.options.decorations?.length) return;
                const ctx = getContext(this);
                const lines = Array.from(codeEl.children).filter((i)=>i.type === 'element' && i.tagName === 'span');
                if (lines.length !== ctx.converter.lines.length) throw new ShikiError(`Number of lines in code element (${lines.length}) does not match the number of lines in the source (${ctx.converter.lines.length}). Failed to apply decorations.`);
                function applyLineSection(line, start, end, decoration) {
                    const lineEl = lines[line];
                    let text = '';
                    let startIndex = -1;
                    let endIndex = -1;
                    function stringify(el) {
                        if (el.type === 'text') return el.value;
                        if (el.type === 'element') return el.children.map(stringify).join('');
                        return '';
                    }
                    if (start === 0) startIndex = 0;
                    if (end === 0) endIndex = 0;
                    if (end === Number.POSITIVE_INFINITY) endIndex = lineEl.children.length;
                    if (startIndex === -1 || endIndex === -1) {
                        for(let i = 0; i < lineEl.children.length; i++){
                            text += stringify(lineEl.children[i]);
                            if (startIndex === -1 && text.length === start) startIndex = i + 1;
                            if (endIndex === -1 && text.length === end) endIndex = i + 1;
                        }
                    }
                    if (startIndex === -1) throw new ShikiError(`Failed to find start index for decoration ${JSON.stringify(decoration.start)}`);
                    if (endIndex === -1) throw new ShikiError(`Failed to find end index for decoration ${JSON.stringify(decoration.end)}`);
                    const children = lineEl.children.slice(startIndex, endIndex);
                    if (!decoration.alwaysWrap && children.length === lineEl.children.length) {
                        applyDecoration(lineEl, decoration, 'line');
                    } else if (!decoration.alwaysWrap && children.length === 1 && children[0].type === 'element') {
                        applyDecoration(children[0], decoration, 'token');
                    } else {
                        const wrapper = {
                            type: 'element',
                            tagName: 'span',
                            properties: {},
                            children
                        };
                        applyDecoration(wrapper, decoration, 'wrapper');
                        lineEl.children.splice(startIndex, children.length, wrapper);
                    }
                }
                function applyLine(line, decoration) {
                    lines[line] = applyDecoration(lines[line], decoration, 'line');
                }
                function applyDecoration(el, decoration, type) {
                    const properties = decoration.properties || {};
                    const transform = decoration.transform || ((i)=>i);
                    el.tagName = decoration.tagName || 'span';
                    el.properties = {
                        ...el.properties,
                        ...properties,
                        class: el.properties.class
                    };
                    if (decoration.properties?.class) addClassToHast(el, decoration.properties.class);
                    el = transform(el, type) || el;
                    return el;
                }
                const lineApplies = [];
                const sorted = ctx.decorations.sort((a, b)=>b.start.offset - a.start.offset);
                for (const decoration of sorted){
                    const { start, end } = decoration;
                    if (start.line === end.line) {
                        applyLineSection(start.line, start.character, end.character, decoration);
                    } else if (start.line < end.line) {
                        applyLineSection(start.line, start.character, Number.POSITIVE_INFINITY, decoration);
                        for(let i = start.line + 1; i < end.line; i++)lineApplies.unshift(()=>applyLine(i, decoration));
                        applyLineSection(end.line, 0, end.character, decoration);
                    }
                }
                lineApplies.forEach((i)=>i());
            }
        };
    }
    const builtInTransformers = [
        transformerDecorations()
    ];
    function getTransformers(options) {
        return [
            ...options.transformers || [],
            ...builtInTransformers
        ];
    }
    function codeToHast$1(internal, code, options, transformerContext = {
        meta: {},
        options,
        codeToHast: (_code, _options)=>codeToHast$1(internal, _code, _options),
        codeToTokens: (_code, _options)=>codeToTokens$1(internal, _code, _options)
    }) {
        let input = code;
        for (const transformer of getTransformers(options))input = transformer.preprocess?.call(transformerContext, input, options) || input;
        let { tokens, fg, bg, themeName, rootStyle } = codeToTokens$1(internal, input, options);
        const { mergeWhitespaces = true } = options;
        if (mergeWhitespaces === true) tokens = mergeWhitespaceTokens(tokens);
        else if (mergeWhitespaces === 'never') tokens = splitWhitespaceTokens(tokens);
        const contextSource = {
            ...transformerContext,
            get source () {
                return input;
            }
        };
        for (const transformer of getTransformers(options))tokens = transformer.tokens?.call(contextSource, tokens) || tokens;
        return tokensToHast(tokens, {
            ...options,
            fg,
            bg,
            themeName,
            rootStyle
        }, contextSource);
    }
    function tokensToHast(tokens, options, transformerContext) {
        const transformers = getTransformers(options);
        const lines = [];
        const root = {
            type: 'root',
            children: []
        };
        const { structure = 'classic' } = options;
        let preNode = {
            type: 'element',
            tagName: 'pre',
            properties: {
                class: `shiki ${options.themeName || ''}`,
                style: options.rootStyle || `background-color:${options.bg};color:${options.fg}`,
                tabindex: '0',
                ...Object.fromEntries(Array.from(Object.entries(options.meta || {})).filter(([key])=>!key.startsWith('_')))
            },
            children: []
        };
        let codeNode = {
            type: 'element',
            tagName: 'code',
            properties: {},
            children: lines
        };
        const lineNodes = [];
        const context = {
            ...transformerContext,
            structure,
            addClassToHast,
            get source () {
                return transformerContext.source;
            },
            get tokens () {
                return tokens;
            },
            get options () {
                return options;
            },
            get root () {
                return root;
            },
            get pre () {
                return preNode;
            },
            get code () {
                return codeNode;
            },
            get lines () {
                return lineNodes;
            }
        };
        tokens.forEach((line, idx)=>{
            if (idx) {
                if (structure === 'inline') root.children.push({
                    type: 'element',
                    tagName: 'br',
                    properties: {},
                    children: []
                });
                else if (structure === 'classic') lines.push({
                    type: 'text',
                    value: '\n'
                });
            }
            let lineNode = {
                type: 'element',
                tagName: 'span',
                properties: {
                    class: 'line'
                },
                children: []
            };
            let col = 0;
            for (const token of line){
                let tokenNode = {
                    type: 'element',
                    tagName: 'span',
                    properties: {},
                    children: [
                        {
                            type: 'text',
                            value: token.content
                        }
                    ]
                };
                const style = token.htmlStyle || stringifyTokenStyle(getTokenStyleObject(token));
                if (style) tokenNode.properties.style = style;
                for (const transformer of transformers)tokenNode = transformer?.span?.call(context, tokenNode, idx + 1, col, lineNode) || tokenNode;
                if (structure === 'inline') root.children.push(tokenNode);
                else if (structure === 'classic') lineNode.children.push(tokenNode);
                col += token.content.length;
            }
            if (structure === 'classic') {
                for (const transformer of transformers)lineNode = transformer?.line?.call(context, lineNode, idx + 1) || lineNode;
                lineNodes.push(lineNode);
                lines.push(lineNode);
            }
        });
        if (structure === 'classic') {
            for (const transformer of transformers)codeNode = transformer?.code?.call(context, codeNode) || codeNode;
            preNode.children.push(codeNode);
            for (const transformer of transformers)preNode = transformer?.pre?.call(context, preNode) || preNode;
            root.children.push(preNode);
        }
        let result = root;
        for (const transformer of transformers)result = transformer?.root?.call(context, result) || result;
        return result;
    }
    function mergeWhitespaceTokens(tokens) {
        return tokens.map((line)=>{
            const newLine = [];
            let carryOnContent = '';
            let firstOffset = 0;
            line.forEach((token, idx)=>{
                const isUnderline = token.fontStyle && token.fontStyle & FontStyle.Underline;
                const couldMerge = !isUnderline;
                if (couldMerge && token.content.match(/^\s+$/) && line[idx + 1]) {
                    if (!firstOffset) firstOffset = token.offset;
                    carryOnContent += token.content;
                } else {
                    if (carryOnContent) {
                        if (couldMerge) {
                            newLine.push({
                                ...token,
                                offset: firstOffset,
                                content: carryOnContent + token.content
                            });
                        } else {
                            newLine.push({
                                content: carryOnContent,
                                offset: firstOffset
                            }, token);
                        }
                        firstOffset = 0;
                        carryOnContent = '';
                    } else {
                        newLine.push(token);
                    }
                }
            });
            return newLine;
        });
    }
    function splitWhitespaceTokens(tokens) {
        return tokens.map((line)=>{
            return line.flatMap((token)=>{
                if (token.content.match(/^\s+$/)) return token;
                const match = token.content.match(/^(\s*)(.*?)(\s*)$/);
                if (!match) return token;
                const [, leading, content, trailing] = match;
                if (!leading && !trailing) return token;
                const expanded = [
                    {
                        ...token,
                        offset: token.offset + leading.length,
                        content
                    }
                ];
                if (leading) {
                    expanded.unshift({
                        content: leading,
                        offset: token.offset
                    });
                }
                if (trailing) {
                    expanded.push({
                        content: trailing,
                        offset: token.offset + leading.length + content.length
                    });
                }
                return expanded;
            });
        });
    }
    const htmlVoidElements = [
        'area',
        'base',
        'basefont',
        'bgsound',
        'br',
        'col',
        'command',
        'embed',
        'frame',
        'hr',
        'image',
        'img',
        'input',
        'keygen',
        'link',
        'meta',
        'param',
        'source',
        'track',
        'wbr'
    ];
    class Schema {
        constructor(property, normal, space){
            this.property = property;
            this.normal = normal;
            if (space) {
                this.space = space;
            }
        }
    }
    Schema.prototype.property = {};
    Schema.prototype.normal = {};
    Schema.prototype.space = null;
    function merge(definitions, space) {
        const property = {};
        const normal = {};
        let index = -1;
        while(++index < definitions.length){
            Object.assign(property, definitions[index].property);
            Object.assign(normal, definitions[index].normal);
        }
        return new Schema(property, normal, space);
    }
    function normalize(value) {
        return value.toLowerCase();
    }
    class Info {
        constructor(property, attribute){
            this.property = property;
            this.attribute = attribute;
        }
    }
    Info.prototype.space = null;
    Info.prototype.boolean = false;
    Info.prototype.booleanish = false;
    Info.prototype.overloadedBoolean = false;
    Info.prototype.number = false;
    Info.prototype.commaSeparated = false;
    Info.prototype.spaceSeparated = false;
    Info.prototype.commaOrSpaceSeparated = false;
    Info.prototype.mustUseProperty = false;
    Info.prototype.defined = false;
    let powers = 0;
    const boolean$1 = increment();
    const booleanish = increment();
    const overloadedBoolean = increment();
    const number$1 = increment();
    const spaceSeparated = increment();
    const commaSeparated = increment();
    const commaOrSpaceSeparated = increment();
    function increment() {
        return 2 ** ++powers;
    }
    var types = Object.freeze({
        __proto__: null,
        boolean: boolean$1,
        booleanish: booleanish,
        commaOrSpaceSeparated: commaOrSpaceSeparated,
        commaSeparated: commaSeparated,
        number: number$1,
        overloadedBoolean: overloadedBoolean,
        spaceSeparated: spaceSeparated
    });
    const checks = Object.keys(types);
    class DefinedInfo extends Info {
        constructor(property, attribute, mask, space){
            let index = -1;
            super(property, attribute);
            mark(this, 'space', space);
            if (typeof mask === 'number') {
                while(++index < checks.length){
                    const check = checks[index];
                    mark(this, checks[index], (mask & types[check]) === types[check]);
                }
            }
        }
    }
    DefinedInfo.prototype.defined = true;
    function mark(values, key, value) {
        if (value) {
            values[key] = value;
        }
    }
    const own$3 = {}.hasOwnProperty;
    function create(definition) {
        const property = {};
        const normal = {};
        let prop;
        for(prop in definition.properties){
            if (own$3.call(definition.properties, prop)) {
                const value = definition.properties[prop];
                const info = new DefinedInfo(prop, definition.transform(definition.attributes || {}, prop), value, definition.space);
                if (definition.mustUseProperty && definition.mustUseProperty.includes(prop)) {
                    info.mustUseProperty = true;
                }
                property[prop] = info;
                normal[normalize(prop)] = prop;
                normal[normalize(info.attribute)] = prop;
            }
        }
        return new Schema(property, normal, definition.space);
    }
    const xlink = create({
        space: 'xlink',
        transform (_, prop) {
            return 'xlink:' + prop.slice(5).toLowerCase();
        },
        properties: {
            xLinkActuate: null,
            xLinkArcRole: null,
            xLinkHref: null,
            xLinkRole: null,
            xLinkShow: null,
            xLinkTitle: null,
            xLinkType: null
        }
    });
    const xml = create({
        space: 'xml',
        transform (_, prop) {
            return 'xml:' + prop.slice(3).toLowerCase();
        },
        properties: {
            xmlLang: null,
            xmlBase: null,
            xmlSpace: null
        }
    });
    function caseSensitiveTransform(attributes, attribute) {
        return attribute in attributes ? attributes[attribute] : attribute;
    }
    function caseInsensitiveTransform(attributes, property) {
        return caseSensitiveTransform(attributes, property.toLowerCase());
    }
    const xmlns = create({
        space: 'xmlns',
        attributes: {
            xmlnsxlink: 'xmlns:xlink'
        },
        transform: caseInsensitiveTransform,
        properties: {
            xmlns: null,
            xmlnsXLink: null
        }
    });
    const aria = create({
        transform (_, prop) {
            return prop === 'role' ? prop : 'aria-' + prop.slice(4).toLowerCase();
        },
        properties: {
            ariaActiveDescendant: null,
            ariaAtomic: booleanish,
            ariaAutoComplete: null,
            ariaBusy: booleanish,
            ariaChecked: booleanish,
            ariaColCount: number$1,
            ariaColIndex: number$1,
            ariaColSpan: number$1,
            ariaControls: spaceSeparated,
            ariaCurrent: null,
            ariaDescribedBy: spaceSeparated,
            ariaDetails: null,
            ariaDisabled: booleanish,
            ariaDropEffect: spaceSeparated,
            ariaErrorMessage: null,
            ariaExpanded: booleanish,
            ariaFlowTo: spaceSeparated,
            ariaGrabbed: booleanish,
            ariaHasPopup: null,
            ariaHidden: booleanish,
            ariaInvalid: null,
            ariaKeyShortcuts: null,
            ariaLabel: null,
            ariaLabelledBy: spaceSeparated,
            ariaLevel: number$1,
            ariaLive: null,
            ariaModal: booleanish,
            ariaMultiLine: booleanish,
            ariaMultiSelectable: booleanish,
            ariaOrientation: null,
            ariaOwns: spaceSeparated,
            ariaPlaceholder: null,
            ariaPosInSet: number$1,
            ariaPressed: booleanish,
            ariaReadOnly: booleanish,
            ariaRelevant: null,
            ariaRequired: booleanish,
            ariaRoleDescription: spaceSeparated,
            ariaRowCount: number$1,
            ariaRowIndex: number$1,
            ariaRowSpan: number$1,
            ariaSelected: booleanish,
            ariaSetSize: number$1,
            ariaSort: null,
            ariaValueMax: number$1,
            ariaValueMin: number$1,
            ariaValueNow: number$1,
            ariaValueText: null,
            role: null
        }
    });
    const html$3 = create({
        space: 'html',
        attributes: {
            acceptcharset: 'accept-charset',
            classname: 'class',
            htmlfor: 'for',
            httpequiv: 'http-equiv'
        },
        transform: caseInsensitiveTransform,
        mustUseProperty: [
            'checked',
            'multiple',
            'muted',
            'selected'
        ],
        properties: {
            abbr: null,
            accept: commaSeparated,
            acceptCharset: spaceSeparated,
            accessKey: spaceSeparated,
            action: null,
            allow: null,
            allowFullScreen: boolean$1,
            allowPaymentRequest: boolean$1,
            allowUserMedia: boolean$1,
            alt: null,
            as: null,
            async: boolean$1,
            autoCapitalize: null,
            autoComplete: spaceSeparated,
            autoFocus: boolean$1,
            autoPlay: boolean$1,
            blocking: spaceSeparated,
            capture: null,
            charSet: null,
            checked: boolean$1,
            cite: null,
            className: spaceSeparated,
            cols: number$1,
            colSpan: null,
            content: null,
            contentEditable: booleanish,
            controls: boolean$1,
            controlsList: spaceSeparated,
            coords: number$1 | commaSeparated,
            crossOrigin: null,
            data: null,
            dateTime: null,
            decoding: null,
            default: boolean$1,
            defer: boolean$1,
            dir: null,
            dirName: null,
            disabled: boolean$1,
            download: overloadedBoolean,
            draggable: booleanish,
            encType: null,
            enterKeyHint: null,
            fetchPriority: null,
            form: null,
            formAction: null,
            formEncType: null,
            formMethod: null,
            formNoValidate: boolean$1,
            formTarget: null,
            headers: spaceSeparated,
            height: number$1,
            hidden: boolean$1,
            high: number$1,
            href: null,
            hrefLang: null,
            htmlFor: spaceSeparated,
            httpEquiv: spaceSeparated,
            id: null,
            imageSizes: null,
            imageSrcSet: null,
            inert: boolean$1,
            inputMode: null,
            integrity: null,
            is: null,
            isMap: boolean$1,
            itemId: null,
            itemProp: spaceSeparated,
            itemRef: spaceSeparated,
            itemScope: boolean$1,
            itemType: spaceSeparated,
            kind: null,
            label: null,
            lang: null,
            language: null,
            list: null,
            loading: null,
            loop: boolean$1,
            low: number$1,
            manifest: null,
            max: null,
            maxLength: number$1,
            media: null,
            method: null,
            min: null,
            minLength: number$1,
            multiple: boolean$1,
            muted: boolean$1,
            name: null,
            nonce: null,
            noModule: boolean$1,
            noValidate: boolean$1,
            onAbort: null,
            onAfterPrint: null,
            onAuxClick: null,
            onBeforeMatch: null,
            onBeforePrint: null,
            onBeforeToggle: null,
            onBeforeUnload: null,
            onBlur: null,
            onCancel: null,
            onCanPlay: null,
            onCanPlayThrough: null,
            onChange: null,
            onClick: null,
            onClose: null,
            onContextLost: null,
            onContextMenu: null,
            onContextRestored: null,
            onCopy: null,
            onCueChange: null,
            onCut: null,
            onDblClick: null,
            onDrag: null,
            onDragEnd: null,
            onDragEnter: null,
            onDragExit: null,
            onDragLeave: null,
            onDragOver: null,
            onDragStart: null,
            onDrop: null,
            onDurationChange: null,
            onEmptied: null,
            onEnded: null,
            onError: null,
            onFocus: null,
            onFormData: null,
            onHashChange: null,
            onInput: null,
            onInvalid: null,
            onKeyDown: null,
            onKeyPress: null,
            onKeyUp: null,
            onLanguageChange: null,
            onLoad: null,
            onLoadedData: null,
            onLoadedMetadata: null,
            onLoadEnd: null,
            onLoadStart: null,
            onMessage: null,
            onMessageError: null,
            onMouseDown: null,
            onMouseEnter: null,
            onMouseLeave: null,
            onMouseMove: null,
            onMouseOut: null,
            onMouseOver: null,
            onMouseUp: null,
            onOffline: null,
            onOnline: null,
            onPageHide: null,
            onPageShow: null,
            onPaste: null,
            onPause: null,
            onPlay: null,
            onPlaying: null,
            onPopState: null,
            onProgress: null,
            onRateChange: null,
            onRejectionHandled: null,
            onReset: null,
            onResize: null,
            onScroll: null,
            onScrollEnd: null,
            onSecurityPolicyViolation: null,
            onSeeked: null,
            onSeeking: null,
            onSelect: null,
            onSlotChange: null,
            onStalled: null,
            onStorage: null,
            onSubmit: null,
            onSuspend: null,
            onTimeUpdate: null,
            onToggle: null,
            onUnhandledRejection: null,
            onUnload: null,
            onVolumeChange: null,
            onWaiting: null,
            onWheel: null,
            open: boolean$1,
            optimum: number$1,
            pattern: null,
            ping: spaceSeparated,
            placeholder: null,
            playsInline: boolean$1,
            popover: null,
            popoverTarget: null,
            popoverTargetAction: null,
            poster: null,
            preload: null,
            readOnly: boolean$1,
            referrerPolicy: null,
            rel: spaceSeparated,
            required: boolean$1,
            reversed: boolean$1,
            rows: number$1,
            rowSpan: number$1,
            sandbox: spaceSeparated,
            scope: null,
            scoped: boolean$1,
            seamless: boolean$1,
            selected: boolean$1,
            shadowRootDelegatesFocus: boolean$1,
            shadowRootMode: null,
            shape: null,
            size: number$1,
            sizes: null,
            slot: null,
            span: number$1,
            spellCheck: booleanish,
            src: null,
            srcDoc: null,
            srcLang: null,
            srcSet: null,
            start: number$1,
            step: null,
            style: null,
            tabIndex: number$1,
            target: null,
            title: null,
            translate: null,
            type: null,
            typeMustMatch: boolean$1,
            useMap: null,
            value: booleanish,
            width: number$1,
            wrap: null,
            align: null,
            aLink: null,
            archive: spaceSeparated,
            axis: null,
            background: null,
            bgColor: null,
            border: number$1,
            borderColor: null,
            bottomMargin: number$1,
            cellPadding: null,
            cellSpacing: null,
            char: null,
            charOff: null,
            classId: null,
            clear: null,
            code: null,
            codeBase: null,
            codeType: null,
            color: null,
            compact: boolean$1,
            declare: boolean$1,
            event: null,
            face: null,
            frame: null,
            frameBorder: null,
            hSpace: number$1,
            leftMargin: number$1,
            link: null,
            longDesc: null,
            lowSrc: null,
            marginHeight: number$1,
            marginWidth: number$1,
            noResize: boolean$1,
            noHref: boolean$1,
            noShade: boolean$1,
            noWrap: boolean$1,
            object: null,
            profile: null,
            prompt: null,
            rev: null,
            rightMargin: number$1,
            rules: null,
            scheme: null,
            scrolling: booleanish,
            standby: null,
            summary: null,
            text: null,
            topMargin: number$1,
            valueType: null,
            version: null,
            vAlign: null,
            vLink: null,
            vSpace: number$1,
            allowTransparency: null,
            autoCorrect: null,
            autoSave: null,
            disablePictureInPicture: boolean$1,
            disableRemotePlayback: boolean$1,
            prefix: null,
            property: null,
            results: number$1,
            security: null,
            unselectable: null
        }
    });
    const svg$1 = create({
        space: 'svg',
        attributes: {
            accentHeight: 'accent-height',
            alignmentBaseline: 'alignment-baseline',
            arabicForm: 'arabic-form',
            baselineShift: 'baseline-shift',
            capHeight: 'cap-height',
            className: 'class',
            clipPath: 'clip-path',
            clipRule: 'clip-rule',
            colorInterpolation: 'color-interpolation',
            colorInterpolationFilters: 'color-interpolation-filters',
            colorProfile: 'color-profile',
            colorRendering: 'color-rendering',
            crossOrigin: 'crossorigin',
            dataType: 'datatype',
            dominantBaseline: 'dominant-baseline',
            enableBackground: 'enable-background',
            fillOpacity: 'fill-opacity',
            fillRule: 'fill-rule',
            floodColor: 'flood-color',
            floodOpacity: 'flood-opacity',
            fontFamily: 'font-family',
            fontSize: 'font-size',
            fontSizeAdjust: 'font-size-adjust',
            fontStretch: 'font-stretch',
            fontStyle: 'font-style',
            fontVariant: 'font-variant',
            fontWeight: 'font-weight',
            glyphName: 'glyph-name',
            glyphOrientationHorizontal: 'glyph-orientation-horizontal',
            glyphOrientationVertical: 'glyph-orientation-vertical',
            hrefLang: 'hreflang',
            horizAdvX: 'horiz-adv-x',
            horizOriginX: 'horiz-origin-x',
            horizOriginY: 'horiz-origin-y',
            imageRendering: 'image-rendering',
            letterSpacing: 'letter-spacing',
            lightingColor: 'lighting-color',
            markerEnd: 'marker-end',
            markerMid: 'marker-mid',
            markerStart: 'marker-start',
            navDown: 'nav-down',
            navDownLeft: 'nav-down-left',
            navDownRight: 'nav-down-right',
            navLeft: 'nav-left',
            navNext: 'nav-next',
            navPrev: 'nav-prev',
            navRight: 'nav-right',
            navUp: 'nav-up',
            navUpLeft: 'nav-up-left',
            navUpRight: 'nav-up-right',
            onAbort: 'onabort',
            onActivate: 'onactivate',
            onAfterPrint: 'onafterprint',
            onBeforePrint: 'onbeforeprint',
            onBegin: 'onbegin',
            onCancel: 'oncancel',
            onCanPlay: 'oncanplay',
            onCanPlayThrough: 'oncanplaythrough',
            onChange: 'onchange',
            onClick: 'onclick',
            onClose: 'onclose',
            onCopy: 'oncopy',
            onCueChange: 'oncuechange',
            onCut: 'oncut',
            onDblClick: 'ondblclick',
            onDrag: 'ondrag',
            onDragEnd: 'ondragend',
            onDragEnter: 'ondragenter',
            onDragExit: 'ondragexit',
            onDragLeave: 'ondragleave',
            onDragOver: 'ondragover',
            onDragStart: 'ondragstart',
            onDrop: 'ondrop',
            onDurationChange: 'ondurationchange',
            onEmptied: 'onemptied',
            onEnd: 'onend',
            onEnded: 'onended',
            onError: 'onerror',
            onFocus: 'onfocus',
            onFocusIn: 'onfocusin',
            onFocusOut: 'onfocusout',
            onHashChange: 'onhashchange',
            onInput: 'oninput',
            onInvalid: 'oninvalid',
            onKeyDown: 'onkeydown',
            onKeyPress: 'onkeypress',
            onKeyUp: 'onkeyup',
            onLoad: 'onload',
            onLoadedData: 'onloadeddata',
            onLoadedMetadata: 'onloadedmetadata',
            onLoadStart: 'onloadstart',
            onMessage: 'onmessage',
            onMouseDown: 'onmousedown',
            onMouseEnter: 'onmouseenter',
            onMouseLeave: 'onmouseleave',
            onMouseMove: 'onmousemove',
            onMouseOut: 'onmouseout',
            onMouseOver: 'onmouseover',
            onMouseUp: 'onmouseup',
            onMouseWheel: 'onmousewheel',
            onOffline: 'onoffline',
            onOnline: 'ononline',
            onPageHide: 'onpagehide',
            onPageShow: 'onpageshow',
            onPaste: 'onpaste',
            onPause: 'onpause',
            onPlay: 'onplay',
            onPlaying: 'onplaying',
            onPopState: 'onpopstate',
            onProgress: 'onprogress',
            onRateChange: 'onratechange',
            onRepeat: 'onrepeat',
            onReset: 'onreset',
            onResize: 'onresize',
            onScroll: 'onscroll',
            onSeeked: 'onseeked',
            onSeeking: 'onseeking',
            onSelect: 'onselect',
            onShow: 'onshow',
            onStalled: 'onstalled',
            onStorage: 'onstorage',
            onSubmit: 'onsubmit',
            onSuspend: 'onsuspend',
            onTimeUpdate: 'ontimeupdate',
            onToggle: 'ontoggle',
            onUnload: 'onunload',
            onVolumeChange: 'onvolumechange',
            onWaiting: 'onwaiting',
            onZoom: 'onzoom',
            overlinePosition: 'overline-position',
            overlineThickness: 'overline-thickness',
            paintOrder: 'paint-order',
            panose1: 'panose-1',
            pointerEvents: 'pointer-events',
            referrerPolicy: 'referrerpolicy',
            renderingIntent: 'rendering-intent',
            shapeRendering: 'shape-rendering',
            stopColor: 'stop-color',
            stopOpacity: 'stop-opacity',
            strikethroughPosition: 'strikethrough-position',
            strikethroughThickness: 'strikethrough-thickness',
            strokeDashArray: 'stroke-dasharray',
            strokeDashOffset: 'stroke-dashoffset',
            strokeLineCap: 'stroke-linecap',
            strokeLineJoin: 'stroke-linejoin',
            strokeMiterLimit: 'stroke-miterlimit',
            strokeOpacity: 'stroke-opacity',
            strokeWidth: 'stroke-width',
            tabIndex: 'tabindex',
            textAnchor: 'text-anchor',
            textDecoration: 'text-decoration',
            textRendering: 'text-rendering',
            transformOrigin: 'transform-origin',
            typeOf: 'typeof',
            underlinePosition: 'underline-position',
            underlineThickness: 'underline-thickness',
            unicodeBidi: 'unicode-bidi',
            unicodeRange: 'unicode-range',
            unitsPerEm: 'units-per-em',
            vAlphabetic: 'v-alphabetic',
            vHanging: 'v-hanging',
            vIdeographic: 'v-ideographic',
            vMathematical: 'v-mathematical',
            vectorEffect: 'vector-effect',
            vertAdvY: 'vert-adv-y',
            vertOriginX: 'vert-origin-x',
            vertOriginY: 'vert-origin-y',
            wordSpacing: 'word-spacing',
            writingMode: 'writing-mode',
            xHeight: 'x-height',
            playbackOrder: 'playbackorder',
            timelineBegin: 'timelinebegin'
        },
        transform: caseSensitiveTransform,
        properties: {
            about: commaOrSpaceSeparated,
            accentHeight: number$1,
            accumulate: null,
            additive: null,
            alignmentBaseline: null,
            alphabetic: number$1,
            amplitude: number$1,
            arabicForm: null,
            ascent: number$1,
            attributeName: null,
            attributeType: null,
            azimuth: number$1,
            bandwidth: null,
            baselineShift: null,
            baseFrequency: null,
            baseProfile: null,
            bbox: null,
            begin: null,
            bias: number$1,
            by: null,
            calcMode: null,
            capHeight: number$1,
            className: spaceSeparated,
            clip: null,
            clipPath: null,
            clipPathUnits: null,
            clipRule: null,
            color: null,
            colorInterpolation: null,
            colorInterpolationFilters: null,
            colorProfile: null,
            colorRendering: null,
            content: null,
            contentScriptType: null,
            contentStyleType: null,
            crossOrigin: null,
            cursor: null,
            cx: null,
            cy: null,
            d: null,
            dataType: null,
            defaultAction: null,
            descent: number$1,
            diffuseConstant: number$1,
            direction: null,
            display: null,
            dur: null,
            divisor: number$1,
            dominantBaseline: null,
            download: boolean$1,
            dx: null,
            dy: null,
            edgeMode: null,
            editable: null,
            elevation: number$1,
            enableBackground: null,
            end: null,
            event: null,
            exponent: number$1,
            externalResourcesRequired: null,
            fill: null,
            fillOpacity: number$1,
            fillRule: null,
            filter: null,
            filterRes: null,
            filterUnits: null,
            floodColor: null,
            floodOpacity: null,
            focusable: null,
            focusHighlight: null,
            fontFamily: null,
            fontSize: null,
            fontSizeAdjust: null,
            fontStretch: null,
            fontStyle: null,
            fontVariant: null,
            fontWeight: null,
            format: null,
            fr: null,
            from: null,
            fx: null,
            fy: null,
            g1: commaSeparated,
            g2: commaSeparated,
            glyphName: commaSeparated,
            glyphOrientationHorizontal: null,
            glyphOrientationVertical: null,
            glyphRef: null,
            gradientTransform: null,
            gradientUnits: null,
            handler: null,
            hanging: number$1,
            hatchContentUnits: null,
            hatchUnits: null,
            height: null,
            href: null,
            hrefLang: null,
            horizAdvX: number$1,
            horizOriginX: number$1,
            horizOriginY: number$1,
            id: null,
            ideographic: number$1,
            imageRendering: null,
            initialVisibility: null,
            in: null,
            in2: null,
            intercept: number$1,
            k: number$1,
            k1: number$1,
            k2: number$1,
            k3: number$1,
            k4: number$1,
            kernelMatrix: commaOrSpaceSeparated,
            kernelUnitLength: null,
            keyPoints: null,
            keySplines: null,
            keyTimes: null,
            kerning: null,
            lang: null,
            lengthAdjust: null,
            letterSpacing: null,
            lightingColor: null,
            limitingConeAngle: number$1,
            local: null,
            markerEnd: null,
            markerMid: null,
            markerStart: null,
            markerHeight: null,
            markerUnits: null,
            markerWidth: null,
            mask: null,
            maskContentUnits: null,
            maskUnits: null,
            mathematical: null,
            max: null,
            media: null,
            mediaCharacterEncoding: null,
            mediaContentEncodings: null,
            mediaSize: number$1,
            mediaTime: null,
            method: null,
            min: null,
            mode: null,
            name: null,
            navDown: null,
            navDownLeft: null,
            navDownRight: null,
            navLeft: null,
            navNext: null,
            navPrev: null,
            navRight: null,
            navUp: null,
            navUpLeft: null,
            navUpRight: null,
            numOctaves: null,
            observer: null,
            offset: null,
            onAbort: null,
            onActivate: null,
            onAfterPrint: null,
            onBeforePrint: null,
            onBegin: null,
            onCancel: null,
            onCanPlay: null,
            onCanPlayThrough: null,
            onChange: null,
            onClick: null,
            onClose: null,
            onCopy: null,
            onCueChange: null,
            onCut: null,
            onDblClick: null,
            onDrag: null,
            onDragEnd: null,
            onDragEnter: null,
            onDragExit: null,
            onDragLeave: null,
            onDragOver: null,
            onDragStart: null,
            onDrop: null,
            onDurationChange: null,
            onEmptied: null,
            onEnd: null,
            onEnded: null,
            onError: null,
            onFocus: null,
            onFocusIn: null,
            onFocusOut: null,
            onHashChange: null,
            onInput: null,
            onInvalid: null,
            onKeyDown: null,
            onKeyPress: null,
            onKeyUp: null,
            onLoad: null,
            onLoadedData: null,
            onLoadedMetadata: null,
            onLoadStart: null,
            onMessage: null,
            onMouseDown: null,
            onMouseEnter: null,
            onMouseLeave: null,
            onMouseMove: null,
            onMouseOut: null,
            onMouseOver: null,
            onMouseUp: null,
            onMouseWheel: null,
            onOffline: null,
            onOnline: null,
            onPageHide: null,
            onPageShow: null,
            onPaste: null,
            onPause: null,
            onPlay: null,
            onPlaying: null,
            onPopState: null,
            onProgress: null,
            onRateChange: null,
            onRepeat: null,
            onReset: null,
            onResize: null,
            onScroll: null,
            onSeeked: null,
            onSeeking: null,
            onSelect: null,
            onShow: null,
            onStalled: null,
            onStorage: null,
            onSubmit: null,
            onSuspend: null,
            onTimeUpdate: null,
            onToggle: null,
            onUnload: null,
            onVolumeChange: null,
            onWaiting: null,
            onZoom: null,
            opacity: null,
            operator: null,
            order: null,
            orient: null,
            orientation: null,
            origin: null,
            overflow: null,
            overlay: null,
            overlinePosition: number$1,
            overlineThickness: number$1,
            paintOrder: null,
            panose1: null,
            path: null,
            pathLength: number$1,
            patternContentUnits: null,
            patternTransform: null,
            patternUnits: null,
            phase: null,
            ping: spaceSeparated,
            pitch: null,
            playbackOrder: null,
            pointerEvents: null,
            points: null,
            pointsAtX: number$1,
            pointsAtY: number$1,
            pointsAtZ: number$1,
            preserveAlpha: null,
            preserveAspectRatio: null,
            primitiveUnits: null,
            propagate: null,
            property: commaOrSpaceSeparated,
            r: null,
            radius: null,
            referrerPolicy: null,
            refX: null,
            refY: null,
            rel: commaOrSpaceSeparated,
            rev: commaOrSpaceSeparated,
            renderingIntent: null,
            repeatCount: null,
            repeatDur: null,
            requiredExtensions: commaOrSpaceSeparated,
            requiredFeatures: commaOrSpaceSeparated,
            requiredFonts: commaOrSpaceSeparated,
            requiredFormats: commaOrSpaceSeparated,
            resource: null,
            restart: null,
            result: null,
            rotate: null,
            rx: null,
            ry: null,
            scale: null,
            seed: null,
            shapeRendering: null,
            side: null,
            slope: null,
            snapshotTime: null,
            specularConstant: number$1,
            specularExponent: number$1,
            spreadMethod: null,
            spacing: null,
            startOffset: null,
            stdDeviation: null,
            stemh: null,
            stemv: null,
            stitchTiles: null,
            stopColor: null,
            stopOpacity: null,
            strikethroughPosition: number$1,
            strikethroughThickness: number$1,
            string: null,
            stroke: null,
            strokeDashArray: commaOrSpaceSeparated,
            strokeDashOffset: null,
            strokeLineCap: null,
            strokeLineJoin: null,
            strokeMiterLimit: number$1,
            strokeOpacity: number$1,
            strokeWidth: null,
            style: null,
            surfaceScale: number$1,
            syncBehavior: null,
            syncBehaviorDefault: null,
            syncMaster: null,
            syncTolerance: null,
            syncToleranceDefault: null,
            systemLanguage: commaOrSpaceSeparated,
            tabIndex: number$1,
            tableValues: null,
            target: null,
            targetX: number$1,
            targetY: number$1,
            textAnchor: null,
            textDecoration: null,
            textRendering: null,
            textLength: null,
            timelineBegin: null,
            title: null,
            transformBehavior: null,
            type: null,
            typeOf: commaOrSpaceSeparated,
            to: null,
            transform: null,
            transformOrigin: null,
            u1: null,
            u2: null,
            underlinePosition: number$1,
            underlineThickness: number$1,
            unicode: null,
            unicodeBidi: null,
            unicodeRange: null,
            unitsPerEm: number$1,
            values: null,
            vAlphabetic: number$1,
            vMathematical: number$1,
            vectorEffect: null,
            vHanging: number$1,
            vIdeographic: number$1,
            version: null,
            vertAdvY: number$1,
            vertOriginX: number$1,
            vertOriginY: number$1,
            viewBox: null,
            viewTarget: null,
            visibility: null,
            width: null,
            widths: null,
            wordSpacing: null,
            writingMode: null,
            x: null,
            x1: null,
            x2: null,
            xChannelSelector: null,
            xHeight: number$1,
            y: null,
            y1: null,
            y2: null,
            yChannelSelector: null,
            z: null,
            zoomAndPan: null
        }
    });
    const valid = /^data[-\w.:]+$/i;
    const dash = /-[a-z]/g;
    const cap = /[A-Z]/g;
    function find(schema, value) {
        const normal = normalize(value);
        let prop = value;
        let Type = Info;
        if (normal in schema.normal) {
            return schema.property[schema.normal[normal]];
        }
        if (normal.length > 4 && normal.slice(0, 4) === 'data' && valid.test(value)) {
            if (value.charAt(4) === '-') {
                const rest = value.slice(5).replace(dash, camelcase);
                prop = 'data' + rest.charAt(0).toUpperCase() + rest.slice(1);
            } else {
                const rest = value.slice(4);
                if (!dash.test(rest)) {
                    let dashes = rest.replace(cap, kebab);
                    if (dashes.charAt(0) !== '-') {
                        dashes = '-' + dashes;
                    }
                    value = 'data' + dashes;
                }
            }
            Type = DefinedInfo;
        }
        return new Type(prop, value);
    }
    function kebab($0) {
        return '-' + $0.toLowerCase();
    }
    function camelcase($0) {
        return $0.charAt(1).toUpperCase();
    }
    const html$2 = merge([
        xml,
        xlink,
        xmlns,
        aria,
        html$3
    ], 'html');
    const svg = merge([
        xml,
        xlink,
        xmlns,
        aria,
        svg$1
    ], 'svg');
    const own$2 = {}.hasOwnProperty;
    function zwitch(key, options) {
        const settings = options || {};
        function one(value, ...parameters) {
            let fn = one.invalid;
            const handlers = one.handlers;
            if (value && own$2.call(value, key)) {
                const id = String(value[key]);
                fn = own$2.call(handlers, id) ? handlers[id] : one.unknown;
            }
            if (fn) {
                return fn.call(this, value, ...parameters);
            }
        }
        one.handlers = settings.handlers || {};
        one.invalid = settings.invalid;
        one.unknown = settings.unknown;
        return one;
    }
    function core(value, options) {
        value = value.replace(options.subset ? charactersToExpression(options.subset) : /["&'<>`]/g, basic);
        if (options.subset || options.escapeOnly) {
            return value;
        }
        return (value.replace(/[\uD800-\uDBFF][\uDC00-\uDFFF]/g, surrogate).replace(/[\x01-\t\v\f\x0E-\x1F\x7F\x81\x8D\x8F\x90\x9D\xA0-\uFFFF]/g, basic));
        function surrogate(pair, index, all) {
            return options.format((pair.charCodeAt(0) - 0xd800) * 0x400 + pair.charCodeAt(1) - 0xdc00 + 0x10000, all.charCodeAt(index + 2), options);
        }
        function basic(character, index, all) {
            return options.format(character.charCodeAt(0), all.charCodeAt(index + 1), options);
        }
    }
    function charactersToExpression(subset) {
        const groups = [];
        let index = -1;
        while(++index < subset.length){
            groups.push(subset[index].replace(/[|\\{}()[\]^$+*?.]/g, '\\$&'));
        }
        return new RegExp('(?:' + groups.join('|') + ')', 'g');
    }
    function toHexadecimal(code, next, omit) {
        const value = '&#x' + code.toString(16).toUpperCase();
        return omit && next && !/[\dA-Fa-f]/.test(String.fromCharCode(next)) ? value : value + ';';
    }
    function toDecimal(code, next, omit) {
        const value = '&#' + String(code);
        return omit && next && !/\d/.test(String.fromCharCode(next)) ? value : value + ';';
    }
    const characterEntitiesLegacy = [
        'AElig',
        'AMP',
        'Aacute',
        'Acirc',
        'Agrave',
        'Aring',
        'Atilde',
        'Auml',
        'COPY',
        'Ccedil',
        'ETH',
        'Eacute',
        'Ecirc',
        'Egrave',
        'Euml',
        'GT',
        'Iacute',
        'Icirc',
        'Igrave',
        'Iuml',
        'LT',
        'Ntilde',
        'Oacute',
        'Ocirc',
        'Ograve',
        'Oslash',
        'Otilde',
        'Ouml',
        'QUOT',
        'REG',
        'THORN',
        'Uacute',
        'Ucirc',
        'Ugrave',
        'Uuml',
        'Yacute',
        'aacute',
        'acirc',
        'acute',
        'aelig',
        'agrave',
        'amp',
        'aring',
        'atilde',
        'auml',
        'brvbar',
        'ccedil',
        'cedil',
        'cent',
        'copy',
        'curren',
        'deg',
        'divide',
        'eacute',
        'ecirc',
        'egrave',
        'eth',
        'euml',
        'frac12',
        'frac14',
        'frac34',
        'gt',
        'iacute',
        'icirc',
        'iexcl',
        'igrave',
        'iquest',
        'iuml',
        'laquo',
        'lt',
        'macr',
        'micro',
        'middot',
        'nbsp',
        'not',
        'ntilde',
        'oacute',
        'ocirc',
        'ograve',
        'ordf',
        'ordm',
        'oslash',
        'otilde',
        'ouml',
        'para',
        'plusmn',
        'pound',
        'quot',
        'raquo',
        'reg',
        'sect',
        'shy',
        'sup1',
        'sup2',
        'sup3',
        'szlig',
        'thorn',
        'times',
        'uacute',
        'ucirc',
        'ugrave',
        'uml',
        'uuml',
        'yacute',
        'yen',
        'yuml'
    ];
    const characterEntitiesHtml4 = {
        nbsp: ' ',
        iexcl: '¡',
        cent: '¢',
        pound: '£',
        curren: '¤',
        yen: '¥',
        brvbar: '¦',
        sect: '§',
        uml: '¨',
        copy: '©',
        ordf: 'ª',
        laquo: '«',
        not: '¬',
        shy: '­',
        reg: '®',
        macr: '¯',
        deg: '°',
        plusmn: '±',
        sup2: '²',
        sup3: '³',
        acute: '´',
        micro: 'µ',
        para: '¶',
        middot: '·',
        cedil: '¸',
        sup1: '¹',
        ordm: 'º',
        raquo: '»',
        frac14: '¼',
        frac12: '½',
        frac34: '¾',
        iquest: '¿',
        Agrave: 'À',
        Aacute: 'Á',
        Acirc: 'Â',
        Atilde: 'Ã',
        Auml: 'Ä',
        Aring: 'Å',
        AElig: 'Æ',
        Ccedil: 'Ç',
        Egrave: 'È',
        Eacute: 'É',
        Ecirc: 'Ê',
        Euml: 'Ë',
        Igrave: 'Ì',
        Iacute: 'Í',
        Icirc: 'Î',
        Iuml: 'Ï',
        ETH: 'Ð',
        Ntilde: 'Ñ',
        Ograve: 'Ò',
        Oacute: 'Ó',
        Ocirc: 'Ô',
        Otilde: 'Õ',
        Ouml: 'Ö',
        times: '×',
        Oslash: 'Ø',
        Ugrave: 'Ù',
        Uacute: 'Ú',
        Ucirc: 'Û',
        Uuml: 'Ü',
        Yacute: 'Ý',
        THORN: 'Þ',
        szlig: 'ß',
        agrave: 'à',
        aacute: 'á',
        acirc: 'â',
        atilde: 'ã',
        auml: 'ä',
        aring: 'å',
        aelig: 'æ',
        ccedil: 'ç',
        egrave: 'è',
        eacute: 'é',
        ecirc: 'ê',
        euml: 'ë',
        igrave: 'ì',
        iacute: 'í',
        icirc: 'î',
        iuml: 'ï',
        eth: 'ð',
        ntilde: 'ñ',
        ograve: 'ò',
        oacute: 'ó',
        ocirc: 'ô',
        otilde: 'õ',
        ouml: 'ö',
        divide: '÷',
        oslash: 'ø',
        ugrave: 'ù',
        uacute: 'ú',
        ucirc: 'û',
        uuml: 'ü',
        yacute: 'ý',
        thorn: 'þ',
        yuml: 'ÿ',
        fnof: 'ƒ',
        Alpha: 'Α',
        Beta: 'Β',
        Gamma: 'Γ',
        Delta: 'Δ',
        Epsilon: 'Ε',
        Zeta: 'Ζ',
        Eta: 'Η',
        Theta: 'Θ',
        Iota: 'Ι',
        Kappa: 'Κ',
        Lambda: 'Λ',
        Mu: 'Μ',
        Nu: 'Ν',
        Xi: 'Ξ',
        Omicron: 'Ο',
        Pi: 'Π',
        Rho: 'Ρ',
        Sigma: 'Σ',
        Tau: 'Τ',
        Upsilon: 'Υ',
        Phi: 'Φ',
        Chi: 'Χ',
        Psi: 'Ψ',
        Omega: 'Ω',
        alpha: 'α',
        beta: 'β',
        gamma: 'γ',
        delta: 'δ',
        epsilon: 'ε',
        zeta: 'ζ',
        eta: 'η',
        theta: 'θ',
        iota: 'ι',
        kappa: 'κ',
        lambda: 'λ',
        mu: 'μ',
        nu: 'ν',
        xi: 'ξ',
        omicron: 'ο',
        pi: 'π',
        rho: 'ρ',
        sigmaf: 'ς',
        sigma: 'σ',
        tau: 'τ',
        upsilon: 'υ',
        phi: 'φ',
        chi: 'χ',
        psi: 'ψ',
        omega: 'ω',
        thetasym: 'ϑ',
        upsih: 'ϒ',
        piv: 'ϖ',
        bull: '•',
        hellip: '…',
        prime: '′',
        Prime: '″',
        oline: '‾',
        frasl: '⁄',
        weierp: '℘',
        image: 'ℑ',
        real: 'ℜ',
        trade: '™',
        alefsym: 'ℵ',
        larr: '←',
        uarr: '↑',
        rarr: '→',
        darr: '↓',
        harr: '↔',
        crarr: '↵',
        lArr: '⇐',
        uArr: '⇑',
        rArr: '⇒',
        dArr: '⇓',
        hArr: '⇔',
        forall: '∀',
        part: '∂',
        exist: '∃',
        empty: '∅',
        nabla: '∇',
        isin: '∈',
        notin: '∉',
        ni: '∋',
        prod: '∏',
        sum: '∑',
        minus: '−',
        lowast: '∗',
        radic: '√',
        prop: '∝',
        infin: '∞',
        ang: '∠',
        and: '∧',
        or: '∨',
        cap: '∩',
        cup: '∪',
        int: '∫',
        there4: '∴',
        sim: '∼',
        cong: '≅',
        asymp: '≈',
        ne: '≠',
        equiv: '≡',
        le: '≤',
        ge: '≥',
        sub: '⊂',
        sup: '⊃',
        nsub: '⊄',
        sube: '⊆',
        supe: '⊇',
        oplus: '⊕',
        otimes: '⊗',
        perp: '⊥',
        sdot: '⋅',
        lceil: '⌈',
        rceil: '⌉',
        lfloor: '⌊',
        rfloor: '⌋',
        lang: '〈',
        rang: '〉',
        loz: '◊',
        spades: '♠',
        clubs: '♣',
        hearts: '♥',
        diams: '♦',
        quot: '"',
        amp: '&',
        lt: '<',
        gt: '>',
        OElig: 'Œ',
        oelig: 'œ',
        Scaron: 'Š',
        scaron: 'š',
        Yuml: 'Ÿ',
        circ: 'ˆ',
        tilde: '˜',
        ensp: ' ',
        emsp: ' ',
        thinsp: ' ',
        zwnj: '‌',
        zwj: '‍',
        lrm: '‎',
        rlm: '‏',
        ndash: '–',
        mdash: '—',
        lsquo: '‘',
        rsquo: '’',
        sbquo: '‚',
        ldquo: '“',
        rdquo: '”',
        bdquo: '„',
        dagger: '†',
        Dagger: '‡',
        permil: '‰',
        lsaquo: '‹',
        rsaquo: '›',
        euro: '€'
    };
    const dangerous = [
        'cent',
        'copy',
        'divide',
        'gt',
        'lt',
        'not',
        'para',
        'times'
    ];
    const own$1 = {}.hasOwnProperty;
    const characters = {};
    let key;
    for(key in characterEntitiesHtml4){
        if (own$1.call(characterEntitiesHtml4, key)) {
            characters[characterEntitiesHtml4[key]] = key;
        }
    }
    function toNamed(code, next, omit, attribute) {
        const character = String.fromCharCode(code);
        if (own$1.call(characters, character)) {
            const name = characters[character];
            const value = '&' + name;
            if (omit && characterEntitiesLegacy.includes(name) && !dangerous.includes(name) && (!attribute || (next && next !== 61 && /[^\da-z]/i.test(String.fromCharCode(next))))) {
                return value;
            }
            return value + ';';
        }
        return '';
    }
    function formatSmart(code, next, options) {
        let numeric = toHexadecimal(code, next, options.omitOptionalSemicolons);
        let named;
        if (options.useNamedReferences || options.useShortestReferences) {
            named = toNamed(code, next, options.omitOptionalSemicolons, options.attribute);
        }
        if ((options.useShortestReferences || !named) && options.useShortestReferences) {
            const decimal = toDecimal(code, next, options.omitOptionalSemicolons);
            if (decimal.length < numeric.length) {
                numeric = decimal;
            }
        }
        return named && (!options.useShortestReferences || named.length < numeric.length) ? named : numeric;
    }
    function stringifyEntities(value, options) {
        return core(value, Object.assign({
            format: formatSmart
        }, options));
    }
    const htmlCommentRegex = /^>|^->|<!--|-->|--!>|<!-$/g;
    const bogusCommentEntitySubset = [
        '>'
    ];
    const commentEntitySubset = [
        '<',
        '>'
    ];
    function comment$1(node, _1, _2, state) {
        return state.settings.bogusComments ? '<?' + stringifyEntities(node.value, Object.assign({}, state.settings.characterReferences, {
            subset: bogusCommentEntitySubset
        })) + '>' : '<!--' + node.value.replace(htmlCommentRegex, encode) + '-->';
        function encode($0) {
            return stringifyEntities($0, Object.assign({}, state.settings.characterReferences, {
                subset: commentEntitySubset
            }));
        }
    }
    function doctype(_1, _2, _3, state) {
        return ('<!' + (state.settings.upperDoctype ? 'DOCTYPE' : 'doctype') + (state.settings.tightDoctype ? '' : ' ') + 'html>');
    }
    function ccount(value, character) {
        const source = String(value);
        if (typeof character !== 'string') {
            throw new TypeError('Expected character');
        }
        let count = 0;
        let index = source.indexOf(character);
        while(index !== -1){
            count++;
            index = source.indexOf(character, index + character.length);
        }
        return count;
    }
    function stringify$1(values, options) {
        const settings = options || {};
        const input = values[values.length - 1] === '' ? [
            ...values,
            ''
        ] : values;
        return input.join((settings.padRight ? ' ' : '') + ',' + (settings.padLeft === false ? '' : ' ')).trim();
    }
    function stringify(values) {
        return values.join(' ').trim();
    }
    const re = /[ \t\n\f\r]/g;
    function whitespace(thing) {
        return typeof thing === 'object' ? thing.type === 'text' ? empty(thing.value) : false : empty(thing);
    }
    function empty(value) {
        return value.replace(re, '') === '';
    }
    const siblingAfter = siblings(1);
    const siblingBefore = siblings(-1);
    const emptyChildren$1 = [];
    function siblings(increment) {
        return sibling;
        function sibling(parent, index, includeWhitespace) {
            const siblings = parent ? parent.children : emptyChildren$1;
            let offset = (index || 0) + increment;
            let next = siblings[offset];
            if (!includeWhitespace) {
                while(next && whitespace(next)){
                    offset += increment;
                    next = siblings[offset];
                }
            }
            return next;
        }
    }
    const own = {}.hasOwnProperty;
    function omission(handlers) {
        return omit;
        function omit(node, index, parent) {
            return (own.call(handlers, node.tagName) && handlers[node.tagName](node, index, parent));
        }
    }
    const closing = omission({
        body: body$1,
        caption: headOrColgroupOrCaption,
        colgroup: headOrColgroupOrCaption,
        dd,
        dt,
        head: headOrColgroupOrCaption,
        html: html$1,
        li,
        optgroup,
        option,
        p,
        rp: rubyElement,
        rt: rubyElement,
        tbody: tbody$1,
        td: cells,
        tfoot,
        th: cells,
        thead,
        tr
    });
    function headOrColgroupOrCaption(_, index, parent) {
        const next = siblingAfter(parent, index, true);
        return (!next || (next.type !== 'comment' && !(next.type === 'text' && whitespace(next.value.charAt(0)))));
    }
    function html$1(_, index, parent) {
        const next = siblingAfter(parent, index);
        return !next || next.type !== 'comment';
    }
    function body$1(_, index, parent) {
        const next = siblingAfter(parent, index);
        return !next || next.type !== 'comment';
    }
    function p(_, index, parent) {
        const next = siblingAfter(parent, index);
        return next ? next.type === 'element' && (next.tagName === 'address' || next.tagName === 'article' || next.tagName === 'aside' || next.tagName === 'blockquote' || next.tagName === 'details' || next.tagName === 'div' || next.tagName === 'dl' || next.tagName === 'fieldset' || next.tagName === 'figcaption' || next.tagName === 'figure' || next.tagName === 'footer' || next.tagName === 'form' || next.tagName === 'h1' || next.tagName === 'h2' || next.tagName === 'h3' || next.tagName === 'h4' || next.tagName === 'h5' || next.tagName === 'h6' || next.tagName === 'header' || next.tagName === 'hgroup' || next.tagName === 'hr' || next.tagName === 'main' || next.tagName === 'menu' || next.tagName === 'nav' || next.tagName === 'ol' || next.tagName === 'p' || next.tagName === 'pre' || next.tagName === 'section' || next.tagName === 'table' || next.tagName === 'ul') : !parent || !(parent.type === 'element' && (parent.tagName === 'a' || parent.tagName === 'audio' || parent.tagName === 'del' || parent.tagName === 'ins' || parent.tagName === 'map' || parent.tagName === 'noscript' || parent.tagName === 'video'));
    }
    function li(_, index, parent) {
        const next = siblingAfter(parent, index);
        return !next || (next.type === 'element' && next.tagName === 'li');
    }
    function dt(_, index, parent) {
        const next = siblingAfter(parent, index);
        return Boolean(next && next.type === 'element' && (next.tagName === 'dt' || next.tagName === 'dd'));
    }
    function dd(_, index, parent) {
        const next = siblingAfter(parent, index);
        return (!next || (next.type === 'element' && (next.tagName === 'dt' || next.tagName === 'dd')));
    }
    function rubyElement(_, index, parent) {
        const next = siblingAfter(parent, index);
        return (!next || (next.type === 'element' && (next.tagName === 'rp' || next.tagName === 'rt')));
    }
    function optgroup(_, index, parent) {
        const next = siblingAfter(parent, index);
        return !next || (next.type === 'element' && next.tagName === 'optgroup');
    }
    function option(_, index, parent) {
        const next = siblingAfter(parent, index);
        return (!next || (next.type === 'element' && (next.tagName === 'option' || next.tagName === 'optgroup')));
    }
    function thead(_, index, parent) {
        const next = siblingAfter(parent, index);
        return Boolean(next && next.type === 'element' && (next.tagName === 'tbody' || next.tagName === 'tfoot'));
    }
    function tbody$1(_, index, parent) {
        const next = siblingAfter(parent, index);
        return (!next || (next.type === 'element' && (next.tagName === 'tbody' || next.tagName === 'tfoot')));
    }
    function tfoot(_, index, parent) {
        return !siblingAfter(parent, index);
    }
    function tr(_, index, parent) {
        const next = siblingAfter(parent, index);
        return !next || (next.type === 'element' && next.tagName === 'tr');
    }
    function cells(_, index, parent) {
        const next = siblingAfter(parent, index);
        return (!next || (next.type === 'element' && (next.tagName === 'td' || next.tagName === 'th')));
    }
    const opening = omission({
        body,
        colgroup,
        head,
        html,
        tbody
    });
    function html(node) {
        const head = siblingAfter(node, -1);
        return !head || head.type !== 'comment';
    }
    function head(node) {
        const children = node.children;
        const seen = [];
        let index = -1;
        while(++index < children.length){
            const child = children[index];
            if (child.type === 'element' && (child.tagName === 'title' || child.tagName === 'base')) {
                if (seen.includes(child.tagName)) return false;
                seen.push(child.tagName);
            }
        }
        return children.length > 0;
    }
    function body(node) {
        const head = siblingAfter(node, -1, true);
        return (!head || (head.type !== 'comment' && !(head.type === 'text' && whitespace(head.value.charAt(0))) && !(head.type === 'element' && (head.tagName === 'meta' || head.tagName === 'link' || head.tagName === 'script' || head.tagName === 'style' || head.tagName === 'template'))));
    }
    function colgroup(node, index, parent) {
        const previous = siblingBefore(parent, index);
        const head = siblingAfter(node, -1, true);
        if (parent && previous && previous.type === 'element' && previous.tagName === 'colgroup' && closing(previous, parent.children.indexOf(previous), parent)) {
            return false;
        }
        return Boolean(head && head.type === 'element' && head.tagName === 'col');
    }
    function tbody(node, index, parent) {
        const previous = siblingBefore(parent, index);
        const head = siblingAfter(node, -1);
        if (parent && previous && previous.type === 'element' && (previous.tagName === 'thead' || previous.tagName === 'tbody') && closing(previous, parent.children.indexOf(previous), parent)) {
            return false;
        }
        return Boolean(head && head.type === 'element' && head.tagName === 'tr');
    }
    const constants = {
        name: [
            [
                '\t\n\f\r &/=>'.split(''),
                '\t\n\f\r "&\'/=>`'.split('')
            ],
            [
                '\0\t\n\f\r "&\'/<=>'.split(''),
                '\0\t\n\f\r "&\'/<=>`'.split('')
            ]
        ],
        unquoted: [
            [
                '\t\n\f\r &>'.split(''),
                '\0\t\n\f\r "&\'<=>`'.split('')
            ],
            [
                '\0\t\n\f\r "&\'<=>`'.split(''),
                '\0\t\n\f\r "&\'<=>`'.split('')
            ]
        ],
        single: [
            [
                "&'".split(''),
                '"&\'`'.split('')
            ],
            [
                "\0&'".split(''),
                '\0"&\'`'.split('')
            ]
        ],
        double: [
            [
                '"&'.split(''),
                '"&\'`'.split('')
            ],
            [
                '\0"&'.split(''),
                '\0"&\'`'.split('')
            ]
        ]
    };
    function element(node, index, parent, state) {
        const schema = state.schema;
        const omit = schema.space === 'svg' ? false : state.settings.omitOptionalTags;
        let selfClosing = schema.space === 'svg' ? state.settings.closeEmptyElements : state.settings.voids.includes(node.tagName.toLowerCase());
        const parts = [];
        let last;
        if (schema.space === 'html' && node.tagName === 'svg') {
            state.schema = svg;
        }
        const attributes = serializeAttributes(state, node.properties);
        const content = state.all(schema.space === 'html' && node.tagName === 'template' ? node.content : node);
        state.schema = schema;
        if (content) selfClosing = false;
        if (attributes || !omit || !opening(node, index, parent)) {
            parts.push('<', node.tagName, attributes ? ' ' + attributes : '');
            if (selfClosing && (schema.space === 'svg' || state.settings.closeSelfClosing)) {
                last = attributes.charAt(attributes.length - 1);
                if (!state.settings.tightSelfClosing || last === '/' || (last && last !== '"' && last !== "'")) {
                    parts.push(' ');
                }
                parts.push('/');
            }
            parts.push('>');
        }
        parts.push(content);
        if (!selfClosing && (!omit || !closing(node, index, parent))) {
            parts.push('</' + node.tagName + '>');
        }
        return parts.join('');
    }
    function serializeAttributes(state, properties) {
        const values = [];
        let index = -1;
        let key;
        if (properties) {
            for(key in properties){
                if (properties[key] !== null && properties[key] !== undefined) {
                    const value = serializeAttribute(state, key, properties[key]);
                    if (value) values.push(value);
                }
            }
        }
        while(++index < values.length){
            const last = state.settings.tightAttributes ? values[index].charAt(values[index].length - 1) : undefined;
            if (index !== values.length - 1 && last !== '"' && last !== "'") {
                values[index] += ' ';
            }
        }
        return values.join('');
    }
    function serializeAttribute(state, key, value) {
        const info = find(state.schema, key);
        const x = state.settings.allowParseErrors && state.schema.space === 'html' ? 0 : 1;
        const y = state.settings.allowDangerousCharacters ? 0 : 1;
        let quote = state.quote;
        let result;
        if (info.overloadedBoolean && (value === info.attribute || value === '')) {
            value = true;
        } else if (info.boolean || (info.overloadedBoolean && typeof value !== 'string')) {
            value = Boolean(value);
        }
        if (value === null || value === undefined || value === false || (typeof value === 'number' && Number.isNaN(value))) {
            return '';
        }
        const name = stringifyEntities(info.attribute, Object.assign({}, state.settings.characterReferences, {
            subset: constants.name[x][y]
        }));
        if (value === true) return name;
        value = Array.isArray(value) ? (info.commaSeparated ? stringify$1 : stringify)(value, {
            padLeft: !state.settings.tightCommaSeparatedLists
        }) : String(value);
        if (state.settings.collapseEmptyAttributes && !value) return name;
        if (state.settings.preferUnquoted) {
            result = stringifyEntities(value, Object.assign({}, state.settings.characterReferences, {
                attribute: true,
                subset: constants.unquoted[x][y]
            }));
        }
        if (result !== value) {
            if (state.settings.quoteSmart && ccount(value, quote) > ccount(value, state.alternative)) {
                quote = state.alternative;
            }
            result = quote + stringifyEntities(value, Object.assign({}, state.settings.characterReferences, {
                subset: (quote === "'" ? constants.single : constants.double)[x][y],
                attribute: true
            })) + quote;
        }
        return name + (result ? '=' + result : result);
    }
    const textEntitySubset = [
        '<',
        '&'
    ];
    function text(node, _, parent, state) {
        return parent && parent.type === 'element' && (parent.tagName === 'script' || parent.tagName === 'style') ? node.value : stringifyEntities(node.value, Object.assign({}, state.settings.characterReferences, {
            subset: textEntitySubset
        }));
    }
    function raw(node, index, parent, state) {
        return state.settings.allowDangerousHtml ? node.value : text(node, index, parent, state);
    }
    function root(node, _1, _2, state) {
        return state.all(node);
    }
    const handle = zwitch('type', {
        invalid,
        unknown,
        handlers: {
            comment: comment$1,
            doctype,
            element,
            raw,
            root,
            text
        }
    });
    function invalid(node) {
        throw new Error('Expected node, not `' + node + '`');
    }
    function unknown(node_) {
        const node = (node_);
        throw new Error('Cannot compile unknown node `' + node.type + '`');
    }
    const emptyOptions = {};
    const emptyCharacterReferences = {};
    const emptyChildren = [];
    function toHtml(tree, options) {
        const options_ = emptyOptions;
        const quote = options_.quote || '"';
        const alternative = quote === '"' ? "'" : '"';
        if (quote !== '"' && quote !== "'") {
            throw new Error('Invalid quote `' + quote + '`, expected `\'` or `"`');
        }
        const state = {
            one,
            all,
            settings: {
                omitOptionalTags: options_.omitOptionalTags || false,
                allowParseErrors: options_.allowParseErrors || false,
                allowDangerousCharacters: options_.allowDangerousCharacters || false,
                quoteSmart: options_.quoteSmart || false,
                preferUnquoted: options_.preferUnquoted || false,
                tightAttributes: options_.tightAttributes || false,
                upperDoctype: options_.upperDoctype || false,
                tightDoctype: options_.tightDoctype || false,
                bogusComments: options_.bogusComments || false,
                tightCommaSeparatedLists: options_.tightCommaSeparatedLists || false,
                tightSelfClosing: options_.tightSelfClosing || false,
                collapseEmptyAttributes: options_.collapseEmptyAttributes || false,
                allowDangerousHtml: options_.allowDangerousHtml || false,
                voids: options_.voids || htmlVoidElements,
                characterReferences: options_.characterReferences || emptyCharacterReferences,
                closeSelfClosing: options_.closeSelfClosing || false,
                closeEmptyElements: options_.closeEmptyElements || false
            },
            schema: options_.space === 'svg' ? svg : html$2,
            quote,
            alternative
        };
        return state.one(Array.isArray(tree) ? {
            type: 'root',
            children: tree
        } : tree, undefined, undefined);
    }
    function one(node, index, parent) {
        return handle(node, index, parent, this);
    }
    function all(parent) {
        const results = [];
        const children = (parent && parent.children) || emptyChildren;
        let index = -1;
        while(++index < children.length){
            results[index] = this.one(children[index], index, parent);
        }
        return results.join('');
    }
    function codeToHtml$1(internal, code, options) {
        const context = {
            meta: {},
            options,
            codeToHast: (_code, _options)=>codeToHast$1(internal, _code, _options),
            codeToTokens: (_code, _options)=>codeToTokens$1(internal, _code, _options)
        };
        let result = toHtml(codeToHast$1(internal, code, options, context));
        for (const transformer of getTransformers(options))result = transformer.postprocess?.call(context, result, options) || result;
        return result;
    }
    async function main(init) {
        let wasmMemory;
        let buffer;
        const binding = {};
        function updateGlobalBufferAndViews(buf) {
            buffer = buf;
            binding.HEAPU8 = new Uint8Array(buf);
            binding.HEAPU32 = new Uint32Array(buf);
        }
        function _emscripten_get_now() {
            return typeof performance !== 'undefined' ? performance.now() : Date.now();
        }
        function _emscripten_memcpy_big(dest, src, num) {
            binding.HEAPU8.copyWithin(dest, src, src + num);
        }
        function getHeapMax() {
            return 2147483648;
        }
        function emscripten_realloc_buffer(size) {
            try {
                wasmMemory.grow((size - buffer.byteLength + 65535) >>> 16);
                updateGlobalBufferAndViews(wasmMemory.buffer);
                return 1;
            } catch (e) {}
        }
        function _emscripten_resize_heap(requestedSize) {
            const oldSize = binding.HEAPU8.length;
            requestedSize = requestedSize >>> 0;
            const maxHeapSize = getHeapMax();
            if (requestedSize > maxHeapSize) return false;
            const alignUp = (x, multiple)=>x + ((multiple - (x % multiple)) % multiple);
            for(let cutDown = 1; cutDown <= 4; cutDown *= 2){
                let overGrownHeapSize = oldSize * (1 + 0.2 / cutDown);
                overGrownHeapSize = Math.min(overGrownHeapSize, requestedSize + 100663296);
                const newSize = Math.min(maxHeapSize, alignUp(Math.max(requestedSize, overGrownHeapSize), 65536));
                const replacement = emscripten_realloc_buffer(newSize);
                if (replacement) return true;
            }
            return false;
        }
        const asmLibraryArg = {
            emscripten_get_now: _emscripten_get_now,
            emscripten_memcpy_big: _emscripten_memcpy_big,
            emscripten_resize_heap: _emscripten_resize_heap,
            fd_write: ()=>0
        };
        async function createWasm() {
            const info = {
                env: asmLibraryArg,
                wasi_snapshot_preview1: asmLibraryArg
            };
            const exports = await init(info);
            wasmMemory = exports.memory;
            updateGlobalBufferAndViews(wasmMemory.buffer);
            Object.assign(binding, exports);
        }
        await createWasm();
        return binding;
    }
    let onigBinding = null;
    let defaultDebugCall = false;
    function throwLastOnigError(onigBinding) {
        throw new ShikiError(onigBinding.UTF8ToString(onigBinding.getLastOnigError()));
    }
    class UtfString {
        static _utf8ByteLength(str) {
            let result = 0;
            for(let i = 0, len = str.length; i < len; i++){
                const charCode = str.charCodeAt(i);
                let codepoint = charCode;
                let wasSurrogatePair = false;
                if (charCode >= 0xD800 && charCode <= 0xDBFF) {
                    if (i + 1 < len) {
                        const nextCharCode = str.charCodeAt(i + 1);
                        if (nextCharCode >= 0xDC00 && nextCharCode <= 0xDFFF) {
                            codepoint = (((charCode - 0xD800) << 10) + 0x10000) | (nextCharCode - 0xDC00);
                            wasSurrogatePair = true;
                        }
                    }
                }
                if (codepoint <= 0x7F) result += 1;
                else if (codepoint <= 0x7FF) result += 2;
                else if (codepoint <= 0xFFFF) result += 3;
                else result += 4;
                if (wasSurrogatePair) i++;
            }
            return result;
        }
        utf16Length;
        utf8Length;
        utf16Value;
        utf8Value;
        utf16OffsetToUtf8;
        utf8OffsetToUtf16;
        constructor(str){
            const utf16Length = str.length;
            const utf8Length = UtfString._utf8ByteLength(str);
            const computeIndicesMapping = (utf8Length !== utf16Length);
            const utf16OffsetToUtf8 = computeIndicesMapping ? new Uint32Array(utf16Length + 1) : null;
            if (computeIndicesMapping) utf16OffsetToUtf8[utf16Length] = utf8Length;
            const utf8OffsetToUtf16 = computeIndicesMapping ? new Uint32Array(utf8Length + 1) : null;
            if (computeIndicesMapping) utf8OffsetToUtf16[utf8Length] = utf16Length;
            const utf8Value = new Uint8Array(utf8Length);
            let i8 = 0;
            for(let i16 = 0; i16 < utf16Length; i16++){
                const charCode = str.charCodeAt(i16);
                let codePoint = charCode;
                let wasSurrogatePair = false;
                if (charCode >= 0xD800 && charCode <= 0xDBFF) {
                    if (i16 + 1 < utf16Length) {
                        const nextCharCode = str.charCodeAt(i16 + 1);
                        if (nextCharCode >= 0xDC00 && nextCharCode <= 0xDFFF) {
                            codePoint = (((charCode - 0xD800) << 10) + 0x10000) | (nextCharCode - 0xDC00);
                            wasSurrogatePair = true;
                        }
                    }
                }
                if (computeIndicesMapping) {
                    utf16OffsetToUtf8[i16] = i8;
                    if (wasSurrogatePair) utf16OffsetToUtf8[i16 + 1] = i8;
                    if (codePoint <= 0x7F) {
                        utf8OffsetToUtf16[i8 + 0] = i16;
                    } else if (codePoint <= 0x7FF) {
                        utf8OffsetToUtf16[i8 + 0] = i16;
                        utf8OffsetToUtf16[i8 + 1] = i16;
                    } else if (codePoint <= 0xFFFF) {
                        utf8OffsetToUtf16[i8 + 0] = i16;
                        utf8OffsetToUtf16[i8 + 1] = i16;
                        utf8OffsetToUtf16[i8 + 2] = i16;
                    } else {
                        utf8OffsetToUtf16[i8 + 0] = i16;
                        utf8OffsetToUtf16[i8 + 1] = i16;
                        utf8OffsetToUtf16[i8 + 2] = i16;
                        utf8OffsetToUtf16[i8 + 3] = i16;
                    }
                }
                if (codePoint <= 0x7F) {
                    utf8Value[i8++] = codePoint;
                } else if (codePoint <= 0x7FF) {
                    utf8Value[i8++] = 192 | ((codePoint & 1984) >>> 6);
                    utf8Value[i8++] = 128 | ((codePoint & 63) >>> 0);
                } else if (codePoint <= 0xFFFF) {
                    utf8Value[i8++] = 224 | ((codePoint & 61440) >>> 12);
                    utf8Value[i8++] = 128 | ((codePoint & 4032) >>> 6);
                    utf8Value[i8++] = 128 | ((codePoint & 63) >>> 0);
                } else {
                    utf8Value[i8++] = 240 | ((codePoint & 1835008) >>> 18);
                    utf8Value[i8++] = 128 | ((codePoint & 258048) >>> 12);
                    utf8Value[i8++] = 128 | ((codePoint & 4032) >>> 6);
                    utf8Value[i8++] = 128 | ((codePoint & 63) >>> 0);
                }
                if (wasSurrogatePair) i16++;
            }
            this.utf16Length = utf16Length;
            this.utf8Length = utf8Length;
            this.utf16Value = str;
            this.utf8Value = utf8Value;
            this.utf16OffsetToUtf8 = utf16OffsetToUtf8;
            this.utf8OffsetToUtf16 = utf8OffsetToUtf16;
        }
        createString(onigBinding) {
            const result = onigBinding.omalloc(this.utf8Length);
            onigBinding.HEAPU8.set(this.utf8Value, result);
            return result;
        }
    }
    class OnigString {
        static LAST_ID = 0;
        static _sharedPtr = 0;
        static _sharedPtrInUse = false;
        id = (++OnigString.LAST_ID);
        _onigBinding;
        content;
        utf16Length;
        utf8Length;
        utf16OffsetToUtf8;
        utf8OffsetToUtf16;
        ptr;
        constructor(str){
            if (!onigBinding) throw new ShikiError('Must invoke loadWasm first.');
            this._onigBinding = onigBinding;
            this.content = str;
            const utfString = new UtfString(str);
            this.utf16Length = utfString.utf16Length;
            this.utf8Length = utfString.utf8Length;
            this.utf16OffsetToUtf8 = utfString.utf16OffsetToUtf8;
            this.utf8OffsetToUtf16 = utfString.utf8OffsetToUtf16;
            if (this.utf8Length < 10000 && !OnigString._sharedPtrInUse) {
                if (!OnigString._sharedPtr) OnigString._sharedPtr = onigBinding.omalloc(10000);
                OnigString._sharedPtrInUse = true;
                onigBinding.HEAPU8.set(utfString.utf8Value, OnigString._sharedPtr);
                this.ptr = OnigString._sharedPtr;
            } else {
                this.ptr = utfString.createString(onigBinding);
            }
        }
        convertUtf8OffsetToUtf16(utf8Offset) {
            if (this.utf8OffsetToUtf16) {
                if (utf8Offset < 0) return 0;
                if (utf8Offset > this.utf8Length) return this.utf16Length;
                return this.utf8OffsetToUtf16[utf8Offset];
            }
            return utf8Offset;
        }
        convertUtf16OffsetToUtf8(utf16Offset) {
            if (this.utf16OffsetToUtf8) {
                if (utf16Offset < 0) return 0;
                if (utf16Offset > this.utf16Length) return this.utf8Length;
                return this.utf16OffsetToUtf8[utf16Offset];
            }
            return utf16Offset;
        }
        dispose() {
            if (this.ptr === OnigString._sharedPtr) OnigString._sharedPtrInUse = false;
            else this._onigBinding.ofree(this.ptr);
        }
    }
    class OnigScanner {
        _onigBinding;
        _ptr;
        constructor(patterns){
            if (!onigBinding) throw new ShikiError('Must invoke loadWasm first.');
            const strPtrsArr = [];
            const strLenArr = [];
            for(let i = 0, len = patterns.length; i < len; i++){
                const utfString = new UtfString(patterns[i]);
                strPtrsArr[i] = utfString.createString(onigBinding);
                strLenArr[i] = utfString.utf8Length;
            }
            const strPtrsPtr = onigBinding.omalloc(4 * patterns.length);
            onigBinding.HEAPU32.set(strPtrsArr, strPtrsPtr / 4);
            const strLenPtr = onigBinding.omalloc(4 * patterns.length);
            onigBinding.HEAPU32.set(strLenArr, strLenPtr / 4);
            const scannerPtr = onigBinding.createOnigScanner(strPtrsPtr, strLenPtr, patterns.length);
            for(let i = 0, len = patterns.length; i < len; i++)onigBinding.ofree(strPtrsArr[i]);
            onigBinding.ofree(strLenPtr);
            onigBinding.ofree(strPtrsPtr);
            if (scannerPtr === 0) throwLastOnigError(onigBinding);
            this._onigBinding = onigBinding;
            this._ptr = scannerPtr;
        }
        dispose() {
            this._onigBinding.freeOnigScanner(this._ptr);
        }
        findNextMatchSync(string, startPosition, arg) {
            let debugCall = defaultDebugCall;
            let options = 0;
            if (typeof arg === 'number') {
                if (arg & 8) debugCall = true;
                options = arg;
            } else if (typeof arg === 'boolean') {
                debugCall = arg;
            }
            if (typeof string === 'string') {
                string = new OnigString(string);
                const result = this._findNextMatchSync(string, startPosition, debugCall, options);
                string.dispose();
                return result;
            }
            return this._findNextMatchSync(string, startPosition, debugCall, options);
        }
        _findNextMatchSync(string, startPosition, debugCall, options) {
            const onigBinding = this._onigBinding;
            let resultPtr;
            if (debugCall) resultPtr = onigBinding.findNextOnigScannerMatchDbg(this._ptr, string.id, string.ptr, string.utf8Length, string.convertUtf16OffsetToUtf8(startPosition), options);
            else resultPtr = onigBinding.findNextOnigScannerMatch(this._ptr, string.id, string.ptr, string.utf8Length, string.convertUtf16OffsetToUtf8(startPosition), options);
            if (resultPtr === 0) {
                return null;
            }
            const HEAPU32 = onigBinding.HEAPU32;
            let offset = resultPtr / 4;
            const index = HEAPU32[offset++];
            const count = HEAPU32[offset++];
            const captureIndices = [];
            for(let i = 0; i < count; i++){
                const beg = string.convertUtf8OffsetToUtf16(HEAPU32[offset++]);
                const end = string.convertUtf8OffsetToUtf16(HEAPU32[offset++]);
                captureIndices[i] = {
                    start: beg,
                    end,
                    length: end - beg
                };
            }
            return {
                index,
                captureIndices
            };
        }
    }
    function isInstantiatorOptionsObject(dataOrOptions) {
        return (typeof dataOrOptions.instantiator === 'function');
    }
    function isInstantiatorModule(dataOrOptions) {
        return (typeof dataOrOptions.default === 'function');
    }
    function isDataOptionsObject(dataOrOptions) {
        return (typeof dataOrOptions.data !== 'undefined');
    }
    function isResponse(dataOrOptions) {
        return (typeof Response !== 'undefined' && dataOrOptions instanceof Response);
    }
    function isArrayBuffer(data) {
        return (typeof ArrayBuffer !== 'undefined' && (data instanceof ArrayBuffer || ArrayBuffer.isView(data))) || (typeof Buffer !== 'undefined' && Buffer.isBuffer?.(data)) || (typeof SharedArrayBuffer !== 'undefined' && data instanceof SharedArrayBuffer) || (typeof Uint32Array !== 'undefined' && data instanceof Uint32Array);
    }
    let initPromise;
    function loadWasm(options) {
        if (initPromise) return initPromise;
        async function _load() {
            onigBinding = await main(async (info)=>{
                let instance = options;
                instance = await instance;
                if (typeof instance === 'function') instance = await instance(info);
                if (typeof instance === 'function') instance = await instance(info);
                if (isInstantiatorOptionsObject(instance)) {
                    instance = await instance.instantiator(info);
                } else if (isInstantiatorModule(instance)) {
                    instance = await instance.default(info);
                } else {
                    if (isDataOptionsObject(instance)) instance = instance.data;
                    if (isResponse(instance)) {
                        if (typeof WebAssembly.instantiateStreaming === 'function') instance = await _makeResponseStreamingLoader(instance)(info);
                        else instance = await _makeResponseNonStreamingLoader(instance)(info);
                    } else if (isArrayBuffer(instance)) {
                        instance = await _makeArrayBufferLoader(instance)(info);
                    } else if (instance instanceof WebAssembly.Module) {
                        instance = await _makeArrayBufferLoader(instance)(info);
                    } else if ('default' in instance && instance.default instanceof WebAssembly.Module) {
                        instance = await _makeArrayBufferLoader(instance.default)(info);
                    }
                }
                if ('instance' in instance) instance = instance.instance;
                if ('exports' in instance) instance = instance.exports;
                return instance;
            });
        }
        initPromise = _load();
        return initPromise;
    }
    function _makeArrayBufferLoader(data) {
        return (importObject)=>WebAssembly.instantiate(data, importObject);
    }
    function _makeResponseStreamingLoader(data) {
        return (importObject)=>WebAssembly.instantiateStreaming(data, importObject);
    }
    function _makeResponseNonStreamingLoader(data) {
        return async (importObject)=>{
            const arrayBuffer = await data.arrayBuffer();
            return WebAssembly.instantiate(arrayBuffer, importObject);
        };
    }
    function createOnigString(str) {
        return new OnigString(str);
    }
    function createOnigScanner(patterns) {
        return new OnigScanner(patterns);
    }
    const VSCODE_FALLBACK_EDITOR_FG = {
        light: '#333333',
        dark: '#bbbbbb'
    };
    const VSCODE_FALLBACK_EDITOR_BG = {
        light: '#fffffe',
        dark: '#1e1e1e'
    };
    const RESOLVED_KEY = '__shiki_resolved';
    function normalizeTheme(rawTheme) {
        if (rawTheme?.[RESOLVED_KEY]) return rawTheme;
        const theme = {
            ...rawTheme
        };
        if (theme.tokenColors && !theme.settings) {
            theme.settings = theme.tokenColors;
            delete theme.tokenColors;
        }
        theme.type ||= 'dark';
        theme.colorReplacements = {
            ...theme.colorReplacements
        };
        theme.settings ||= [];
        let { bg, fg } = theme;
        if (!bg || !fg) {
            const globalSetting = theme.settings ? theme.settings.find((s)=>!s.name && !s.scope) : undefined;
            if (globalSetting?.settings?.foreground) fg = globalSetting.settings.foreground;
            if (globalSetting?.settings?.background) bg = globalSetting.settings.background;
            if (!fg && theme?.colors?.['editor.foreground']) fg = theme.colors['editor.foreground'];
            if (!bg && theme?.colors?.['editor.background']) bg = theme.colors['editor.background'];
            if (!fg) fg = theme.type === 'light' ? VSCODE_FALLBACK_EDITOR_FG.light : VSCODE_FALLBACK_EDITOR_FG.dark;
            if (!bg) bg = theme.type === 'light' ? VSCODE_FALLBACK_EDITOR_BG.light : VSCODE_FALLBACK_EDITOR_BG.dark;
            theme.fg = fg;
            theme.bg = bg;
        }
        if (!(theme.settings[0] && theme.settings[0].settings && !theme.settings[0].scope)) {
            theme.settings.unshift({
                settings: {
                    foreground: theme.fg,
                    background: theme.bg
                }
            });
        }
        let replacementCount = 0;
        const replacementMap = new Map();
        function getReplacementColor(value) {
            if (replacementMap.has(value)) return replacementMap.get(value);
            replacementCount += 1;
            const hex = `#${replacementCount.toString(16).padStart(8, '0').toLowerCase()}`;
            if (theme.colorReplacements?.[`#${hex}`]) return getReplacementColor(value);
            replacementMap.set(value, hex);
            return hex;
        }
        theme.settings = theme.settings.map((setting)=>{
            const replaceFg = setting.settings?.foreground && !setting.settings.foreground.startsWith('#');
            const replaceBg = setting.settings?.background && !setting.settings.background.startsWith('#');
            if (!replaceFg && !replaceBg) return setting;
            const clone = {
                ...setting,
                settings: {
                    ...setting.settings
                }
            };
            if (replaceFg) {
                const replacement = getReplacementColor(setting.settings.foreground);
                theme.colorReplacements[replacement] = setting.settings.foreground;
                clone.settings.foreground = replacement;
            }
            if (replaceBg) {
                const replacement = getReplacementColor(setting.settings.background);
                theme.colorReplacements[replacement] = setting.settings.background;
                clone.settings.background = replacement;
            }
            return clone;
        });
        for (const key of Object.keys(theme.colors || {})){
            if (key === 'editor.foreground' || key === 'editor.background' || key.startsWith('terminal.ansi')) {
                if (!theme.colors[key]?.startsWith('#')) {
                    const replacement = getReplacementColor(theme.colors[key]);
                    theme.colorReplacements[replacement] = theme.colors[key];
                    theme.colors[key] = replacement;
                }
            }
        }
        Object.defineProperty(theme, RESOLVED_KEY, {
            enumerable: false,
            writable: false,
            value: true
        });
        return theme;
    }
    class Registry extends Registry$1 {
        _resolver;
        _themes;
        _langs;
        _alias;
        _resolvedThemes = {};
        _resolvedGrammars = {};
        _langMap = {};
        _langGraph = new Map();
        _textmateThemeCache = new WeakMap();
        _loadedThemesCache = null;
        _loadedLanguagesCache = null;
        constructor(_resolver, _themes, _langs, _alias = {}){
            super(_resolver);
            this._resolver = _resolver;
            this._themes = _themes;
            this._langs = _langs;
            this._alias = _alias;
            _themes.forEach((t)=>this.loadTheme(t));
            _langs.forEach((l)=>this.loadLanguage(l));
        }
        getTheme(theme) {
            if (typeof theme === 'string') return this._resolvedThemes[theme];
            else return this.loadTheme(theme);
        }
        loadTheme(theme) {
            const _theme = normalizeTheme(theme);
            if (_theme.name) {
                this._resolvedThemes[_theme.name] = _theme;
                this._loadedThemesCache = null;
            }
            return _theme;
        }
        getLoadedThemes() {
            if (!this._loadedThemesCache) this._loadedThemesCache = Object.keys(this._resolvedThemes);
            return this._loadedThemesCache;
        }
        setTheme(theme) {
            let textmateTheme = this._textmateThemeCache.get(theme);
            if (!textmateTheme) {
                textmateTheme = Theme.createFromRawTheme(theme);
                this._textmateThemeCache.set(theme, textmateTheme);
            }
            this._syncRegistry.setTheme(textmateTheme);
        }
        getGrammar(name) {
            if (this._alias[name]) {
                const resolved = new Set([
                    name
                ]);
                while(this._alias[name]){
                    name = this._alias[name];
                    if (resolved.has(name)) throw new ShikiError(`Circular alias \`${Array.from(resolved).join(' -> ')} -> ${name}\``);
                    resolved.add(name);
                }
            }
            return this._resolvedGrammars[name];
        }
        async loadLanguage(lang) {
            if (this.getGrammar(lang.name)) return;
            const embeddedLazilyBy = new Set(Object.values(this._langMap).filter((i)=>i.embeddedLangsLazy?.includes(lang.name)));
            this._resolver.addLanguage(lang);
            const grammarConfig = {
                balancedBracketSelectors: lang.balancedBracketSelectors || [
                    '*'
                ],
                unbalancedBracketSelectors: lang.unbalancedBracketSelectors || []
            };
            this._syncRegistry._rawGrammars.set(lang.scopeName, lang);
            const g = await this.loadGrammarWithConfiguration(lang.scopeName, 1, grammarConfig);
            this._resolvedGrammars[lang.name] = g;
            if (lang.aliases) {
                lang.aliases.forEach((alias)=>{
                    this._alias[alias] = lang.name;
                });
            }
            this._loadedLanguagesCache = null;
            if (embeddedLazilyBy.size) {
                for (const e of embeddedLazilyBy){
                    delete this._resolvedGrammars[e.name];
                    this._loadedLanguagesCache = null;
                    this._syncRegistry?._injectionGrammars?.delete(e.scopeName);
                    this._syncRegistry?._grammars?.delete(e.scopeName);
                    await this.loadLanguage(this._langMap[e.name]);
                }
            }
        }
        async init() {
            this._themes.map((t)=>this.loadTheme(t));
            await this.loadLanguages(this._langs);
        }
        async loadLanguages(langs) {
            for (const lang of langs)this.resolveEmbeddedLanguages(lang);
            const langsGraphArray = Array.from(this._langGraph.entries());
            const missingLangs = langsGraphArray.filter(([_, lang])=>!lang);
            if (missingLangs.length) {
                const dependents = langsGraphArray.filter(([_, lang])=>lang && lang.embeddedLangs?.some((l)=>missingLangs.map(([name])=>name).includes(l))).filter((lang)=>!missingLangs.includes(lang));
                throw new ShikiError(`Missing languages ${missingLangs.map(([name])=>`\`${name}\``).join(', ')}, required by ${dependents.map(([name])=>`\`${name}\``).join(', ')}`);
            }
            for (const [_, lang] of langsGraphArray)this._resolver.addLanguage(lang);
            for (const [_, lang] of langsGraphArray)await this.loadLanguage(lang);
        }
        getLoadedLanguages() {
            if (!this._loadedLanguagesCache) this._loadedLanguagesCache = Object.keys({
                ...this._resolvedGrammars,
                ...this._alias
            });
            return this._loadedLanguagesCache;
        }
        resolveEmbeddedLanguages(lang) {
            this._langMap[lang.name] = lang;
            this._langGraph.set(lang.name, lang);
            if (lang.embeddedLangs) {
                for (const embeddedLang of lang.embeddedLangs)this._langGraph.set(embeddedLang, this._langMap[embeddedLang]);
            }
        }
    }
    class Resolver {
        _langs = new Map();
        _scopeToLang = new Map();
        _injections = new Map();
        _onigLibPromise;
        constructor(onigLibPromise, langs){
            this._onigLibPromise = onigLibPromise;
            langs.forEach((i)=>this.addLanguage(i));
        }
        get onigLib() {
            return this._onigLibPromise;
        }
        getLangRegistration(langIdOrAlias) {
            return this._langs.get(langIdOrAlias);
        }
        async loadGrammar(scopeName) {
            return this._scopeToLang.get(scopeName);
        }
        addLanguage(l) {
            this._langs.set(l.name, l);
            if (l.aliases) {
                l.aliases.forEach((a)=>{
                    this._langs.set(a, l);
                });
            }
            this._scopeToLang.set(l.scopeName, l);
            if (l.injectTo) {
                l.injectTo.forEach((i)=>{
                    if (!this._injections.get(i)) this._injections.set(i, []);
                    this._injections.get(i).push(l.scopeName);
                });
            }
        }
        getInjections(scopeName) {
            const scopeParts = scopeName.split('.');
            let injections = [];
            for(let i = 1; i <= scopeParts.length; i++){
                const subScopeName = scopeParts.slice(0, i).join('.');
                injections = [
                    ...injections,
                    ...(this._injections.get(subScopeName) || [])
                ];
            }
            return injections;
        }
    }
    let _defaultWasmLoader;
    async function getShikiInternal(options = {}) {
        async function normalizeGetter(p) {
            return Promise.resolve(typeof p === 'function' ? p() : p).then((r)=>r.default || r);
        }
        async function resolveLangs(langs) {
            return Array.from(new Set((await Promise.all(langs.filter((l)=>!isSpecialLang(l)).map(async (lang)=>await normalizeGetter(lang).then((r)=>Array.isArray(r) ? r : [
                        r
                    ])))).flat()));
        }
        const wasmLoader = options.loadWasm || _defaultWasmLoader;
        const [themes, langs] = await Promise.all([
            Promise.all((options.themes || []).map(normalizeGetter)).then((r)=>r.map(normalizeTheme)),
            resolveLangs(options.langs || []),
            wasmLoader ? loadWasm(wasmLoader) : undefined
        ]);
        const resolver = new Resolver(Promise.resolve({
            createOnigScanner (patterns) {
                return createOnigScanner(patterns);
            },
            createOnigString (s) {
                return createOnigString(s);
            }
        }), langs);
        const _registry = new Registry(resolver, themes, langs, options.langAlias);
        await _registry.init();
        let _lastTheme;
        function getLanguage(name) {
            const _lang = _registry.getGrammar(typeof name === 'string' ? name : name.name);
            if (!_lang) throw new ShikiError(`Language \`${name}\` not found, you may need to load it first`);
            return _lang;
        }
        function getTheme(name) {
            if (name === 'none') return {
                bg: '',
                fg: '',
                name: 'none',
                settings: [],
                type: 'dark'
            };
            const _theme = _registry.getTheme(name);
            if (!_theme) throw new ShikiError(`Theme \`${name}\` not found, you may need to load it first`);
            return _theme;
        }
        function setTheme(name) {
            const theme = getTheme(name);
            if (_lastTheme !== name) {
                _registry.setTheme(theme);
                _lastTheme = name;
            }
            const colorMap = _registry.getColorMap();
            return {
                theme,
                colorMap
            };
        }
        function getLoadedThemes() {
            return _registry.getLoadedThemes();
        }
        function getLoadedLanguages() {
            return _registry.getLoadedLanguages();
        }
        async function loadLanguage(...langs) {
            await _registry.loadLanguages(await resolveLangs(langs));
        }
        async function loadTheme(...themes) {
            await Promise.all(themes.map(async (theme)=>isSpecialTheme(theme) ? null : _registry.loadTheme(await normalizeGetter(theme))));
        }
        return {
            setTheme,
            getTheme,
            getLanguage,
            getLoadedThemes,
            getLoadedLanguages,
            loadLanguage,
            loadTheme
        };
    }
    async function getHighlighterCore(options = {}) {
        const internal = await getShikiInternal(options);
        return {
            codeToTokensBase: (code, options)=>codeToTokensBase$1(internal, code, options),
            codeToTokensWithThemes: (code, options)=>codeToTokensWithThemes$1(internal, code, options),
            codeToTokens: (code, options)=>codeToTokens$1(internal, code, options),
            codeToHast: (code, options)=>codeToHast$1(internal, code, options),
            codeToHtml: (code, options)=>codeToHtml$1(internal, code, options),
            ...internal,
            getInternalContext: ()=>internal
        };
    }
    function createdBundledHighlighter(bundledLanguages, bundledThemes, loadWasm) {
        async function getHighlighter(options) {
            function resolveLang(lang) {
                if (typeof lang === 'string') {
                    if (isSpecialLang(lang)) return [];
                    const bundle = bundledLanguages[lang];
                    if (!bundle) throw new ShikiError(`Language \`${lang}\` is not included in this bundle. You may want to load it from external source.`);
                    return bundle;
                }
                return lang;
            }
            function resolveTheme(theme) {
                if (isSpecialTheme(theme)) return 'none';
                if (typeof theme === 'string') {
                    const bundle = bundledThemes[theme];
                    if (!bundle) throw new ShikiError(`Theme \`${theme}\` is not included in this bundle. You may want to load it from external source.`);
                    return bundle;
                }
                return theme;
            }
            const _themes = (options.themes ?? []).map((i)=>resolveTheme(i));
            const langs = (options.langs ?? []).map((i)=>resolveLang(i));
            const core = await getHighlighterCore({
                ...options,
                themes: _themes,
                langs,
                loadWasm
            });
            return {
                ...core,
                loadLanguage (...langs) {
                    return core.loadLanguage(...langs.map(resolveLang));
                },
                loadTheme (...themes) {
                    return core.loadTheme(...themes.map(resolveTheme));
                }
            };
        }
        return getHighlighter;
    }
    function createSingletonShorthands(getHighlighter) {
        let _shiki;
        async function _getHighlighter(options = {}) {
            if (!_shiki) {
                _shiki = getHighlighter({
                    themes: toArray(options.theme || []),
                    langs: toArray(options.lang || [])
                });
                return _shiki;
            } else {
                const s = await _shiki;
                await Promise.all([
                    s.loadTheme(...toArray(options.theme || [])),
                    s.loadLanguage(...toArray(options.lang || []))
                ]);
                return s;
            }
        }
        return {
            getSingletonHighlighter: ()=>_getHighlighter(),
            async codeToHtml (code, options) {
                const shiki = await _getHighlighter({
                    lang: options.lang,
                    theme: ('theme' in options ? [
                        options.theme
                    ] : Object.values(options.themes))
                });
                return shiki.codeToHtml(code, options);
            },
            async codeToHast (code, options) {
                const shiki = await _getHighlighter({
                    lang: options.lang,
                    theme: ('theme' in options ? [
                        options.theme
                    ] : Object.values(options.themes))
                });
                return shiki.codeToHast(code, options);
            },
            async codeToTokens (code, options) {
                const shiki = await _getHighlighter({
                    lang: options.lang,
                    theme: ('theme' in options ? [
                        options.theme
                    ] : Object.values(options.themes))
                });
                return shiki.codeToTokens(code, options);
            },
            async codeToTokensBase (code, options) {
                const shiki = await _getHighlighter(options);
                return shiki.codeToTokensBase(code, options);
            },
            async codeToTokensWithThemes (code, options) {
                const shiki = await _getHighlighter({
                    lang: options.lang,
                    theme: Object.values(options.themes).filter(Boolean)
                });
                return shiki.codeToTokensWithThemes(code, options);
            }
        };
    }
    const getHighlighter = createdBundledHighlighter(bundledLanguages, bundledThemes, getWasmInlined);
    const { codeToHtml, codeToHast, codeToTokens, codeToTokensBase, codeToTokensWithThemes, getSingletonHighlighter } = createSingletonShorthands(getHighlighter);
    const langMap = {
        ts: "typescript",
        tsx: "tsx",
        html: "html",
        css: "css",
        scss: "scss",
        json: "json",
        svelte: "svelte",
        js: "javascript",
        nix: "nix",
        yaml: "yaml",
        md: "markdown",
        toml: "toml",
        txt: "plaintext",
        gitignore: "plaintext",
        bash: "bash",
        yml: "yml"
    };
    const parseBasedOnExtension = async (extension, content)=>{
        const lang = langMap[extension] || "plaintext";
        return codeToHtml(content, {
            lang,
            theme: "github-dark",
            structure: "inline"
        });
    };
    const line = "_line_17f71_5";
    const selection = "_selection_17f71_20";
    const styles$8 = {
        line: line,
        "empty-selection-placeholder": "_empty-selection-placeholder_17f71_12",
        selection: selection,
        "line-folded": "_line-folded_17f71_26"
    };
    var _tmpl$$9 = template(`<div><div></div><div>`), _tmpl$2$4 = template(`<div>`);
    const EditorLine = (props)=>{
        const [highlightedContent, setHighlightedContent] = createSignal(props.content);
        const [selectedContent, setSelectedContent] = createSignal("");
        const [selectionLeft, setSelectionLeft] = createSignal(0);
        const isFolded = createMemo(()=>props.foldLines.includes(props.line));
        const debouncedParse = debounce(async (content2)=>{
            const activeTab = TabStore.activeTab;
            if (activeTab) {
                const extension = activeTab.id.split(".").pop();
                const parsedContent = await parseBasedOnExtension(extension, content2);
                window.api.setLanguageRequest(activeTab.id);
                setHighlightedContent(parsedContent);
            }
        }, 0);
        const updateSelection = ()=>{
            const { startLine, endLine, startIndex, endIndex } = props.selection;
            if (startLine === endLine) {
                setSelectedContent(props.content.slice(startIndex, endIndex));
                setSelectionLeft(textService.measureTextWidth(props.content.substring(0, startIndex), "Hack", 14));
            } else if (props.line + 1 === startLine) {
                setSelectedContent(props.content.slice(startIndex));
                setSelectionLeft(textService.measureTextWidth(props.content.substring(0, startIndex), "Hack", 14));
            } else if (props.line + 1 === endLine) {
                setSelectedContent(props.content.slice(0, endIndex));
                setSelectionLeft(0);
            } else if (props.line + 1 > startLine && props.line + 1 < endLine) {
                setSelectedContent(props.content);
                setSelectionLeft(0);
            } else {
                setSelectedContent("");
                setSelectionLeft(0);
            }
        };
        const content = createMemo(()=>props.content);
        createEffect(()=>{
            if (props.selection.startLine <= props.line + 1 && props.selection.endLine >= props.line + 1) {
                updateSelection();
            } else {
                setSelectedContent("");
                setSelectionLeft(0);
            }
        });
        createEffect(()=>{
            debouncedParse(content());
        });
        return (()=>{
            var _el$ = _tmpl$$9(), _el$2 = _el$.firstChild, _el$3 = _el$2.nextSibling;
            var _ref$ = props.ref;
            typeof _ref$ === "function" ? use(_ref$, _el$) : props.ref = _el$;
            `${lineHeight}px` != null ? _el$3.style.setProperty("height", `${lineHeight}px`) : _el$3.style.removeProperty("height");
            insert(_el$3, (()=>{
                var _c$ = createMemo(()=>selectedContent() !== "");
                return ()=>_c$() && (()=>{
                        var _el$4 = _tmpl$2$4();
                        insert(_el$4, selectedContent);
                        return _el$4;
                    })();
            })());
            createRenderEffect((_p$)=>{
                var _v$ = props.line + 1, _v$2 = `translate3D(5px, ${props.line * lineHeight + 25}px, 0px)`, _v$3 = isFolded() ? styles$8["line-folded"] : styles$8.line, _v$4 = styles$8["line-content"], _v$5 = props.highlightedContent || highlightedContent(), _v$6 = styles$8.selection, _v$7 = `translate3D(${selectionLeft()}px, -20px, 0px)`;
                _v$ !== _p$.e && setAttribute(_el$, "data-line-number", _p$.e = _v$);
                _v$2 !== _p$.t && ((_p$.t = _v$2) != null ? _el$.style.setProperty("transform", _v$2) : _el$.style.removeProperty("transform"));
                _v$3 !== _p$.a && className(_el$, _p$.a = _v$3);
                _v$4 !== _p$.o && className(_el$2, _p$.o = _v$4);
                _v$5 !== _p$.i && (_el$2.innerHTML = _p$.i = _v$5);
                _v$6 !== _p$.n && className(_el$3, _p$.n = _v$6);
                _v$7 !== _p$.s && ((_p$.s = _v$7) != null ? _el$3.style.setProperty("transform", _v$7) : _el$3.style.removeProperty("transform"));
                return _p$;
            }, {
                e: void 0,
                t: void 0,
                a: void 0,
                o: void 0,
                i: void 0,
                n: void 0,
                s: void 0
            });
            return _el$;
        })();
    };
    const active$1 = "_active_rmvki_52";
    const styles$7 = {
        "line-numbers": "_line-numbers_rmvki_5",
        "fold-line-icon": "_fold-line-icon_rmvki_22",
        "shift-right": "_shift-right_rmvki_25",
        "shift-right2x": "_shift-right2x_rmvki_28",
        "line-numbers-inner": "_line-numbers-inner_rmvki_38",
        "line-number": "_line-number_rmvki_5",
        active: active$1
    };
    function TbChevronDown(props) {
        return IconTemplate({
            a: {
                "xmlns": "http://www.w3.org/2000/svg",
                "class": "icon icon-tabler icon-tabler-chevron-down",
                "width": "24",
                "height": "24",
                "viewBox": "0 0 24 24",
                "stroke-width": "2",
                "stroke": "currentColor",
                "fill": "none",
                "stroke-linecap": "round",
                "stroke-linejoin": "round"
            },
            c: '<path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M6 9l6 6l6 -6"/>'
        }, props);
    }
    function TbPlus(props) {
        return IconTemplate({
            a: {
                "xmlns": "http://www.w3.org/2000/svg",
                "class": "icon icon-tabler icon-tabler-plus",
                "width": "24",
                "height": "24",
                "viewBox": "0 0 24 24",
                "stroke-width": "2",
                "stroke": "currentColor",
                "fill": "none",
                "stroke-linecap": "round",
                "stroke-linejoin": "round"
            },
            c: '<path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 5l0 14"/><path d="M5 12l14 0"/>'
        }, props);
    }
    var _tmpl$$8 = template(`<div><div>`), _tmpl$2$3 = template(`<div>`);
    const LineNumbers = (props)=>{
        const [visibleLinesStart, setVisibleLinesStart] = createSignal(0);
        const [visibleLinesEnd, setVisibleLinesEnd] = createSignal(0);
        const [arrayLength, setArrayLength] = createSignal(0);
        const [activeLine, setActiveLine] = createSignal(props.editor().cursorAt(0).line);
        const calculateVisibleLines = ()=>{
            const start = Math.floor(props.scrollTop() / lineHeight);
            const end = start + getNumberOfLinesOnScreen(lineHeight) + 1;
            setVisibleLinesStart(start);
            setVisibleLinesEnd(end);
            setArrayLength(getNumberOfLinesOnScreen(lineHeight) + 2);
        };
        calculateVisibleLines();
        createEffect(on(props.scrollTop, ()=>{
            calculateVisibleLines();
        }));
        createEffect(on(()=>props.editor().cursorAt(0).line, ()=>{
            setActiveLine(props.editor().cursorAt(0).line);
        }));
        createEffect(on(()=>props.editor().cursorAt(0).line, ()=>{
            const cursorLine = props.editor().cursorAt(0).line;
            if (cursorLine < visibleLinesStart() || cursorLine > visibleLinesEnd()) {
                const scrollToLine = Math.max(0, cursorLine - 5);
                props.contentContainerRef?.scrollTo({
                    top: scrollToLine * lineHeight,
                    behavior: "auto"
                });
            }
        }, {
            defer: true
        }));
        const getTransformForLine = (index)=>{
            return `translateY(${index * lineHeight}px)`;
        };
        return (()=>{
            var _el$ = _tmpl$$8(), _el$2 = _el$.firstChild;
            insert(_el$2, createComponent(For, {
                get each () {
                    return Array.from({
                        length: arrayLength()
                    });
                },
                children: (_, index)=>{
                    return createComponent(Show, {
                        get when () {
                            return visibleLinesStart() + index() + 1 < props.editor().totalLines() + 1;
                        },
                        get children () {
                            var _el$3 = _tmpl$2$3();
                            insert(_el$3, createComponent(Show, {
                                get when () {
                                    return props.foldRegions.map((f)=>f.startLine).includes(visibleLinesStart() + index());
                                },
                                get children () {
                                    var _el$4 = _tmpl$2$3();
                                    _el$4.$$mousedown = ()=>props.toggleFold(visibleLinesStart() + index() + 1);
                                    insert(_el$4, createComponent(TbChevronDown, {
                                        "font-size": "15"
                                    }));
                                    createRenderEffect(()=>className(_el$4, styles$7["fold-line-icon"]));
                                    return _el$4;
                                }
                            }), null);
                            insert(_el$3, ()=>visibleLinesStart() + index() + 1, null);
                            createRenderEffect((_p$)=>{
                                var _v$4 = styles$7["line-number"] + (activeLine() === visibleLinesStart() + index() ? ` ${styles$7.active}` : ""), _v$5 = getTransformForLine(visibleLinesStart() + index());
                                _v$4 !== _p$.e && className(_el$3, _p$.e = _v$4);
                                _v$5 !== _p$.t && ((_p$.t = _v$5) != null ? _el$3.style.setProperty("transform", _v$5) : _el$3.style.removeProperty("transform"));
                                return _p$;
                            }, {
                                e: void 0,
                                t: void 0
                            });
                            return _el$3;
                        }
                    });
                }
            }));
            createRenderEffect((_p$)=>{
                var _v$ = styles$7["line-numbers"], _v$2 = `translateY(${-props.scrollTop()}px)`, _v$3 = styles$7["line-numbers-inner"];
                _v$ !== _p$.e && className(_el$, _p$.e = _v$);
                _v$2 !== _p$.t && ((_p$.t = _v$2) != null ? _el$.style.setProperty("transform", _v$2) : _el$.style.removeProperty("transform"));
                _v$3 !== _p$.a && className(_el$2, _p$.a = _v$3);
                return _p$;
            }, {
                e: void 0,
                t: void 0,
                a: void 0
            });
            return _el$;
        })();
    };
    delegateEvents([
        "mousedown"
    ]);
    const tab = "_tab_i7bll_5";
    const active = "_active_i7bll_34";
    const styles$6 = {
        tab: tab,
        "tab-name": "_tab-name_i7bll_25",
        active: active,
        "saved-indicator-wrapper": "_saved-indicator-wrapper_i7bll_37",
        "saved-indicator": "_saved-indicator_i7bll_37",
        "modified-indicator-wrapper": "_modified-indicator-wrapper_i7bll_57",
        "close-button-icon": "_close-button-icon_i7bll_87"
    };
    var _tmpl$$7 = template(`<div><button type=button><div></div><div></div><div><span>`), _tmpl$2$2 = template(`<div><span>M`), _tmpl$3 = template(`<button type=button>`);
    const Tab = (props)=>{
        const [hovered, setHovered] = createSignal(false);
        const [buttonHovered, setButtonHovered] = createSignal(false);
        const [savedIconHovered, setSavedIconHovered] = createSignal(false);
        return (()=>{
            var _el$ = _tmpl$$7(), _el$2 = _el$.firstChild, _el$3 = _el$2.firstChild, _el$4 = _el$3.nextSibling, _el$5 = _el$4.nextSibling, _el$6 = _el$5.firstChild;
            _el$.$$mousedown = (e)=>{
                if (e.button === 1) props.oncloseclick?.(e);
            };
            _el$.addEventListener("mouseleave", ()=>setHovered(false));
            _el$.addEventListener("mouseenter", ()=>setHovered(true));
            addEventListener(_el$, "click", props.onclick, true);
            insert(_el$3, ()=>props.icon);
            insert(_el$4, ()=>props.name);
            _el$5.addEventListener("mouseleave", ()=>setSavedIconHovered(false));
            _el$5.addEventListener("mouseenter", ()=>setSavedIconHovered(true));
            insert(_el$2, (()=>{
                var _c$ = createMemo(()=>props.state === TabState.Modified);
                return ()=>_c$() && (()=>{
                        var _el$7 = _tmpl$2$2(), _el$8 = _el$7.firstChild;
                        createRenderEffect((_p$)=>{
                            var _v$10 = styles$6["modified-indicator-wrapper"], _v$11 = styles$6["modified-indicator"];
                            _v$10 !== _p$.e && className(_el$7, _p$.e = _v$10);
                            _v$11 !== _p$.t && className(_el$8, _p$.t = _v$11);
                            return _p$;
                        }, {
                            e: void 0,
                            t: void 0
                        });
                        return _el$7;
                    })();
            })(), null);
            insert(_el$2, (()=>{
                var _c$2 = createMemo(()=>!!(props.saved && hovered() || savedIconHovered() || buttonHovered() || props.active && props.saved));
                return ()=>_c$2() && (()=>{
                        var _el$9 = _tmpl$3();
                        addEventListener(_el$9, "click", props.oncloseclick, true);
                        _el$9.addEventListener("mouseleave", ()=>setButtonHovered(false));
                        _el$9.addEventListener("mouseenter", ()=>setButtonHovered(true));
                        insert(_el$9, createComponent(VsClose, {
                            "font-size": "14",
                            get ["class"] () {
                                return styles$6["close-button-icon"];
                            }
                        }));
                        createRenderEffect(()=>className(_el$9, `${styles$6["close-button"]} no-button-style`));
                        return _el$9;
                    })();
            })(), null);
            createRenderEffect((_p$)=>{
                var _v$ = `${styles$6["tab-container"]}`, _v$2 = `${styles$6.tab} no-button-style ${props.active ? styles$6.active : ""}`, _v$3 = !props.saved ? {
                    "padding-right": "22px"
                } : {}, _v$4 = styles$6["tab-icon"], _v$5 = styles$6["tab-name"], _v$6 = props.state === TabState.Modified ? {
                    color: "var(--tab-modified-color)"
                } : {}, _v$7 = styles$6["saved-indicator-wrapper"], _v$8 = styles$6["saved-indicator"], _v$9 = props.saved ? {
                    opacity: 0
                } : "";
                _v$ !== _p$.e && className(_el$, _p$.e = _v$);
                _v$2 !== _p$.t && className(_el$2, _p$.t = _v$2);
                _p$.a = style(_el$2, _v$3, _p$.a);
                _v$4 !== _p$.o && className(_el$3, _p$.o = _v$4);
                _v$5 !== _p$.i && className(_el$4, _p$.i = _v$5);
                _p$.n = style(_el$4, _v$6, _p$.n);
                _v$7 !== _p$.s && className(_el$5, _p$.s = _v$7);
                _v$8 !== _p$.h && className(_el$6, _p$.h = _v$8);
                _p$.r = style(_el$6, _v$9, _p$.r);
                return _p$;
            }, {
                e: void 0,
                t: void 0,
                a: void 0,
                o: void 0,
                i: void 0,
                n: void 0,
                s: void 0,
                h: void 0,
                r: void 0
            });
            return _el$;
        })();
    };
    delegateEvents([
        "click",
        "mousedown"
    ]);
    const styles$5 = {
        "tabs-wrapper": "_tabs-wrapper_mqrwl_1",
        "tabs-container": "_tabs-container_mqrwl_14"
    };
    const tabStyles = {
        "tab-scrollbar": "_tab-scrollbar_kkdbd_1",
        "tab-scrollbar-track": "_tab-scrollbar-track_kkdbd_6",
        "tab-scrollbar-thumb": "_tab-scrollbar-thumb_kkdbd_11"
    };
    var _tmpl$$6 = template(`<div><div></div><div>`), _tmpl$2$1 = template(`<div><div>`);
    const TabScrollbar = (props)=>{
        let scrollbarRef;
        onMount(()=>{
            if (scrollbarRef) {
                scrollbarRef.addEventListener("wheel", props.onScroll);
            }
        });
        return (()=>{
            var _el$ = _tmpl$$6(), _el$2 = _el$.firstChild, _el$3 = _el$2.nextSibling;
            var _ref$ = scrollbarRef;
            typeof _ref$ === "function" ? use(_ref$, _el$) : scrollbarRef = _el$;
            createRenderEffect((_p$)=>{
                var _v$ = tabStyles["tab-scrollbar"], _v$2 = tabStyles["tab-scrollbar-track"], _v$3 = tabStyles["tab-scrollbar-thumb"], _v$4 = `${props.thumbPosition}%`;
                _v$ !== _p$.e && className(_el$, _p$.e = _v$);
                _v$2 !== _p$.t && className(_el$2, _p$.t = _v$2);
                _v$3 !== _p$.a && className(_el$3, _p$.a = _v$3);
                _v$4 !== _p$.o && ((_p$.o = _v$4) != null ? _el$3.style.setProperty("left", _v$4) : _el$3.style.removeProperty("left"));
                return _p$;
            }, {
                e: void 0,
                t: void 0,
                a: void 0,
                o: void 0
            });
            return _el$;
        })();
    };
    const TabsWrapper = ()=>{
        let tabsContainerRef;
        const [scrollPosition, setScrollPosition] = createSignal(0);
        const [isOverflowing, setIsOverflowing] = createSignal(false);
        const updateScrollPosition = ()=>{
            if (tabsContainerRef) {
                const maxScrollLeft = tabsContainerRef.scrollWidth - tabsContainerRef.clientWidth;
                setScrollPosition(tabsContainerRef.scrollLeft / maxScrollLeft * 100);
                setIsOverflowing(tabsContainerRef.scrollWidth > tabsContainerRef.clientWidth);
            }
        };
        const scrollHandler = (event)=>{
            if (tabsContainerRef) {
                tabsContainerRef.scrollLeft += event.deltaY;
                updateScrollPosition();
                event.stopPropagation();
            }
        };
        onMount(()=>{
            if (tabsContainerRef) {
                tabsContainerRef.addEventListener("scroll", updateScrollPosition);
                updateScrollPosition();
            }
        });
        onCleanup(()=>{
            if (tabsContainerRef) {
                tabsContainerRef.removeEventListener("scroll", updateScrollPosition);
            }
        });
        const handleTabClose = (id, event)=>{
            event.stopPropagation();
            TabStore.closeTab(id);
        };
        const handleTabClick = (id, event)=>{
            event.stopPropagation();
            TabStore.activateTab(id);
        };
        return (()=>{
            var _el$4 = _tmpl$2$1(), _el$5 = _el$4.firstChild;
            var _ref$2 = tabsContainerRef;
            typeof _ref$2 === "function" ? use(_ref$2, _el$5) : tabsContainerRef = _el$5;
            insert(_el$5, createComponent(For, {
                get each () {
                    return TabStore.tabs;
                },
                children: (tab)=>createComponent(Tab, {
                        get name () {
                            return tab.name;
                        },
                        get active () {
                            return TabStore.activeTab?.id === tab.id;
                        },
                        get state () {
                            return tab.state;
                        },
                        get saved () {
                            return tab.saved;
                        },
                        oncloseclick: (e)=>handleTabClose(tab.id, e),
                        onclick: (e)=>handleTabClick(tab.id, e)
                    })
            }));
            insert(_el$4, (()=>{
                var _c$ = createMemo(()=>!!isOverflowing());
                return ()=>_c$() && createComponent(TabScrollbar, {
                        get thumbPosition () {
                            return scrollPosition();
                        },
                        onScroll: scrollHandler
                    });
            })(), null);
            createRenderEffect((_p$)=>{
                var _v$5 = styles$5["tabs-wrapper"], _v$6 = panes().length === 0 ? "4px" : "2px", _v$7 = styles$5["tabs-container"];
                _v$5 !== _p$.e && className(_el$4, _p$.e = _v$5);
                _v$6 !== _p$.t && ((_p$.t = _v$6) != null ? _el$4.style.setProperty("margin-left", _v$6) : _el$4.style.removeProperty("margin-left"));
                _v$7 !== _p$.a && className(_el$5, _p$.a = _v$7);
                return _p$;
            }, {
                e: void 0,
                t: void 0,
                a: void 0
            });
            return _el$4;
        })();
    };
    const ERROR = "_ERROR_1kj4e_60";
    const identifier = "_identifier_1kj4e_74";
    const string = "_string_1kj4e_78";
    const number = "_number_1kj4e_84";
    const expression_statement = "_expression_statement_1kj4e_88";
    const boolean = "_boolean_1kj4e_92";
    const comment = "_comment_1kj4e_96";
    const from = "_from_1kj4e_101";
    const type = "_type_1kj4e_108";
    const as = "_as_1kj4e_110";
    const any = "_any_1kj4e_116";
    const array_pattern = "_array_pattern_1kj4e_125";
    const semicolon = "_semicolon_1kj4e_129";
    const shorthand_property_identifier_pattern = "_shorthand_property_identifier_pattern_1kj4e_142";
    const type_identifier = "_type_identifier_1kj4e_146";
    const property_identifier = "_property_identifier_1kj4e_147";
    const styles$4 = {
        "editor-view": "_editor-view_1kj4e_1",
        "editor-view-inner": "_editor-view-inner_1kj4e_13",
        "editor-line-numbers": "_editor-line-numbers_1kj4e_17",
        "editor-content-container": "_editor-content-container_1kj4e_23",
        "editor-lines-padding": "_editor-lines-padding_1kj4e_41",
        "editor-lines": "_editor-lines_1kj4e_41",
        "editor-line-padding": "_editor-line-padding_1kj4e_54",
        ERROR: ERROR,
        identifier: identifier,
        string: string,
        "const": "_const_1kj4e_79",
        "let": "_let_1kj4e_80",
        number: number,
        expression_statement: expression_statement,
        "double-ampersand": "_double-ampersand_1kj4e_89",
        "false": "_false_1kj4e_90",
        "true": "_true_1kj4e_91",
        boolean: boolean,
        comment: comment,
        "import": "_import_1kj4e_100",
        from: from,
        "case": "_case_1kj4e_102",
        "default": "_default_1kj4e_103",
        "break": "_break_1kj4e_104",
        "if": "_if_1kj4e_105",
        "return": "_return_1kj4e_106",
        "switch": "_switch_1kj4e_107",
        type: type,
        "else": "_else_1kj4e_109",
        as: as,
        "export": "_export_1kj4e_111",
        "new": "_new_1kj4e_115",
        any: any,
        "left-bracket": "_left-bracket_1kj4e_120",
        "right-bracket": "_right-bracket_1kj4e_121",
        array_pattern: array_pattern,
        semicolon: semicolon,
        "closing-greater-than": "_closing-greater-than_1kj4e_133",
        "greater-than": "_greater-than_1kj4e_134",
        "less-than": "_less-than_1kj4e_135",
        "right-parenthesis": "_right-parenthesis_1kj4e_139",
        "left-parenthesis": "_left-parenthesis_1kj4e_140",
        "class": "_class_1kj4e_141",
        shorthand_property_identifier_pattern: shorthand_property_identifier_pattern,
        type_identifier: type_identifier,
        property_identifier: property_identifier
    };
    var _tmpl$$5 = template(`<div><div><div></div><div><div><div><div>`);
    const EditorView = (props)=>{
        const [viewScrollTop, setViewScrollTop] = createSignal(0);
        const [viewScrollLeft, setViewScrollLeft] = createSignal(0);
        const [cursorRefs, setCursorRefs] = createSignal([]);
        const [foldRegions, setFoldRegions] = createSignal([]);
        const [visibleLinesStart, setVisibleLinesStart] = createSignal(0);
        createSignal();
        const windowSize = createMemo(()=>getNumberOfLinesOnScreen(lineHeight) + 5);
        const fileStore = useFileStore();
        let contentContainerRef;
        const ensureCursorVisible = ()=>{
            const cursorElement = cursorRefs()[0];
            if (cursorElement && contentContainerRef) {
                scrollIfNeeded(cursorElement);
            }
        };
        const scrollIfNeeded = (targetElement)=>{
            const scrollThreshold = 50;
            if (!contentContainerRef) return;
            requestAnimationFrame(()=>{
                const editorRect = contentContainerRef.getBoundingClientRect();
                const targetRect = targetElement.getBoundingClientRect();
                let scrollTopAdjustment = 0;
                let scrollLeftAdjustment = 0;
                if (targetRect.bottom + scrollThreshold > editorRect.bottom) {
                    scrollTopAdjustment = targetRect.bottom - editorRect.bottom + lineHeight * 2;
                } else if (targetRect.top - scrollThreshold < editorRect.top) {
                    scrollTopAdjustment = -(editorRect.top - targetRect.top + lineHeight * 2);
                }
                if (targetRect.right + scrollThreshold > editorRect.right) {
                    scrollLeftAdjustment = targetRect.right - editorRect.right + scrollThreshold;
                } else if (targetRect.left - scrollThreshold < editorRect.left) {
                    scrollLeftAdjustment = -(editorRect.left - targetRect.left + scrollThreshold);
                }
                if (scrollTopAdjustment !== 0 || scrollLeftAdjustment !== 0) {
                    contentContainerRef.scrollTo({
                        top: contentContainerRef.scrollTop + scrollTopAdjustment,
                        left: contentContainerRef.scrollLeft + scrollLeftAdjustment,
                        behavior: "auto"
                    });
                }
            });
        };
        const handleScroll = (e)=>{
            const container = e.currentTarget;
            const scrollTop = container.scrollTop;
            const scrollLeft = container.scrollLeft;
            requestAnimationFrame(()=>{
                setViewScrollTop(scrollTop);
                setViewScrollLeft(scrollLeft);
                const visibleLinesStart2 = Math.max(Math.floor(scrollTop / lineHeight) - 5, 0);
                setVisibleLinesStart(visibleLinesStart2);
                TabStore.updateTab(TabStore.activeTab.id, {
                    scrollX: scrollLeft,
                    scrollY: scrollTop
                });
            });
        };
        const specialCharacterStyles = {
            "{": "left-bracket",
            "}": "right-bracket",
            "[": "left-square-bracket",
            "]": "right-square-bracket",
            ";": "semicolon",
            ":": "colon",
            "'": "single-quote",
            '"': "double-quote",
            "(": "left-parenthesis",
            ")": "right-parenthesis",
            ",": "comma",
            ".": "dot",
            "&&": "double-ampersand",
            "/>": "closing-greater-than",
            ">": "greater-than",
            "<": "less-than"
        };
        function identifyFoldRegions(tree) {
            let foldRegions2 = [];
            if (!tree || !tree.children) return foldRegions2;
            for (let child of tree.children){
                if (shouldFold(child)) {
                    foldRegions2.push({
                        startLine: calculateLineNumber(tree.text, child.startIndex),
                        endLine: calculateLineNumber(tree.text, child.endIndex),
                        isFolded: false
                    });
                } else if (child.children) {
                    foldRegions2 = foldRegions2.concat(identifyFoldRegions(child));
                }
            }
            return foldRegions2;
        }
        function shouldFold(node) {
            const foldableTypes = [
                "comment",
                "function",
                "class",
                "block"
            ];
            return foldableTypes.includes(node.type);
        }
        function calculateLineNumber(text, index) {
            return text.slice(0, index).split("\n").length - 1;
        }
        function toggleFold(line) {
            const regions = foldRegions().map((region)=>{
                if (region.startLine <= line && region.endLine >= line) {
                    return {
                        ...region,
                        isFolded: !region.isFolded
                    };
                }
                return region;
            });
            setFoldRegions(regions);
        }
        function parseNode(node, rootText, styles2) {
            let spans2 = [];
            let current_position = node.startIndex;
            if (!node) return "";
            if (!node?.children || !TabStore.activeTab) return "";
            const extension = TabStore.activeTab.id.split(".").pop();
            if (!(extension in languageMap) || extension in [
                "txt",
                "md"
            ]) {
                return "";
            }
            const escapeHtml = (text)=>{
                return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;").replace(/\t/g, "    ");
            };
            for (let child of node.children){
                if (child.startIndex > current_position) {
                    let text_before = rootText?.slice(current_position, child.startIndex) ?? "";
                    spans2.push(escapeHtml(text_before).replace(/ /g, "&nbsp;").replace(/\n/g, "<br/>").replace(/\t/g, "    "));
                }
                let childSpan = parseNode(child, rootText, styles2);
                let spanType = styles2[specialCharacterStyles[child.type]] || styles2[child.type] || child.type || "default-style";
                let span = `<span class="${spanType}">${childSpan || (escapeHtml(rootText?.slice(child.startIndex, child.endIndex))?.replace(/ /g, "&nbsp;").replace(/\n/g, "<br/>").replace(/\t/g, "    ") ?? "")}</span>`;
                spans2.push(span);
                current_position = child.endIndex;
            }
            if (current_position < node.endIndex) {
                let text_after = rootText?.slice(current_position, node.endIndex) ?? "";
                spans2.push(escapeHtml(text_after).replace(/ /g, "&nbsp;").replace(/\n/g, "<br/>").replace(/\t/g, "    "));
            }
        }
        const memoizedParseNode = createMemo(()=>{
            if (parserTree()) {
                return parseNode(parserTree(), parserTree().text, styles$4);
            }
            return "";
        });
        const memoizedTextLines = createMemo(()=>props.editor().getText().split("\n"));
        const lines = createMemo(()=>{
            return memoizedParseNode()?.split("<br/>");
        });
        const visibleLines = createMemo(()=>{
            const folds = foldRegions();
            return memoizedTextLines().filter((_, lineIndex)=>{
                return !folds.some((region)=>region.isFolded && lineIndex > region.startLine && lineIndex <= region.endLine);
            });
        });
        const foldLines = createMemo(()=>{
            return foldRegions().reduce((acc, region)=>{
                if (region.isFolded) {
                    for(let i = region.startLine + 1; i <= region.endLine; i++){
                        acc.push(i);
                    }
                }
                return acc;
            }, []);
        });
        createEffect(()=>{
            if (parserTree() && TabStore.activeTab) {
                const newFoldRegions = identifyFoldRegions(parserTree());
                setFoldRegions(newFoldRegions);
            }
        });
        createEffect(on(()=>TabStore.activeTab?.id, ()=>{
            if (TabStore.activeTab) {
                const scrollX = TabStore.activeTab.scrollX;
                const scrollY = TabStore.activeTab.scrollY;
                setViewScrollTop(scrollY);
                setViewScrollLeft(scrollX);
                if (contentContainerRef) {
                    contentContainerRef.scrollTo({
                        top: scrollY,
                        left: scrollX
                    });
                }
            }
        }));
        createEffect(()=>{
            if (fileStore.fileContent) {
                props.editor().setContent(fileStore.fileContent);
            }
        });
        createEffect(on(()=>props.editor().cursors.length, ()=>{
            setCursorRefs(props.editor().cursors.map(()=>document.createElement("div")));
        }, {
            defer: true
        }));
        createEffect(on(()=>props.scrollSignal() && props.editor().cursors[0], ()=>ensureCursorVisible(), {
            defer: true
        }));
        createEffect(()=>{
            if (parserTree()) {
                parseNode(parserTree(), parserTree().text, styles$4);
            }
        });
        return (()=>{
            var _el$ = _tmpl$$5(), _el$2 = _el$.firstChild, _el$3 = _el$2.firstChild, _el$4 = _el$3.nextSibling, _el$5 = _el$4.firstChild, _el$6 = _el$5.firstChild, _el$7 = _el$6.firstChild;
            addEventListener(_el$, "keypress", props.click);
            addEventListener(_el$, "click", props.click, true);
            insert(_el$, createComponent(TabsWrapper, {}), _el$2);
            insert(_el$3, createComponent(LineNumbers, {
                toggleFold,
                get foldRegions () {
                    return foldRegions();
                },
                scrollTop: viewScrollTop,
                get editor () {
                    return props.editor;
                }
            }));
            _el$4.addEventListener("scroll", handleScroll);
            var _ref$ = contentContainerRef;
            typeof _ref$ === "function" ? use(_ref$, _el$4) : contentContainerRef = _el$4;
            insert(_el$6, createComponent(For, {
                get each () {
                    return visibleLines().slice(visibleLinesStart(), visibleLinesStart() + windowSize() + 1);
                },
                children: (text, index)=>createComponent(EditorLine, {
                        get foldLines () {
                            return foldLines();
                        },
                        content: text,
                        get line () {
                            return visibleLinesStart() + index() - 1;
                        },
                        get selection () {
                            return {
                                startIndex: props.editor().selections[0]?.startIndex,
                                endIndex: props.editor().selections[0]?.endIndex,
                                startLine: props.editor().selections[0]?.startLine,
                                endLine: props.editor().selections[0]?.endLine
                            };
                        },
                        get highlightedContent () {
                            return lines()?.[visibleLinesStart() + index()];
                        }
                    })
            }), _el$7);
            insert(_el$6, createComponent(For, {
                get each () {
                    return props.editor().cursors;
                },
                children: (cursor, index)=>createComponent(Cursor$1, {
                        get editor () {
                            return props.editor;
                        },
                        cursor: ()=>cursor,
                        ref: (el)=>{
                            const refs = cursorRefs();
                            refs[index()] = el;
                            setCursorRefs(refs);
                        }
                    })
            }), null);
            createRenderEffect((_p$)=>{
                var _v$ = styles$4["editor-view"], _v$2 = styles$4["editor-view-inner"], _v$3 = styles$4["editor-line-numbers"], _v$4 = styles$4["editor-content-container"], _v$5 = styles$4["editor-lines-padding"], _v$6 = styles$4["editor-lines"], _v$7 = styles$4["editor-line-padding"], _v$8 = `top: ${props.editor().totalLines() * lineHeight}px;`;
                _v$ !== _p$.e && className(_el$, _p$.e = _v$);
                _v$2 !== _p$.t && className(_el$2, _p$.t = _v$2);
                _v$3 !== _p$.a && className(_el$3, _p$.a = _v$3);
                _v$4 !== _p$.o && className(_el$4, _p$.o = _v$4);
                _v$5 !== _p$.i && className(_el$5, _p$.i = _v$5);
                _v$6 !== _p$.n && className(_el$6, _p$.n = _v$6);
                _v$7 !== _p$.s && className(_el$7, _p$.s = _v$7);
                _p$.h = style(_el$7, _v$8, _p$.h);
                return _p$;
            }, {
                e: void 0,
                t: void 0,
                a: void 0,
                o: void 0,
                i: void 0,
                n: void 0,
                s: void 0,
                h: void 0
            });
            return _el$;
        })();
    };
    delegateEvents([
        "click"
    ]);
    const expanded = "_expanded_9x9mn_13";
    const styles$3 = {
        "pane-container": "_pane-container_9x9mn_1",
        expanded: expanded,
        "resize-handle": "_resize-handle_9x9mn_16",
        "resize-input": "_resize-input_9x9mn_27",
        "pane-title": "_pane-title_9x9mn_35",
        "buttons-container": "_buttons-container_9x9mn_45",
        "pane-content": "_pane-content_9x9mn_56"
    };
    var _tmpl$$4 = template(`<div><div draggable=true><h2></h2><div><button type=button></button><button type=button></button></div></div><div>`), _tmpl$2 = template(`<div>`);
    const Pane = (props)=>{
        let container = null;
        const handleMouseDown = (e)=>{
            const startY = e.clientY;
            const startHeight = container ? container.clientHeight : 0;
            const doDrag = (e2)=>{
                const newHeight = `${startHeight + e2.clientY - startY}px`;
                props.onResize(props.index, newHeight);
            };
            const stopDrag = ()=>{
                document.documentElement.removeEventListener("mousemove", doDrag, false);
                document.documentElement.removeEventListener("mouseup", stopDrag, false);
            };
            document.documentElement.addEventListener("mousemove", doDrag, false);
            document.documentElement.addEventListener("mouseup", stopDrag, false);
            onCleanup(()=>{
                document.documentElement.removeEventListener("mousemove", doDrag, false);
                document.documentElement.removeEventListener("mouseup", stopDrag, false);
            });
        };
        return (()=>{
            var _el$ = _tmpl$$4(), _el$2 = _el$.firstChild, _el$3 = _el$2.firstChild, _el$4 = _el$3.nextSibling, _el$5 = _el$4.firstChild, _el$6 = _el$5.nextSibling, _el$7 = _el$2.nextSibling;
            use((el)=>container = el, _el$);
            addEventListener(_el$2, "dragend", props.onDragEnd);
            addEventListener(_el$2, "drop", props.onDrop);
            addEventListener(_el$2, "dragover", props.onDragOver);
            addEventListener(_el$2, "dragstart", props.onDragStart);
            insert(_el$2, createComponent(props.icon, {}), _el$3);
            insert(_el$3, ()=>props.title);
            addEventListener(_el$5, "click", props.onToggleCollapse, true);
            insert(_el$5, (()=>{
                var _c$ = createMemo(()=>!!props.collapsed);
                return ()=>_c$() ? createComponent(VsChevronUp, {}) : createComponent(VsChevronDown, {});
            })());
            _el$6.$$click = ()=>props.onClose(props.index);
            insert(_el$6, createComponent(VsClose, {}));
            insert(_el$, (()=>{
                var _c$2 = createMemo(()=>!!!props.collapsed);
                return ()=>_c$2() && (()=>{
                        var _el$8 = _tmpl$2();
                        insert(_el$8, ()=>props.children);
                        createRenderEffect((_p$)=>{
                            var _v$9 = {
                                ...props.childStyle,
                                flex: "1 1 auto",
                                "overflow-y": props.overflow || "auto"
                            }, _v$10 = styles$3["pane-content"];
                            _p$.e = style(_el$8, _v$9, _p$.e);
                            _v$10 !== _p$.t && className(_el$8, _p$.t = _v$10);
                            return _p$;
                        }, {
                            e: void 0,
                            t: void 0
                        });
                        return _el$8;
                    })();
            })(), _el$7);
            _el$7.$$mousedown = handleMouseDown;
            createRenderEffect((_p$)=>{
                var _v$ = props.title, _v$2 = styles$3["pane-container"], _v$3 = {
                    ...props.style,
                    height: props.height
                }, _v$4 = `${styles$3["pane-title"]}`, _v$5 = styles$3["buttons-container"], _v$6 = `${styles$3["collapse-button"]} no-button-style`, _v$7 = `${styles$3["close-button"]} no-button-style`, _v$8 = styles$3["resize-handle"];
                _v$ !== _p$.e && setAttribute(_el$, "id", _p$.e = _v$);
                _v$2 !== _p$.t && className(_el$, _p$.t = _v$2);
                _p$.a = style(_el$, _v$3, _p$.a);
                _v$4 !== _p$.o && className(_el$2, _p$.o = _v$4);
                _v$5 !== _p$.i && className(_el$4, _p$.i = _v$5);
                _v$6 !== _p$.n && className(_el$5, _p$.n = _v$6);
                _v$7 !== _p$.s && className(_el$6, _p$.s = _v$7);
                _v$8 !== _p$.h && className(_el$7, _p$.h = _v$8);
                return _p$;
            }, {
                e: void 0,
                t: void 0,
                a: void 0,
                o: void 0,
                i: void 0,
                n: void 0,
                s: void 0,
                h: void 0
            });
            return _el$;
        })();
    };
    delegateEvents([
        "click",
        "mousedown"
    ]);
    const styles$2 = {
        "left-sidebar": "_left-sidebar_wredn_1",
        "pane-list": "_pane-list_wredn_4",
        "new-column-area": "_new-column-area_wredn_15",
        "drop-target": "_drop-target_wredn_28",
        "first-column": "_first-column_wredn_36"
    };
    var _tmpl$$3 = template(`<div>`);
    const LeftSidebar = (props)=>{
        const MAX_COLUMNS = 50;
        const [columns, setColumns] = createSignal(2);
        const [isDragging, setIsDragging] = createSignal(false);
        const [dropTarget, setDropTarget] = createSignal(null);
        const [windowHeight, setWindowHeight] = createSignal(window.innerHeight);
        const [padding, setPadding] = createSignal(20);
        let dragImage = null;
        const updateWindowHeight = ()=>{
            setWindowHeight(window.innerHeight);
        };
        window.addEventListener("resize", updateWindowHeight);
        onCleanup(()=>{
            window.removeEventListener("resize", updateWindowHeight);
        });
        const handleDragStart = (e, id)=>{
            e.dataTransfer.setData("text/plain", id.toString());
            dragImage = document.createElement("div");
            dragImage.classList.add(styles$2["drag-image"]);
            const pane = panes().find((p)=>p.id === id);
            if (pane) {
                dragImage.textContent = pane.name;
                document.body.appendChild(dragImage);
                e.dataTransfer.setDragImage(dragImage, 0, 0);
            }
            setIsDragging(true);
        };
        const handleDragEnd = ()=>{
            setIsDragging(false);
            setDropTarget(null);
            document.body.removeChild(dragImage);
        };
        const handleDragOver = (e, columnIndex)=>{
            e.preventDefault();
            setDropTarget(columnIndex);
        };
        const handleDrop = (e, columnIndex)=>{
            e.preventDefault();
            const paneId = Number.parseInt(e.dataTransfer.getData("text/plain"), 10);
            let updatedPanes = panes().map((pane)=>pane.id === paneId ? {
                    ...pane,
                    column: columnIndex
                } : pane);
            if (columnIndex === columns() && columns() < MAX_COLUMNS) {
                setColumns(columns() + 1);
            }
            const nonEmptyColumns = new Set(updatedPanes.map((pane)=>pane.column));
            const newPanes = updatedPanes.map((pane)=>({
                    ...pane,
                    column: [
                        ...nonEmptyColumns
                    ].indexOf(pane.column)
                }));
            updatedPanes = adjustPaneHeights(newPanes, columnIndex);
            setPanes(updatedPanes);
            setColumns(nonEmptyColumns.size);
            setIsDragging(false);
            setDropTarget(null);
        };
        const adjustPaneHeights = (panes2, columnIndex)=>{
            const columnPanes = panes2.filter((pane)=>pane.column === columnIndex);
            const firstPaneIndex = panes2.findIndex((pane)=>pane.column === columnIndex);
            const totalHeight = columnPanes.reduce((acc, pane, index)=>{
                const panePadding = index === 0 ? padding() : 0;
                return acc + Number.parseInt(pane.height) + panePadding;
            }, 0);
            if (totalHeight > windowHeight()) {
                const ratio = windowHeight() / totalHeight;
                return panes2.map((pane, index)=>{
                    const panePadding = index === firstPaneIndex ? padding() : 0;
                    if (pane.column === columnIndex) {
                        return {
                            ...pane,
                            height: `${(Number.parseInt(pane.height) + panePadding) * ratio - panePadding}px`
                        };
                    }
                    return pane;
                });
            }
            return panes2;
        };
        const getPanesForColumn = (columnIndex)=>panes().filter((pane)=>pane.column === columnIndex);
        const handleClosePane = (paneId)=>{
            const remainingPanes = panes().filter((pane)=>pane.id.toString() !== paneId);
            const nonEmptyColumns = new Set(remainingPanes.map((pane)=>pane.column));
            const newPanes = remainingPanes.map((pane)=>({
                    ...pane,
                    column: [
                        ...nonEmptyColumns
                    ].indexOf(pane.column)
                }));
            setPanes(newPanes);
            setColumns(nonEmptyColumns.size);
        };
        const handleResizePane = (index, newHeight)=>{
            const updatedPanes = panes().map((pane)=>pane.id === index ? {
                    ...pane,
                    height: newHeight,
                    collapsed: false
                } : pane);
            const columnIndex = updatedPanes.find((pane)=>pane.id === index)?.column;
            const adjustedPanes = adjustPaneHeights(updatedPanes, columnIndex);
            setPanes(adjustedPanes);
        };
        const toggleCollapsePane = (paneId)=>{
            const updatedPanes = panes().map((pane)=>{
                if (pane.id.toString() === paneId) {
                    const newHeight = pane.collapsed ? pane.previousHeight : "0px";
                    return {
                        ...pane,
                        collapsed: !pane.collapsed,
                        height: newHeight,
                        previousHeight: pane.collapsed ? pane.previousHeight : pane.height
                    };
                }
                return pane;
            });
            setPanes(updatedPanes);
        };
        return (()=>{
            var _el$ = _tmpl$$3();
            _el$.style.setProperty("display", "flex");
            _el$.style.setProperty("flex-direction", "row");
            _el$.style.setProperty("height", "100%");
            insert(_el$, createComponent(For, {
                get each () {
                    return Array.from({
                        length: columns()
                    });
                },
                children: (_, columnIndex)=>(()=>{
                        var _el$2 = _tmpl$$3();
                        _el$2.addEventListener("drop", (e)=>handleDrop(e, columnIndex()));
                        _el$2.addEventListener("dragover", (e)=>handleDragOver(e, columnIndex()));
                        insert(_el$2, createComponent(For, {
                            get each () {
                                return getPanesForColumn(columnIndex());
                            },
                            children: (pane)=>createComponent(Pane, {
                                    get overflow () {
                                        return pane.contentOverflow;
                                    },
                                    get index () {
                                        return pane.id;
                                    },
                                    get title () {
                                        return pane.name;
                                    },
                                    get icon () {
                                        return pane.icon;
                                    },
                                    get style () {
                                        return {
                                            ...pane.style
                                        };
                                    },
                                    get height () {
                                        return pane.height.toString();
                                    },
                                    get collapsed () {
                                        return pane.collapsed;
                                    },
                                    onToggleCollapse: ()=>toggleCollapsePane(pane.id.toString()),
                                    onDragStart: (e)=>handleDragStart(e, pane.id),
                                    onDragEnd: handleDragEnd,
                                    onDragOver: (e)=>handleDragOver(e, columnIndex()),
                                    onDrop: (e)=>handleDrop(e, columnIndex()),
                                    onClose: ()=>handleClosePane(pane.id.toString()),
                                    onResize: handleResizePane,
                                    get childStyle () {
                                        return {
                                            ...pane.childStyle
                                        };
                                    },
                                    get children () {
                                        return pane.component({});
                                    }
                                })
                        }));
                        createRenderEffect(()=>className(_el$2, `${styles$2["pane-list"]} ${dropTarget() === columnIndex() ? styles$2["drop-target"] : ""} ${columnIndex() === 0 ? styles$2["first-column"] : ""}`));
                        return _el$2;
                    })()
            }), null);
            insert(_el$, (()=>{
                var _c$ = createMemo(()=>!!(isDragging() && columns() < MAX_COLUMNS));
                return ()=>_c$() && (()=>{
                        var _el$3 = _tmpl$$3();
                        _el$3.addEventListener("drop", (e)=>handleDrop(e, columns()));
                        _el$3.addEventListener("dragover", (e)=>handleDragOver(e, columns()));
                        insert(_el$3, createComponent(TbPlus, {
                            "font-size": "36"
                        }));
                        createRenderEffect(()=>className(_el$3, `${styles$2["new-column-area"]} ${dropTarget() === columns() ? styles$2["drop-target"] : ""}`));
                        return _el$3;
                    })();
            })(), null);
            createRenderEffect(()=>className(_el$, styles$2["left-sidebar"]));
            return _el$;
        })();
    };
    const language = "_language_auxw1_1";
    const styles$1 = {
        language: language
    };
    var _tmpl$$2 = template(`<div>`);
    const Language = ()=>{
        const handleLanguageClick = ()=>{
            setContentToLanguages();
            setIsOpen(true);
        };
        const handleKeypress = (e)=>{
            if (e.key === "Space" || e.key === "Enter") {
                setContentToLanguages();
                setIsOpen(true);
            }
        };
        return (()=>{
            var _el$ = _tmpl$$2();
            _el$.addEventListener("keypress", handleKeypress);
            _el$.$$click = handleLanguageClick;
            insert(_el$, selectedLanguage);
            createRenderEffect(()=>className(_el$, styles$1.language));
            return _el$;
        })();
    };
    delegateEvents([
        "click"
    ]);
    const styles = {
        "status-pane": "_status-pane_sce63_5",
        "left-side": "_left-side_sce63_22",
        "right-side": "_right-side_sce63_27"
    };
    var _tmpl$$1 = template(`<div><div><div>Ln <!>, Col </div></div><div>`);
    const StatusPane = (props)=>{
        return (()=>{
            var _el$ = _tmpl$$1(), _el$2 = _el$.firstChild, _el$3 = _el$2.firstChild, _el$4 = _el$3.firstChild, _el$7 = _el$4.nextSibling;
            _el$7.nextSibling;
            var _el$8 = _el$2.nextSibling;
            insert(_el$3, ()=>props.editor().cursorAt(0).line + 1, _el$7);
            insert(_el$3, ()=>props.editor().cursorAt(0).character + 1, null);
            insert(_el$8, createComponent(Language, {}));
            createRenderEffect((_p$)=>{
                var _v$ = styles["status-pane"], _v$2 = styles["left-side"], _v$3 = styles["line-column"], _v$4 = styles["right-side"];
                _v$ !== _p$.e && className(_el$, _p$.e = _v$);
                _v$2 !== _p$.t && className(_el$2, _p$.t = _v$2);
                _v$3 !== _p$.a && className(_el$3, _p$.a = _v$3);
                _v$4 !== _p$.o && className(_el$8, _p$.o = _v$4);
                return _p$;
            }, {
                e: void 0,
                t: void 0,
                a: void 0,
                o: void 0
            });
            return _el$;
        })();
    };
    class Cursor {
        _character;
        _line;
        _basis;
        constructor(character = 0, line = 0){
            this._character = createSignal(character);
            this._line = createSignal(line);
            this._basis = createSignal(0);
        }
        get character() {
            return this._character[0]();
        }
        set character(value) {
            this._character[1](value);
        }
        get line() {
            return this._line[0]();
        }
        set line(value) {
            this._line[1](value);
        }
        get basis() {
            return this._basis[0]();
        }
        set basis(value) {
            this._basis[1](value);
        }
        moveTo(character, line, lineLength, totalLines) {
            let adjustedCharacter = character;
            let adjustedLine = line;
            if (character < 0) {
                adjustedCharacter = 0;
            } else if (character > lineLength) {
                adjustedCharacter = lineLength;
            }
            if (line < 0) {
                adjustedLine = 0;
            } else if (line > totalLines) {
                adjustedLine = totalLines;
            }
            this._basis[1](adjustedCharacter);
            this._character[1](adjustedCharacter);
            this._line[1](adjustedLine);
        }
        moveRight(lineLength, totalLines) {
            if (this.character < lineLength) {
                this._character[1](this.character + 1);
                this._basis[1](this.character);
            } else if (this.line < totalLines - 1) {
                this._line[1](this.line + 1);
                this._character[1](0);
                this._basis[1](0);
            }
        }
        moveLeft(lineLength) {
            if (this.character > 0) {
                this._character[1](this.character - 1);
                this._basis[1](this.character);
            } else if (this.line > 0) {
                this._line[1](this.line - 1);
                this._character[1](lineLength);
                this._basis[1](lineLength);
            }
        }
        moveUp(prevLineLength) {
            if (this.line > 0) {
                this._line[1](this.line - 1);
                this._character[1](Math.min(prevLineLength, this.basis));
            }
        }
        moveDown(totalLines, nextLineLength) {
            if (this.line < totalLines - 1) {
                this._line[1](this.line + 1);
                this._character[1](Math.min(this.basis, nextLineLength));
            }
        }
    }
    class Selection {
        startIndexSignal;
        endIndexSignal;
        startLineSignal;
        endLineSignal;
        directionSignal;
        constructor(startIndex, endIndex, startLine, endLine){
            this.startIndexSignal = createSignal(startIndex);
            this.endIndexSignal = createSignal(endIndex);
            this.startLineSignal = createSignal(startLine);
            this.endLineSignal = createSignal(endLine);
            this.directionSignal = createSignal(0);
        }
        get startIndex() {
            return this.startIndexSignal[0]();
        }
        get endIndex() {
            return this.endIndexSignal[0]();
        }
        get startLine() {
            return this.startLineSignal[0]();
        }
        get endLine() {
            return this.endLineSignal[0]();
        }
        get direction() {
            return this.directionSignal[0]();
        }
        isEmpty() {
            return this.startIndex === this.endIndex && this.startLine === this.endLine;
        }
        expandTo(newEndIndex) {
            this.endIndexSignal[1](newEndIndex);
        }
        handleSelection(direction, cursor, lineEndIndex, prevLineIndex, totalLines) {
            if (this.isEmpty()) {
                this.startNewSelection(direction, cursor, prevLineIndex, lineEndIndex);
                this.directionSignal[1](direction);
            } else {
                this.updateSelection(direction, cursor, lineEndIndex, prevLineIndex, totalLines);
            }
        }
        startNewSelection(direction, cursor, prevLineIndex, lineEndIndex) {
            switch(direction){
                case 0:
                    if (cursor.basis === lineEndIndex) ;
                    else {
                        this.startLineSignal[1](cursor.line);
                        this.endLineSignal[1](cursor.line);
                        this.startIndexSignal[1](cursor.character);
                        this.endIndexSignal[1](cursor.character + 1);
                    }
                    break;
                case 1:
                    this.startLineSignal[1](cursor.line);
                    this.endLineSignal[1](cursor.line);
                    if (cursor.character > 0) {
                        this.startIndexSignal[1](cursor.character - 1);
                        this.endIndexSignal[1](cursor.character);
                    } else if (cursor.line > 0) {
                        this.startIndexSignal[1](prevLineIndex);
                        this.endIndexSignal[1](cursor.character);
                        this.startLineSignal[1](cursor.line - 1);
                    } else {
                        this.startIndexSignal[1](cursor.character);
                        this.endIndexSignal[1](cursor.character);
                    }
                    break;
                case 2:
                    this.startLineSignal[1](cursor.line - 1);
                    this.endLineSignal[1](cursor.line);
                    this.startIndexSignal[1](cursor.character);
                    this.endIndexSignal[1](cursor.character);
                    break;
                case 3:
                    this.startLineSignal[1](cursor.line);
                    this.endLineSignal[1](cursor.line + 1);
                    this.startIndexSignal[1](cursor.character);
                    this.endIndexSignal[1](cursor.character);
                    break;
            }
        }
        normalizeSelection() {
            if (this.startLine > this.endLine) {
                const tmp = this.startLineSignal[0]();
                this.startLineSignal[1](this.endLineSignal[0]());
                this.endLineSignal[1](tmp);
            }
            if (this.startIndex > this.endIndex && this.endLine === this.startLine) {
                const tmp = this.startIndexSignal[0]();
                this.startIndexSignal[1](this.endIndexSignal[0]());
                this.endIndexSignal[1](tmp);
            }
        }
        contractSelection(direction, cursor, lineEndIndex, prevLineIndex) {
            if (this.isEmpty()) {
                return;
            }
            switch(direction){
                case 0:
                    if (cursor.basis === lineEndIndex) {
                        this.startLineSignal[1](this.startLine + 1);
                        this.startIndexSignal[1](0);
                    } else {
                        this.startIndexSignal[1](this.startIndex + 1);
                    }
                    break;
                case 1:
                    if (cursor.basis === 0) {
                        this.endLineSignal[1](this.endLine - 1);
                        this.endIndexSignal[1](prevLineIndex);
                    } else {
                        this.endIndexSignal[1](this.endIndex - 1);
                    }
                    break;
                case 2:
                    this.endLineSignal[1](this.endLine - 1);
                    this.endIndexSignal[1](cursor.basis);
                    this.normalizeSelection();
                    break;
                case 3:
                    this.startLineSignal[1](this.startLine + 1);
                    this.startIndexSignal[1](cursor.basis);
                    break;
            }
        }
        expandSelection(direction, cursor, lineEndIndex, prevLineIndex, totalLines) {
            switch(direction){
                case 0:
                    {
                        if (this.endIndex === lineEndIndex) {
                            if (cursor.line < totalLines - 1) {
                                this.endIndexSignal[1](0);
                                this.endLineSignal[1](this.endLine + 1);
                            }
                        } else {
                            this.endIndexSignal[1](this.endIndex + 1);
                        }
                        break;
                    }
                case 1:
                    {
                        if (this.startIndex === 0) {
                            if (cursor.line > 0) {
                                const newStartIndex = Math.max(0, prevLineIndex);
                                this.startIndexSignal[1](newStartIndex);
                                this.startLineSignal[1](this.startLine - 1);
                            }
                        } else {
                            this.startIndexSignal[1](this.startIndex - 1);
                        }
                        break;
                    }
                case 2:
                    this.startLineSignal[1](Math.max(0, cursor.line - 1));
                    this.startIndexSignal[1](cursor.basis);
                    break;
                case 3:
                    this.endLineSignal[1](Math.min(totalLines, cursor.line + 1));
                    this.endIndexSignal[1](cursor.basis);
                    break;
            }
        }
        handleInversion(direction, cursor) {
            const tmpIndex = this.startIndex;
            this.startIndexSignal[1](this.endIndex);
            this.endIndexSignal[1](tmpIndex);
            if (direction === 2) {
                this.startLineSignal[1](cursor.line - 1);
            } else if (direction === 3) {
                this.endLineSignal[1](cursor.line + 1);
            }
            this.directionSignal[1](direction);
        }
        updateSelection(direction, cursor, lineEndIndex, prevLineIndex, totalLines) {
            const expandOrContract = (expandDirections, contractCondition)=>{
                if (expandDirections.includes(this.direction)) {
                    this.expandSelection(direction, cursor, lineEndIndex, prevLineIndex, totalLines);
                } else if (contractCondition) {
                    this.contractSelection(direction, cursor, lineEndIndex, prevLineIndex);
                }
            };
            switch(direction){
                case 0:
                    expandOrContract([
                        0,
                        3
                    ], true);
                    break;
                case 1:
                    expandOrContract([
                        1,
                        2
                    ], true);
                    break;
                case 2:
                    expandOrContract([
                        2,
                        1
                    ], cursor.line !== this.startLine);
                    if (this.direction === 0 && cursor.line === this.startLine) {
                        this.handleInversion(2, cursor);
                    } else if (this.direction === 3 && this.startLine === this.endLine) {
                        this.handleInversion(2, cursor);
                    }
                    break;
                case 3:
                    expandOrContract([
                        3,
                        0
                    ], cursor.line !== this.endLine);
                    if (this.direction === 1 && cursor.line === this.endLine) {
                        this.handleInversion(3, cursor);
                    } else if (this.direction === 2 && this.startLine === this.endLine) {
                        this.handleInversion(3, cursor);
                    }
                    break;
            }
            this.normalizeSelection();
        }
        handleSelectionLeft(cursor, lineEndIndex, prevLineIndex, totalLines) {
            this.handleSelection(1, cursor, lineEndIndex, prevLineIndex, totalLines);
        }
        handleSelectionRight(cursor, lineEndIndex, prevLineIndex, totalLines) {
            this.handleSelection(0, cursor, lineEndIndex, prevLineIndex, totalLines);
        }
        handleSelectionUp(cursor, lineEndIndex, prevLineIndex, totalLines) {
            this.handleSelection(2, cursor, lineEndIndex, prevLineIndex, totalLines);
        }
        handleSelectionDown(cursor, lineEndIndex, prevLineIndex, totalLines) {
            this.handleSelection(3, cursor, lineEndIndex, prevLineIndex, totalLines);
        }
        setStartIndex(newStartIndex) {
            this.startIndexSignal[1](newStartIndex);
        }
        setEndIndex(newEndIndex) {
            this.endIndexSignal[1](newEndIndex);
        }
        reset() {
            this.startIndexSignal[1](-100);
            this.endIndexSignal[1](-100);
            this.startLineSignal[1](-100);
            this.endLineSignal[1](-100);
            this.directionSignal[1](0);
        }
    }
    class Editor {
        content;
        lineBreakIndices;
        id;
        tabId = null;
        contentSignal;
        selectionSignal = createSignal([]);
        cursorsSignal = createSignal([]);
        lineNumbersSignal = createSignal(1);
        constructor(text, id){
            this.content = new PieceTable(text);
            this.lineBreakIndices = [
                0
            ];
            this.id = id;
            this.contentSignal = createSignal(this.content.getText());
            this.cursorsSignal[1]([
                new Cursor()
            ]);
            this.selectionSignal[1]([
                new Selection(-100, -100, -100, -100)
            ]);
        }
        deleteSelectionIfNeeded = ()=>{
            if (!this.selectionSignal[0]()[0].isEmpty()) {
                this.deleteSelection(0);
            }
            this.selectionSignal[1]([
                new Selection(-100, -100, -100, -100)
            ]);
        };
        setPieceTable = (pieceTable)=>{
            this.content = pieceTable;
            this.contentSignal[1](this.content.getText());
            this.lineBreakIndices = this.calculateLineBreaks();
            this.lineNumbersSignal[1](this.lineBreakIndices.length);
            this.cursorAt(0).moveTo(0, 0, this.lineLength(0), this.totalLines());
        };
        setContent = (text)=>{
            const newText = this.convertTabsToSpaces(text);
            this.content.restoreText(newText);
            this.contentSignal[1](this.content.getText());
            this.lineNumbersSignal[1](this.calculateLineBreaks().length);
            this.lineBreakIndices = this.calculateLineBreaks();
        };
        convertTabsToSpaces = (text)=>{
            return text.replace(/\t/g, "    ");
        };
        calculateLineBreaks = ()=>{
            let indices = [];
            let text = this.content.getText();
            let position = text.indexOf("\n");
            while(position !== -1){
                indices.push(position);
                position = text.indexOf("\n", position + 1);
            }
            if (text.length > 0 && text[text.length - 1] !== "\n") {
                indices.push(text.length);
            }
            if (indices.length === 0) {
                indices.push(0);
            }
            if (text.endsWith("\n")) {
                indices.push(text.length);
            }
            return indices;
        };
        getText() {
            return this.contentSignal[0]();
        }
        shiftTab = (cursorIndex)=>{
            const cursor = this.cursors[cursorIndex];
            const lineContent = this.lineContent(cursor.line);
            let newCharacterPos = cursor.character;
            if (lineContent.length === 0) {
                return;
            }
            let spacesToDelete = 0;
            while(spacesToDelete < 4 && lineContent[spacesToDelete] === " "){
                spacesToDelete++;
            }
            if (spacesToDelete > 0) {
                this.content.delete(this.calculateGlobalIndex(cursor.line, 0), spacesToDelete);
                newCharacterPos = Math.max(0, cursor.character - spacesToDelete);
            }
            this.contentSignal[1](this.content.getText());
            cursor.moveTo(newCharacterPos, cursor.line, this.lineContent(cursor.line).length, this.lineBreakIndices.length - 1);
        };
        tab = (cursorIndex)=>{
            const cursor = this.cursors[cursorIndex];
            const globalIndex = this.calculateGlobalIndex(cursor.line, this.cursorAt(0).character);
            this.deleteSelectionIfNeeded();
            this.content.insert("    ", globalIndex);
            this.contentSignal[1](this.content.getText());
            this.lineBreakIndices = this.calculateLineBreaks();
            cursor.moveTo(cursor.character + 4, cursor.line, this.lineContent(cursor.line).length, this.lineBreakIndices.length - 1);
        };
        insert = (text, cursorIndex)=>{
            this.deleteSelectionIfNeeded();
            const cursor = this.cursorsSignal[0]()[cursorIndex];
            if (this.content.getText().length === 0) {
                cursor.moveTo(0, 0, 0, 1);
            }
            const globalIndex = this.calculateGlobalIndex(cursor.line, cursor.character);
            batch(()=>{
                this.content.insert(text, globalIndex);
                this.contentSignal[1](this.content.getText());
                this.lineBreakIndices = this.calculateLineBreaks();
                this.lineNumbersSignal[1](this.lineBreakIndices.length);
                const selections = this.selectionSignal[0]();
                selections[0].reset();
                this.selectionSignal[1](selections);
                cursor.character += text.length;
                this.cursorsSignal[1](this.cursorsSignal[0]());
            });
        };
        deleteSelection = (selectionIndex)=>{
            const selection = this.selections[selectionIndex];
            const globalIndexStart = this.calculateGlobalIndex(selection.startLine, selection.startIndex);
            const globalIndexEnd = this.calculateGlobalIndex(selection.endLine, selection.endIndex);
            batch(()=>{
                this.content.delete(globalIndexStart, globalIndexEnd - globalIndexStart);
                this.cursorAt(0).moveTo(0, 0, 1, 1);
                this.selections[0].reset();
                this.lineBreakIndices = this.calculateLineBreaks();
                this.contentSignal[1](this.content.getText());
                this.lineNumbersSignal[1](1);
            });
        };
        delete = (cursorIndex)=>{
            const cursor = this.cursors[cursorIndex];
            if (this.selections.some((selection)=>!selection.isEmpty())) {
                const selectionIndex = this.selections.findIndex((selection)=>!selection.isEmpty());
                this.deleteSelection(selectionIndex);
                return;
            }
            if (cursor.line === 0 && cursor.character === 0) {
                return;
            }
            batch(()=>{
                const lineContent = this.lineContent(cursor.line);
                const cursorPos = cursor.character;
                if (cursorPos >= 4 && lineContent.slice(cursorPos - 4, cursorPos) === "    ") {
                    const globalIndex = this.calculateGlobalIndex(cursor.line, cursorPos);
                    this.content.delete(globalIndex - 4, 4);
                    cursor.moveTo(cursorPos - 4, cursor.line, this.lineContent(cursor.line).length, this.lineBreakIndices.length - 1);
                } else if (cursor.character === 0) {
                    const prevLineEndIndex = this.lineBreakIndices[cursor.line - 1];
                    this.content.delete(prevLineEndIndex, 1);
                    cursor.moveTo(this.lineContent(cursor.line - 1).length, cursor.line - 1, this.lineLength(cursor.line - 1), this.lineBreakIndices.length - 1);
                } else {
                    const globalIndex = this.calculateGlobalIndex(cursor.line, cursor.character);
                    this.content.delete(globalIndex - 1, 1);
                    cursor.moveLeft(this.lineContent(cursor.line).length);
                }
                this.lineBreakIndices = this.calculateLineBreaks();
                this.contentSignal[1](this.content.getText());
                this.lineNumbersSignal[1](this.lineBreakIndices.length);
            });
        };
        length() {
            return this.content.length() ?? 0;
        }
        numberOfLines() {
            return this.lineBreakIndices.length;
        }
        text() {
            return this.content.getText();
        }
        totalLines = ()=>{
            return this.lineNumbersSignal[0]();
        };
        lineLength = (lineNumber)=>{
            return this.lineContent(lineNumber).length;
        };
        lineContent = (lineNumber)=>{
            if (lineNumber < 0 || lineNumber >= this.numberOfLines()) {
                console.warn(`Invalid line number ${lineNumber}`);
                return "";
            }
            const startIndex = lineNumber === 0 ? 0 : this.lineBreakIndices[lineNumber - 1] + 1;
            const endIndex = lineNumber < this.lineBreakIndices.length ? this.lineBreakIndices[lineNumber] : this.content.getText().length;
            return this.content.extractText(startIndex, endIndex);
        };
        addLine = (cursorIndex)=>{
            const cursor = this.cursors[cursorIndex];
            let currentLine = cursor.line;
            let currentChar = cursor.character;
            batch(()=>{
                if (!this.selections[0].isEmpty()) {
                    this.deleteSelection(0);
                    currentLine = this.cursors[0].line;
                    currentChar = this.cursors[0].character;
                }
                const globalIndex = this.calculateGlobalIndex(currentLine, currentChar);
                this.content.insert("\n", globalIndex);
                this.lineBreakIndices = this.calculateLineBreaks();
                this.contentSignal[1](this.content.getText());
                this.lineNumbersSignal[1](this.lineBreakIndices.length);
                const newLine = currentLine + 1;
                cursor.moveTo(0, newLine, 0, this.lineBreakIndices.length - 1);
            });
        };
        calculateGlobalIndex = (line, column)=>{
            let index = 0;
            for(let i = 0; i < line; i++){
                index += this.lineContent(i).length + 1;
            }
            return index + column;
        };
        calculateLocalIndex(globalIndex) {
            let remainingIndex = globalIndex;
            let line = 0;
            while(line < this.totalLines() && remainingIndex >= this.lineContent(line).length + 1){
                remainingIndex -= this.lineContent(line).length + 1;
                line++;
            }
            return {
                line,
                column: remainingIndex
            };
        }
        cursorAt(index) {
            return this.cursors[index];
        }
        get cursors() {
            return this.cursorsSignal[0]();
        }
        set cursors(newCursors) {
            this.cursorsSignal[1](newCursors);
        }
        moveTo = (character, line, cursorIndex = 0)=>{
            const cursor = this.cursors[cursorIndex];
            const totalLines = this.lineBreakIndices.length;
            cursor.moveTo(character, line, this.lineContent(cursor.line).length, totalLines - 1);
            if (cursor.line === 0) {
                this.moveToLineStart(cursorIndex);
            } else if (cursor.line === totalLines - 1) {
                this.moveToLineEnd(cursorIndex);
            }
        };
        moveToLineStart = (cursorIndex)=>{
            const cursor = this.cursors[cursorIndex];
            cursor.moveTo(0, cursor.line, this.lineContent(cursor.line).length, this.lineBreakIndices.length - 1);
        };
        moveToLineEnd = (cursorIndex)=>{
            const cursor = this.cursors[cursorIndex];
            const lineLength = this.lineContent(cursor.line).length;
            cursor.moveTo(lineLength, cursor.line, lineLength, this.lineBreakIndices.length - 1);
        };
        moveRight = (cursorIndex)=>{
            const cursor = this.cursors[cursorIndex];
            const lineContent = this.lineContent(cursor.line);
            const lineLength = lineContent.length;
            const totalLines = this.lineBreakIndices.length;
            if (cursor.character <= lineLength - 4 && lineContent.slice(cursor.character, cursor.character + 4) === "    ") {
                cursor.moveTo(cursor.character + 4, cursor.line, lineLength, totalLines - 1);
            } else {
                cursor.moveRight(lineLength, totalLines);
            }
        };
        moveLeft = (cursorIndex)=>{
            const cursor = this.cursors[cursorIndex];
            const lineContent = this.lineContent(cursor.line);
            const prevLineLength = this.lineContent(cursor.line === 0 ? 0 : cursor.line - 1).length;
            if (cursor.character >= 4 && lineContent.slice(cursor.character - 4, cursor.character) === "    ") {
                cursor.moveTo(cursor.character - 4, cursor.line, lineContent.length, this.lineBreakIndices.length - 1);
            } else {
                cursor.moveLeft(prevLineLength);
            }
        };
        moveUp = (cursorIndex)=>{
            const cursor = this.cursors[cursorIndex];
            const prevLineLength = this.lineContent(cursor.line === 0 ? 0 : cursor.line - 1).length;
            cursor.moveUp(prevLineLength);
        };
        moveDown = (cursorIndex)=>{
            const cursor = this.cursors[cursorIndex];
            const totalLines = this.lineBreakIndices.length;
            const nextLineLength = this.lineContent(cursor.line + 1).length;
            cursor.moveDown(totalLines, nextLineLength);
        };
        addCursor(cursor) {
            this.cursors = [
                ...this.cursors,
                cursor
            ];
        }
        removeCursor(index) {
            this.cursors = this.cursors.filter((_, i)=>i !== index);
        }
        copy = ()=>{
            const selection = this.selections.find((selection2)=>!selection2.isEmpty());
            if (selection && !selection?.isEmpty()) {
                const text = this.content.getText();
                const startIndex = this.calculateGlobalIndex(selection.startLine, selection.startIndex);
                const endIndex = this.calculateGlobalIndex(selection.endLine, selection.endIndex);
                return text.substring(startIndex, endIndex);
            }
            return this.lineContent(this.cursors[0].line);
        };
        cut() {
            const selection = this.selections.find((selection2)=>!selection2.isEmpty());
            const textToCut = selection && !selection.isEmpty() ? this.content.getText().substring(this.calculateGlobalIndex(selection.startLine, selection.startIndex), this.calculateGlobalIndex(selection.endLine, selection.endIndex)) : this.lineContent(this.cursors[0].line);
            const startIndex = this.calculateGlobalIndex(selection?.startLine ?? this.cursors[0].line, selection?.startIndex ?? this.cursors[0].character);
            this.content.delete(startIndex, textToCut.length);
            this.lineBreakIndices = this.calculateLineBreaks();
            const totalLines = this.lineBreakIndices.length;
            batch(()=>{
                this.contentSignal[1](this.content.getText());
                this.lineNumbersSignal[1](totalLines);
            });
            if (selection) {
                this.cursors[0].line = selection.startLine;
                this.cursors[0].character = selection.startIndex;
            } else {
                this.cursors[0].character = 0;
            }
            return textToCut;
        }
        paste = (text)=>{
            this.deleteSelectionIfNeeded();
            const initialLine = this.cursors[0].line;
            const initialChar = this.cursors[0].character;
            const isAtLineEnd = initialChar === this.lineLength(initialLine) && initialChar !== 0;
            const index = this.calculateGlobalIndex(initialLine, initialChar);
            this.content.insert(this.convertTabsToSpaces(text), isAtLineEnd ? index + 1 : index);
            this.lineBreakIndices = this.calculateLineBreaks();
            const totalLines = this.lineBreakIndices.length;
            batch(()=>{
                this.contentSignal[1](this.content.getText());
                this.lineNumbersSignal[1](totalLines);
                const pastedLines = text.split("\n").length;
                const linesAdded = pastedLines - 1;
                this.cursorAt(0).line = linesAdded > 0 ? initialLine + linesAdded : initialLine;
                this.cursorAt(0).character = linesAdded > 0 ? text.split("\n")[linesAdded].length : initialChar + text.length;
            });
        };
        selectAll = ()=>{
            this.selectionSignal[1]([
                new Selection(0, this.length(), 0, this.totalLines())
            ]);
        };
        addSelection(selection) {
            this.selectionSignal[1]([
                ...this.selectionSignal[0](),
                selection
            ]);
        }
        removeSelection(index) {
            this.selectionSignal[1](this.selectionSignal[0]().filter((_, i)=>i !== index));
        }
        clearSelection(index) {
            this.selections[index].reset();
        }
        updateSelection(index, selection) {
            const selections = this.selectionSignal[0]();
            selections[index] = selection;
            this.selectionSignal[1]([
                ...selections
            ]);
        }
        getSelection(index) {
            return this.selectionSignal[0]()[index];
        }
        get selections() {
            return this.selectionSignal[0]();
        }
        clearSelections() {
            this.selectionSignal[1]([]);
        }
    }
    var _tmpl$ = template(`<div class=app-container>`);
    EditorStore.addEditor(new Editor("hello", "editor1"));
    EditorStore.setActiveEditor("editor1");
    const languageMap = {
        sh: Languages.Bash,
        c: Languages.C,
        cpp: Languages.CPP,
        cxx: Languages.CPP,
        cc: Languages.CPP,
        h: Languages.CPP,
        hpp: Languages.CPP,
        cs: Languages.CSharp,
        css: Languages.CSS,
        lisp: Languages.CommonLisp,
        lsp: Languages.CommonLisp,
        cu: Languages.CUDA,
        glsl: Languages.GLSL,
        vert: Languages.GLSL,
        frag: Languages.GLSL,
        go: Languages.Go,
        hs: Languages.Haskell,
        html: Languages.HTML,
        htm: Languages.HTML,
        java: Languages.Java,
        js: Languages.JavaScript,
        jsx: Languages.JavaScript,
        json: Languages.JSON,
        ml: Languages.OCaml,
        mli: Languages.OCaml,
        odin: Languages.Odin,
        txt: Languages.Plaintext,
        md: Languages.Plaintext,
        php: Languages.PHP,
        py: Languages.Python,
        pyc: Languages.Python,
        pyd: Languages.Python,
        pyo: Languages.Python,
        pyw: Languages.Python,
        re: Languages.Regex,
        rb: Languages.Ruby,
        rs: Languages.Rust,
        scss: Languages.SCSS,
        ts: Languages.TypeScript,
        tsx: Languages.TypeScriptTSX
    };
    const handleLanguageSet = (language)=>{
        setSelectedLanguage(languageMap[language] || Languages.Plaintext);
    };
    const handleGlobalKeyDown = (e)=>{
        if (e.ctrlKey && e.key === "p" && !e.altKey) {
            e.preventDefault();
            setInitWithPrefix(false);
            setContentToDefaultCommands();
            setIsOpen(true);
        } else if (e.ctrlKey && e.shiftKey && e.key === "P" || e.ctrlKey && e.altKey && e.key === "p") {
            e.preventDefault();
            setInitWithPrefix(true);
            setContentToDefaultCommands();
            setIsOpen(true);
        } else if (e.ctrlKey && e.key === "s") {
            e.preventDefault();
            saveCurrentFile();
        } else if (e.ctrlKey && e.shiftKey && e.key === "S") {
            e.preventDefault();
            saveFileAs(TabStore.activeTab?.id, EditorStore.getActiveEditor()?.getText());
        }
    };
    const handleOpenView = (event)=>{
        switch(event.detail){
            case "files":
                return togglePane(filePane);
            case "search":
                return togglePane(searchPane);
            case "source-control":
                return togglePane(sourceControlPane);
            case "run-and-debug":
                return togglePane(runAndDebugPane);
            case "extensions":
                return togglePane(extensionsPane);
        }
    };
    const handleSaveFileAsRequest = ()=>{
        const filepath = TabStore.activeTab?.id;
        const fileData = EditorStore.getActiveEditor()?.getText();
        if (filepath && fileData) {
            saveFileAs(filepath, fileData);
        }
    };
    const App = ()=>{
        const handleRequestAction = (event)=>{
            const { action } = event.detail;
            const editor = EditorStore.getActiveEditor();
            switch(action){
                case "cut":
                    setFakeClipboard(editor.cut());
                    break;
                case "copy":
                    setFakeClipboard(editor.copy());
                    break;
                case "paste":
                    return editor?.paste(fakeClipboard());
                case "select-all":
                    return editor?.selectAll();
            }
        };
        const [scrollSignal, setScrollSignal] = createSignal(false);
        const [fakeClipboard, setFakeClipboard] = createSignal("");
        let textAreaRef;
        onMount(()=>{
            document.addEventListener("keydown", handleGlobalKeyDown);
            window.addEventListener("tabOpened", (event)=>{
                const newTabId = event.detail.tabId;
                if (newTabId) {
                    textAreaRef.focus();
                }
            });
            window.addEventListener("open-view", handleOpenView);
            window.addEventListener("request-action", handleRequestAction);
            window.addEventListener("open-command-palette", ()=>{
                setInitWithPrefix(false);
                setIsOpen(true);
            });
            window.addEventListener("reset-editor-layout", ()=>{
                setPanes([
                    filePane,
                    searchPane
                ]);
            });
            window.addEventListener("save-file-request", saveCurrentFile);
            window.addEventListener("new-file-request", newFile);
            window.addEventListener("save-file-as-request", handleSaveFileAsRequest);
            window.api.onLanguageSet((_, language)=>handleLanguageSet(language));
        });
        onCleanup(()=>{
            document.removeEventListener("keydown", handleGlobalKeyDown);
            window.removeEventListener("open-view", handleOpenView);
            window.removeEventListener("request-action", handleRequestAction);
            window.removeEventListener("save-file-as-request", handleSaveFileAsRequest);
        });
        createEffect(()=>{
            if (textAreaRef && !isOpen()) {
                textAreaRef.focus();
            }
        });
        const handleClick = ()=>{
            if (textAreaRef) {
                textAreaRef.focus();
            }
        };
        const handleEnter = ()=>{
            setScrollSignal(true);
            setTimeout(()=>{
                setScrollSignal(false);
            }, 0);
        };
        return (()=>{
            var _el$ = _tmpl$();
            insert(_el$, createComponent(CommandPalette, {
                commands,
                get isOpen () {
                    return isOpen();
                },
                onClose: ()=>setIsOpen(false)
            }), null);
            insert(_el$, createComponent(LeftSidebar, {
                removePane,
                addPane
            }), null);
            insert(_el$, (()=>{
                var _c$ = createMemo(()=>TabStore.tabs.length > 0);
                return ()=>_c$() && createComponent(EditorView, {
                        scrollSignal,
                        click: handleClick,
                        editor: ()=>EditorStore.getEditor("editor1")
                    });
            })(), null);
            insert(_el$, createComponent(EditorCore, {
                ensureCursorVisible: handleEnter,
                ref (r$) {
                    var _ref$ = textAreaRef;
                    typeof _ref$ === "function" ? _ref$(r$) : textAreaRef = r$;
                },
                editor: ()=>EditorStore.getEditor("editor1"),
                language: "javascript"
            }), null);
            insert(_el$, createComponent(StatusPane, {
                editor: ()=>EditorStore.getEditor("editor1")
            }), null);
            return _el$;
        })();
    };
    render(()=>createComponent(App, {}), document.getElementById("root"));
})();
