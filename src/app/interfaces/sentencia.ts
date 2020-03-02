export interface Sentencia {
    id: number;
    autor: string;
    extractolatino: string;
    extractoespanol: string;
    extractoingles: string;
    categoria?: string;
    reaccion: string;
    recuentoMeGusta: number;
    recuentoMeEncanta: number;
    recuentoMeDivierte: number;
    recuentoNoMeGusta: number;
}
