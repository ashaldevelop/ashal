export interface Invoice{
    InvNo?: string; // رقم الفاتورة
    HDat?: string; // التاريخ الهجري
    GDat?: string; // التاريخ الميلاد
    LTim?: string; // الوقت
    InvCashPay?: number; // طريقة الدفع
    CusVenNo?: string; // رقم العميل أو المورد
    CusVenNm?: string; // اسم العميل أو المورد
    CashAcc?: string; // رقم الحساب النقدي
    CusVenTel?: string; // رقم العميل أو المورد
    CusVenAdd?: string; // عنوان العميل أو المورد
    CurTyp?: string; // نوع العملة
    RefNo?: string; // رقم المرجع
    ClcQnt?: string; // تم استلام البضاعة
    MndNo?: string; // رقم المندوب
    Remark?: string; // ملاحظات
    Vat_No?: string; // الرقم الضريبي
    InvCash?: string; // سعر الاصناف?: عميل - مندوب - جملة - موزعين
    InvCstNo?: string; // مركز تكلفة دائن
    InvCstNo1?: string; // مركز تكلفة مدين
    CashPay?: number; // مدفوع
    // CashPayLocCur?: number; // المدفوع بالعملة المحلية - مخفي
    InvTot?: number; // إجمالي الفاتورة
    InvTotLocCur?: number; // إجمالي الفاتورة
    InvQty?: number; // إجمالي الكمية
    InvDisVal?: number; // قيمة الخصم
    InvDisValLoc?: number; // قيمة الخصم بالعملة المحلية
    Commission?: number; // العمولة
    InvDisPrs?: number; // نسبة الخصم
    ShippingRates?: number; // أجور الشحن
    ShipExpens?: number; // مصاريف أخرى
    InvNet?: number; // صافي الفاتورة
    InvNetLocCur?: number; // صافي الفاتورة بالعملة المحلية
    SHR_AccNo?: string; // رقم حساب أجور الشحن
    SHR_AccName?: string; // اسم حساب أجور الشحن
    OE_AccNo?: string; // رقم حساب المصاريف الأخرى
    OE_AccName?: string; // اسم حساب المصاريف الأخرى
    InvWight_T?: number; // إجمالي الحجم
    TaxTot?: number; // إجمالي الضريبة
    IfDel?: number; // 1 حالة الحذف

    //hidden fields
    InvCost?: number; //  إجمالي تكلفة الفاتورة
    ArbTaf?: string; //  التفقيط العربي
    EngTaf?: string; //  التفقيط الانجليزي
    St?: number; //  في حالة التحديث او الحذف يصبح 0

    details?: InvDet[];
}

export interface InvDet{
    InvNo?: string; // رقم الفاتورة نفس InvNo بالهيدر
    InvId?: number; // FK of invoice
    InvSer?: number; // ترتيب الصفوف
    ItmNo?: string; // رقم الصنف
    Cost?: number; // تكلفة الصنف
    Qty?: number; // الكمية
    ItmDes?: string; // اسم الصنف بالعربي
    ItmDesE?: string; // اسم الصنف بالانجليزي
    ItmUnt?: string; // رقم الوحدة
    ItmUntPak?: number; // تعبئة الوحدة
    StoreNo?: string; // رقم المستودع
    Price?: number; // سعر الصنف
    Amount?: number; // إجمالي الصنف
    DatExper?: string; // تاريخ الصلاحية
    ItmDis?: number; // خصم الصنف
    ItmTyp?: number; // نوع الصنف
    ItmIndex?: number; // قيمته دائما صفر
    ItmWight?: number; // حجم الصنف
    ItmWight_T?: number; // إجمالي حجم الصنف
    Sn?: string; // الرقم التسلسللي للصنف
    ItmNature?: number; // طبيعة الصنف
    Tax?: number; // الضريبة
    TaxAm?: number; // إجمالي ضريبة الصنف

    // hidden
    RealQty?: number; // الكمية الحقيقية
}
