export function isConstructor(f) {
    try {
        new f();
    } catch (err: any) {
        if (err.message.indexOf('is not a constructor') >= 0) {
            return false;
        }
    }
    return true;
}

export function isFunction(f) {
    return Object.prototype.toString.call(f) === "[object Function]";
}