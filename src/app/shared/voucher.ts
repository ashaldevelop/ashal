export interface Voucher{
    gdhead_ID?: number;
    gdTyp?: number;
    gdNo?: string;
    gdMem?: string;
    gdTot?: number;
    gdTgdLok?: number;
    gdHDate?: string;
    gdGDate?: string;
    gdMnd?: string;
    CurTyp?: number;
    RefNo?: number;
    details?: GdDetails[];
};

export interface GdDetails{
    AccNo: string;
    gdCstNo: string;
    InvNo: string;
    gdDes: string;
    madeen: number;
    daen: number;
    gdValue: number;
}