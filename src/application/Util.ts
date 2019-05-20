export default abstract class Util {

    protected static ins: Util | null = null;

    static getInstance: () => Util; // 需要子类实现

}
