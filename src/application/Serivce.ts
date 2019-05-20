export default abstract class Service {

    protected static ins: Service | null = null;

    static getInstance: () => Service; // 需要子类实现

}
