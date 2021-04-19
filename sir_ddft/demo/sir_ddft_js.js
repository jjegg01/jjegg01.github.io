let wasm_bindgen;
(function() {
    const __exports = {};
    let wasm;

    const heap = new Array(32).fill(undefined);

    heap.push(undefined, null, true, false);

function getObject(idx) { return heap[idx]; }

let heap_next = heap.length;

function dropObject(idx) {
    if (idx < 36) return;
    heap[idx] = heap_next;
    heap_next = idx;
}

function takeObject(idx) {
    const ret = getObject(idx);
    dropObject(idx);
    return ret;
}

let cachedTextDecoder = new TextDecoder('utf-8', { ignoreBOM: true, fatal: true });

cachedTextDecoder.decode();

let cachegetUint8Memory0 = null;
function getUint8Memory0() {
    if (cachegetUint8Memory0 === null || cachegetUint8Memory0.buffer !== wasm.memory.buffer) {
        cachegetUint8Memory0 = new Uint8Array(wasm.memory.buffer);
    }
    return cachegetUint8Memory0;
}

function getStringFromWasm0(ptr, len) {
    return cachedTextDecoder.decode(getUint8Memory0().subarray(ptr, ptr + len));
}

function addHeapObject(obj) {
    if (heap_next === heap.length) heap.push(heap.length + 1);
    const idx = heap_next;
    heap_next = heap[idx];

    heap[idx] = obj;
    return idx;
}

function isLikeNone(x) {
    return x === undefined || x === null;
}

let cachegetFloat64Memory0 = null;
function getFloat64Memory0() {
    if (cachegetFloat64Memory0 === null || cachegetFloat64Memory0.buffer !== wasm.memory.buffer) {
        cachegetFloat64Memory0 = new Float64Array(wasm.memory.buffer);
    }
    return cachegetFloat64Memory0;
}

let cachegetInt32Memory0 = null;
function getInt32Memory0() {
    if (cachegetInt32Memory0 === null || cachegetInt32Memory0.buffer !== wasm.memory.buffer) {
        cachegetInt32Memory0 = new Int32Array(wasm.memory.buffer);
    }
    return cachegetInt32Memory0;
}

function debugString(val) {
    // primitive types
    const type = typeof val;
    if (type == 'number' || type == 'boolean' || val == null) {
        return  `${val}`;
    }
    if (type == 'string') {
        return `"${val}"`;
    }
    if (type == 'symbol') {
        const description = val.description;
        if (description == null) {
            return 'Symbol';
        } else {
            return `Symbol(${description})`;
        }
    }
    if (type == 'function') {
        const name = val.name;
        if (typeof name == 'string' && name.length > 0) {
            return `Function(${name})`;
        } else {
            return 'Function';
        }
    }
    // objects
    if (Array.isArray(val)) {
        const length = val.length;
        let debug = '[';
        if (length > 0) {
            debug += debugString(val[0]);
        }
        for(let i = 1; i < length; i++) {
            debug += ', ' + debugString(val[i]);
        }
        debug += ']';
        return debug;
    }
    // Test for built-in
    const builtInMatches = /\[object ([^\]]+)\]/.exec(toString.call(val));
    let className;
    if (builtInMatches.length > 1) {
        className = builtInMatches[1];
    } else {
        // Failed to match the standard '[object ClassName]'
        return toString.call(val);
    }
    if (className == 'Object') {
        // we're a user defined class or Object
        // JSON.stringify avoids problems with cycles, and is generally much
        // easier than looping through ownProperties of `val`.
        try {
            return 'Object(' + JSON.stringify(val) + ')';
        } catch (_) {
            return 'Object';
        }
    }
    // errors
    if (val instanceof Error) {
        return `${val.name}: ${val.message}\n${val.stack}`;
    }
    // TODO we could test for more things here, like `Set`s and `Map`s.
    return className;
}

let WASM_VECTOR_LEN = 0;

let cachedTextEncoder = new TextEncoder('utf-8');

const encodeString = (typeof cachedTextEncoder.encodeInto === 'function'
    ? function (arg, view) {
    return cachedTextEncoder.encodeInto(arg, view);
}
    : function (arg, view) {
    const buf = cachedTextEncoder.encode(arg);
    view.set(buf);
    return {
        read: arg.length,
        written: buf.length
    };
});

function passStringToWasm0(arg, malloc, realloc) {

    if (realloc === undefined) {
        const buf = cachedTextEncoder.encode(arg);
        const ptr = malloc(buf.length);
        getUint8Memory0().subarray(ptr, ptr + buf.length).set(buf);
        WASM_VECTOR_LEN = buf.length;
        return ptr;
    }

    let len = arg.length;
    let ptr = malloc(len);

    const mem = getUint8Memory0();

    let offset = 0;

    for (; offset < len; offset++) {
        const code = arg.charCodeAt(offset);
        if (code > 0x7F) break;
        mem[ptr + offset] = code;
    }

    if (offset !== len) {
        if (offset !== 0) {
            arg = arg.slice(offset);
        }
        ptr = realloc(ptr, len, len = offset + arg.length * 3);
        const view = getUint8Memory0().subarray(ptr + offset, ptr + len);
        const ret = encodeString(arg, view);

        offset += ret.written;
    }

    WASM_VECTOR_LEN = offset;
    return ptr;
}

function _assertClass(instance, klass) {
    if (!(instance instanceof klass)) {
        throw new Error(`expected instance of ${klass.name}`);
    }
    return instance.ptr;
}

let stack_pointer = 32;

function addBorrowedObject(obj) {
    if (stack_pointer == 1) throw new Error('out of js stack');
    heap[--stack_pointer] = obj;
    return stack_pointer;
}

function handleError(f) {
    return function () {
        try {
            return f.apply(this, arguments);

        } catch (e) {
            wasm.__wbindgen_exn_store(addHeapObject(e));
        }
    };
}
/**
*/
class Grid1D {

    static __wrap(ptr) {
        const obj = Object.create(Grid1D.prototype);
        obj.ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.ptr;
        this.ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_grid1d_free(ptr);
    }
    /**
    * @param {number} xlo
    * @param {number} xhi
    * @param {number} n
    * @returns {Grid1D}
    */
    static new_equidistant(xlo, xhi, n) {
        var ret = wasm.grid1d_new_equidistant(xlo, xhi, n);
        return Grid1D.__wrap(ret);
    }
}
__exports.Grid1D = Grid1D;
/**
*/
class Grid2D {

    static __wrap(ptr) {
        const obj = Object.create(Grid2D.prototype);
        obj.ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.ptr;
        this.ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_grid2d_free(ptr);
    }
    /**
    * @param {number} xlo
    * @param {number} xhi
    * @param {number} ylo
    * @param {number} yhi
    * @param {number} nx
    * @param {number} ny
    * @returns {Grid2D}
    */
    static new_equidistant(xlo, xhi, ylo, yhi, nx, ny) {
        var ret = wasm.grid2d_new_equidistant(xlo, xhi, ylo, yhi, nx, ny);
        return Grid2D.__wrap(ret);
    }
}
__exports.Grid2D = Grid2D;
/**
*/
class SIRDDFT1DSolver {

    static __wrap(ptr) {
        const obj = Object.create(SIRDDFT1DSolver.prototype);
        obj.ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.ptr;
        this.ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_sirddft1dsolver_free(ptr);
    }
    /**
    * @param {SIRParameters} params
    * @param {SIRDiffusionParameters} diff_params
    * @param {SIRDDFTParameters} ddft_params
    * @param {SIRStateSpatial1D} state
    */
    constructor(params, diff_params, ddft_params, state) {
        _assertClass(params, SIRParameters);
        var ptr0 = params.ptr;
        params.ptr = 0;
        _assertClass(diff_params, SIRDiffusionParameters);
        var ptr1 = diff_params.ptr;
        diff_params.ptr = 0;
        _assertClass(ddft_params, SIRDDFTParameters);
        var ptr2 = ddft_params.ptr;
        ddft_params.ptr = 0;
        _assertClass(state, SIRStateSpatial1D);
        var ptr3 = state.ptr;
        state.ptr = 0;
        var ret = wasm.sirddft1dsolver_new(ptr0, ptr1, ptr2, ptr3);
        return SIRDDFT1DSolver.__wrap(ret);
    }
    /**
    * @param {number} time
    */
    add_time(time) {
        wasm.sirddft1dsolver_add_time(this.ptr, time);
    }
    /**
    */
    integrate() {
        wasm.sirddft1dsolver_integrate(this.ptr);
    }
    /**
    * @returns {any}
    */
    get_result() {
        var ret = wasm.sirddft1dsolver_get_result(this.ptr);
        return takeObject(ret);
    }
}
__exports.SIRDDFT1DSolver = SIRDDFT1DSolver;
/**
*/
class SIRDDFT2DSolver {

    static __wrap(ptr) {
        const obj = Object.create(SIRDDFT2DSolver.prototype);
        obj.ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.ptr;
        this.ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_sirddft2dsolver_free(ptr);
    }
    /**
    * @param {SIRParameters} params
    * @param {SIRDiffusionParameters} diff_params
    * @param {SIRDDFTParameters} ddft_params
    * @param {SIRStateSpatial2D} state
    */
    constructor(params, diff_params, ddft_params, state) {
        _assertClass(params, SIRParameters);
        var ptr0 = params.ptr;
        params.ptr = 0;
        _assertClass(diff_params, SIRDiffusionParameters);
        var ptr1 = diff_params.ptr;
        diff_params.ptr = 0;
        _assertClass(ddft_params, SIRDDFTParameters);
        var ptr2 = ddft_params.ptr;
        ddft_params.ptr = 0;
        _assertClass(state, SIRStateSpatial2D);
        var ptr3 = state.ptr;
        state.ptr = 0;
        var ret = wasm.sirddft2dsolver_new(ptr0, ptr1, ptr2, ptr3);
        return SIRDDFT2DSolver.__wrap(ret);
    }
    /**
    * @param {number} time
    */
    add_time(time) {
        wasm.sirddft2dsolver_add_time(this.ptr, time);
    }
    /**
    */
    integrate() {
        wasm.sirddft2dsolver_integrate(this.ptr);
    }
    /**
    * @returns {any}
    */
    get_result() {
        var ret = wasm.sirddft2dsolver_get_result(this.ptr);
        return takeObject(ret);
    }
}
__exports.SIRDDFT2DSolver = SIRDDFT2DSolver;
/**
*/
class SIRDDFTParameters {

    static __wrap(ptr) {
        const obj = Object.create(SIRDDFTParameters.prototype);
        obj.ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.ptr;
        this.ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_sirddftparameters_free(ptr);
    }
    /**
    * @param {number} mobility_S
    * @param {number} mobility_I
    * @param {number} mobility_R
    * @param {number} social_distancing_amplitude
    * @param {number} social_distancing_range
    * @param {number} self_isolation_amplitude
    * @param {number} self_isolation_range
    */
    constructor(mobility_S, mobility_I, mobility_R, social_distancing_amplitude, social_distancing_range, self_isolation_amplitude, self_isolation_range) {
        var ret = wasm.sirddftparameters_new(mobility_S, mobility_I, mobility_R, social_distancing_amplitude, social_distancing_range, self_isolation_amplitude, self_isolation_range);
        return SIRDDFTParameters.__wrap(ret);
    }
}
__exports.SIRDDFTParameters = SIRDDFTParameters;
/**
*/
class SIRDiffusion1DSolver {

    static __wrap(ptr) {
        const obj = Object.create(SIRDiffusion1DSolver.prototype);
        obj.ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.ptr;
        this.ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_sirdiffusion1dsolver_free(ptr);
    }
    /**
    * @param {SIRParameters} params
    * @param {SIRDiffusionParameters} diff_params
    * @param {SIRStateSpatial1D} state
    */
    constructor(params, diff_params, state) {
        _assertClass(params, SIRParameters);
        var ptr0 = params.ptr;
        params.ptr = 0;
        _assertClass(diff_params, SIRDiffusionParameters);
        var ptr1 = diff_params.ptr;
        diff_params.ptr = 0;
        _assertClass(state, SIRStateSpatial1D);
        var ptr2 = state.ptr;
        state.ptr = 0;
        var ret = wasm.sirdiffusion1dsolver_new(ptr0, ptr1, ptr2);
        return SIRDiffusion1DSolver.__wrap(ret);
    }
    /**
    * @param {number} time
    */
    add_time(time) {
        wasm.sirdiffusion1dsolver_add_time(this.ptr, time);
    }
    /**
    */
    integrate() {
        wasm.sirdiffusion1dsolver_integrate(this.ptr);
    }
    /**
    * @returns {any}
    */
    get_result() {
        var ret = wasm.sirdiffusion1dsolver_get_result(this.ptr);
        return takeObject(ret);
    }
}
__exports.SIRDiffusion1DSolver = SIRDiffusion1DSolver;
/**
*/
class SIRDiffusion2DSolver {

    static __wrap(ptr) {
        const obj = Object.create(SIRDiffusion2DSolver.prototype);
        obj.ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.ptr;
        this.ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_sirdiffusion2dsolver_free(ptr);
    }
    /**
    * @param {SIRParameters} params
    * @param {SIRDiffusionParameters} diff_params
    * @param {SIRStateSpatial2D} state
    */
    constructor(params, diff_params, state) {
        _assertClass(params, SIRParameters);
        var ptr0 = params.ptr;
        params.ptr = 0;
        _assertClass(diff_params, SIRDiffusionParameters);
        var ptr1 = diff_params.ptr;
        diff_params.ptr = 0;
        _assertClass(state, SIRStateSpatial2D);
        var ptr2 = state.ptr;
        state.ptr = 0;
        var ret = wasm.sirdiffusion2dsolver_new(ptr0, ptr1, ptr2);
        return SIRDiffusion2DSolver.__wrap(ret);
    }
    /**
    * @param {number} time
    */
    add_time(time) {
        wasm.sirdiffusion2dsolver_add_time(this.ptr, time);
    }
    /**
    */
    integrate() {
        wasm.sirdiffusion2dsolver_integrate(this.ptr);
    }
    /**
    * @returns {any}
    */
    get_result() {
        var ret = wasm.sirdiffusion2dsolver_get_result(this.ptr);
        return takeObject(ret);
    }
}
__exports.SIRDiffusion2DSolver = SIRDiffusion2DSolver;
/**
*/
class SIRDiffusionParameters {

    static __wrap(ptr) {
        const obj = Object.create(SIRDiffusionParameters.prototype);
        obj.ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.ptr;
        this.ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_sirdiffusionparameters_free(ptr);
    }
    /**
    * @param {number} diffusivity_S
    * @param {number} diffusivity_I
    * @param {number} diffusivity_R
    */
    constructor(diffusivity_S, diffusivity_I, diffusivity_R) {
        var ret = wasm.sirdiffusionparameters_new(diffusivity_S, diffusivity_I, diffusivity_R);
        return SIRDiffusionParameters.__wrap(ret);
    }
}
__exports.SIRDiffusionParameters = SIRDiffusionParameters;
/**
*/
class SIRParameters {

    static __wrap(ptr) {
        const obj = Object.create(SIRParameters.prototype);
        obj.ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.ptr;
        this.ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_sirparameters_free(ptr);
    }
    /**
    * @param {number} infection_parameter
    * @param {number} recovery_rate
    */
    constructor(infection_parameter, recovery_rate) {
        var ret = wasm.sirparameters_new(infection_parameter, recovery_rate);
        return SIRParameters.__wrap(ret);
    }
}
__exports.SIRParameters = SIRParameters;
/**
*/
class SIRSolver {

    static __wrap(ptr) {
        const obj = Object.create(SIRSolver.prototype);
        obj.ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.ptr;
        this.ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_sirsolver_free(ptr);
    }
    /**
    * @param {SIRParameters} params
    * @param {SIRState} state
    */
    constructor(params, state) {
        _assertClass(params, SIRParameters);
        var ptr0 = params.ptr;
        params.ptr = 0;
        _assertClass(state, SIRState);
        var ptr1 = state.ptr;
        state.ptr = 0;
        var ret = wasm.sirsolver_new(ptr0, ptr1);
        return SIRSolver.__wrap(ret);
    }
    /**
    * @param {number} time
    */
    add_time(time) {
        wasm.sirsolver_add_time(this.ptr, time);
    }
    /**
    */
    integrate() {
        wasm.sirsolver_integrate(this.ptr);
    }
    /**
    * @returns {any}
    */
    get_result() {
        var ret = wasm.sirsolver_get_result(this.ptr);
        return takeObject(ret);
    }
}
__exports.SIRSolver = SIRSolver;
/**
*/
class SIRState {

    static __wrap(ptr) {
        const obj = Object.create(SIRState.prototype);
        obj.ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.ptr;
        this.ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_sirstate_free(ptr);
    }
    /**
    * @param {number} S
    * @param {number} I
    * @param {number} R
    */
    constructor(S, I, R) {
        var ret = wasm.sirstate_new(S, I, R);
        return SIRState.__wrap(ret);
    }
    /**
    * @returns {number}
    */
    get S() {
        var ret = wasm.sirstate_S(this.ptr);
        return ret;
    }
    /**
    * @returns {number}
    */
    get I() {
        var ret = wasm.sirstate_I(this.ptr);
        return ret;
    }
    /**
    * @returns {number}
    */
    get R() {
        var ret = wasm.sirstate_R(this.ptr);
        return ret;
    }
}
__exports.SIRState = SIRState;
/**
*/
class SIRStateSpatial1D {

    static __wrap(ptr) {
        const obj = Object.create(SIRStateSpatial1D.prototype);
        obj.ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.ptr;
        this.ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_sirstatespatial1d_free(ptr);
    }
    /**
    * @param {Grid1D} grid
    * @param {Function} initfunc
    */
    constructor(grid, initfunc) {
        try {
            _assertClass(grid, Grid1D);
            var ptr0 = grid.ptr;
            grid.ptr = 0;
            var ret = wasm.sirstatespatial1d_new(ptr0, addBorrowedObject(initfunc));
            return SIRStateSpatial1D.__wrap(ret);
        } finally {
            heap[stack_pointer++] = undefined;
        }
    }
    /**
    * @returns {any}
    */
    get S() {
        var ret = wasm.sirstatespatial1d_S(this.ptr);
        return takeObject(ret);
    }
    /**
    * @returns {any}
    */
    get I() {
        var ret = wasm.sirstatespatial1d_I(this.ptr);
        return takeObject(ret);
    }
    /**
    * @returns {any}
    */
    get R() {
        var ret = wasm.sirstatespatial1d_R(this.ptr);
        return takeObject(ret);
    }
}
__exports.SIRStateSpatial1D = SIRStateSpatial1D;
/**
*/
class SIRStateSpatial2D {

    static __wrap(ptr) {
        const obj = Object.create(SIRStateSpatial2D.prototype);
        obj.ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.ptr;
        this.ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_sirstatespatial2d_free(ptr);
    }
    /**
    * @param {Grid2D} grid
    * @param {Function} initfunc
    */
    constructor(grid, initfunc) {
        try {
            _assertClass(grid, Grid2D);
            var ptr0 = grid.ptr;
            grid.ptr = 0;
            var ret = wasm.sirstatespatial2d_new(ptr0, addBorrowedObject(initfunc));
            return SIRStateSpatial2D.__wrap(ret);
        } finally {
            heap[stack_pointer++] = undefined;
        }
    }
    /**
    * @returns {any}
    */
    get S() {
        var ret = wasm.sirstatespatial2d_S(this.ptr);
        return takeObject(ret);
    }
    /**
    * @returns {any}
    */
    get I() {
        var ret = wasm.sirstatespatial2d_I(this.ptr);
        return takeObject(ret);
    }
    /**
    * @returns {any}
    */
    get R() {
        var ret = wasm.sirstatespatial2d_R(this.ptr);
        return takeObject(ret);
    }
}
__exports.SIRStateSpatial2D = SIRStateSpatial2D;

async function load(module, imports) {
    if (typeof Response === 'function' && module instanceof Response) {
        if (typeof WebAssembly.instantiateStreaming === 'function') {
            try {
                return await WebAssembly.instantiateStreaming(module, imports);

            } catch (e) {
                if (module.headers.get('Content-Type') != 'application/wasm') {
                    console.warn("`WebAssembly.instantiateStreaming` failed because your server does not serve wasm with `application/wasm` MIME type. Falling back to `WebAssembly.instantiate` which is slower. Original error:\n", e);

                } else {
                    throw e;
                }
            }
        }

        const bytes = await module.arrayBuffer();
        return await WebAssembly.instantiate(bytes, imports);

    } else {
        const instance = await WebAssembly.instantiate(module, imports);

        if (instance instanceof WebAssembly.Instance) {
            return { instance, module };

        } else {
            return instance;
        }
    }
}

async function init(input) {
    if (typeof input === 'undefined') {
        let src;
        if (typeof document === 'undefined') {
            src = location.href;
        } else {
            src = document.currentScript.src;
        }
        input = src.replace(/\.js$/, '_bg.wasm');
    }
    const imports = {};
    imports.wbg = {};
    imports.wbg.__wbindgen_object_drop_ref = function(arg0) {
        takeObject(arg0);
    };
    imports.wbg.__wbindgen_string_new = function(arg0, arg1) {
        var ret = getStringFromWasm0(arg0, arg1);
        return addHeapObject(ret);
    };
    imports.wbg.__wbindgen_number_new = function(arg0) {
        var ret = arg0;
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_get_f099d98ea7d68360 = function(arg0, arg1) {
        var ret = getObject(arg0)[arg1 >>> 0];
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_new_8528c110a833413f = function() {
        var ret = new Array();
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_set_901937daab6078b9 = function(arg0, arg1, arg2) {
        getObject(arg0)[arg1 >>> 0] = takeObject(arg2);
    };
    imports.wbg.__wbg_from_c9968c40e2da92d7 = function(arg0) {
        var ret = Array.from(getObject(arg0));
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_call_f5e0576f61ee7461 = handleError(function(arg0, arg1, arg2) {
        var ret = getObject(arg0).call(getObject(arg1), getObject(arg2));
        return addHeapObject(ret);
    });
    imports.wbg.__wbg_call_0012cc705284c42b = handleError(function(arg0, arg1, arg2, arg3) {
        var ret = getObject(arg0).call(getObject(arg1), getObject(arg2), getObject(arg3));
        return addHeapObject(ret);
    });
    imports.wbg.__wbg_new_d14bf16e62c6b3d5 = function() {
        var ret = new Object();
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_buffer_ebc6c8e75510eae3 = function(arg0) {
        var ret = getObject(arg0).buffer;
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_newwithbyteoffsetandlength_b28e2e56635db2ed = function(arg0, arg1, arg2) {
        var ret = new Float64Array(getObject(arg0), arg1 >>> 0, arg2 >>> 0);
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_new_26cad0c0a0f2faf1 = function(arg0) {
        var ret = new Float64Array(getObject(arg0));
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_set_61642586f7156f4a = handleError(function(arg0, arg1, arg2) {
        var ret = Reflect.set(getObject(arg0), getObject(arg1), getObject(arg2));
        return ret;
    });
    imports.wbg.__wbindgen_number_get = function(arg0, arg1) {
        const obj = getObject(arg1);
        var ret = typeof(obj) === 'number' ? obj : undefined;
        getFloat64Memory0()[arg0 / 8 + 1] = isLikeNone(ret) ? 0 : ret;
        getInt32Memory0()[arg0 / 4 + 0] = !isLikeNone(ret);
    };
    imports.wbg.__wbindgen_debug_string = function(arg0, arg1) {
        var ret = debugString(getObject(arg1));
        var ptr0 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        getInt32Memory0()[arg0 / 4 + 1] = len0;
        getInt32Memory0()[arg0 / 4 + 0] = ptr0;
    };
    imports.wbg.__wbindgen_throw = function(arg0, arg1) {
        throw new Error(getStringFromWasm0(arg0, arg1));
    };
    imports.wbg.__wbindgen_memory = function() {
        var ret = wasm.memory;
        return addHeapObject(ret);
    };

    if (typeof input === 'string' || (typeof Request === 'function' && input instanceof Request) || (typeof URL === 'function' && input instanceof URL)) {
        input = fetch(input);
    }



    const { instance, module } = await load(await input, imports);

    wasm = instance.exports;
    init.__wbindgen_wasm_module = module;

    return wasm;
}

wasm_bindgen = Object.assign(init, __exports);

})();
