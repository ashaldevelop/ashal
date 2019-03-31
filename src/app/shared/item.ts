import { Category } from './category';
export interface Item{
    // Item_id: number;
    Itm_No: string;
    ItmCat: Category;
    Arb_Des: string;
    Eng_Des: string;
    OpenQty: number;
    DefultVendor: number;
    StartCost: number;
    LastCost: number;
    // Shipping_Cost: number; 
    QtyMax: number;
    ItmTyp: number; 

    // *****  Start Fathi_17/03/2019   *****
    Price1: number;
    Price2: number;
    Price3: number;
    Price4: number;
    Price5: number;
    Price6: number;

    BarCod1: string;
    BarCod2: string;
    BarCod3: string;
    BarCod4: string; 
    BarCod5: string; 

    AvrageCost: number;
    QtyLvl: number;
    ItmLoc:string;
    Group_Code:string;
    Shipping_Cost:number;
    SeaCost:number;
    Note:string;
    ItmNature:number;
    Tax:number;
    ItmPOS:number;


    // *******  End Fathi_17/03/2019   ******

    // Unit2: number;
    // UntPri2: number;
    // Pack2: number;
    // Unit3: number;
    // UntPri3: number;
    // Pack3: number;
    // Unit4: number;
    // UntPri4: number;
    // Pack4: number;
    // Unit5: number;
    // UntPri5: number;
    // Pack5: number;
    // DefultUnit: number;
    // QtyLvl: number;
    // ItmLoc: s-tring;
    // Lot: number;
    // LrnExp: number;
    // DMY: number; 
    // DefPack: number;
    // ItmImg: number;
    // Group_Code: string;
    // Item_No_Only: string; 
    // Sn: string;
    // SeaCost: number;
    // Note: string;
    // St: number; 
    // ItmNature: number; 
    // Tax: number;
    // ItmPOS: number;






    // unit 1
    Unit1: number;
    Pack1: number;  
    UntPri1: number;

    // unit 2
    Unit2: number;
    Pack2: number;  
    UntPri2: number;

    // unit 3
    Unit3: number;
    Pack3: number;  
    UntPri3: number;

    // unit 4
    Unit4: number;
    Pack4: number;  
    UntPri4: number;

    // unit 5
    Unit5: number;
    Pack5: number;  
    UntPri5: number;

}