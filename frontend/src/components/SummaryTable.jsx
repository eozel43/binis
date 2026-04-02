
import React from 'react';

export function SummaryTable({ data }) {
    if (!data || Object.keys(data).length === 0) return null;

    const years = Object.keys(data).sort();
    
    const categories = [
        { key: 'tam', label: 'TAM BİNİŞLER' },
        { key: 'basin', label: 'BASIN KARTLI BİNİŞLER' },
        { key: 'lise', label: 'İLKOKUL-LİSE BİNİŞLER' },
        { key: 'kredi', label: 'KREDİ KARTI BİNİŞLER' },
        { key: 'nfc', label: 'NFC-QR BİNİŞLER' },
        { key: 'uni_ogrenci', label: 'ÜNİVERSİTE ÖĞRENCİ KARTI BİNİŞ' },
        { key: 'uni_ikamet', label: 'ÜNİVERSİTE ÖĞR. İKAMET KART BİNİŞ' },
        { key: 'uni_16no_all', label: '16NUMARA OGRENCİ' },
        { key: 'aktarma', label: 'AKTARMA BİNİŞ' },
        { key: 'abonman', label: 'ABONMAN BİNİŞ' },
        { key: 'iade', label: 'İADE BİNİŞ' }
    ];

    return (
        <div className="rounded-xl border bg-card text-card-foreground shadow col-span-4 flex flex-col overflow-hidden">
            <div className="p-6 pb-4 flex flex-col space-y-1.5 shrink-0">
                <h3 className="font-semibold leading-none tracking-tight font-lexend">BİNİŞ ÖZETİ (ÖDEME TÜRÜ)</h3>
                <p className="text-sm text-muted-foreground">Yıllara göre ödeme türü bazında biniş sayıları</p>
            </div>
            <div className="p-0 flex-1 overflow-hidden">
                <div className="overflow-x-auto w-full">
                    <table className="w-full caption-bottom text-sm text-left">
                        <thead className="[&_tr]:border-b bg-muted/50">
                            <tr className="border-b border-border transition-colors">
                                <th className="h-10 px-6 align-middle font-bold text-foreground text-xs uppercase tracking-wider">Biniş Türleri</th>
                                {years.map(year => (
                                    <th key={year} className="h-10 px-6 align-middle font-bold text-foreground text-right text-xs uppercase tracking-wider">
                                        {year}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="[&_tr:last-child]:border-0 font-mono">
                            {categories.map((cat, idx) => (
                                <tr key={cat.key} className="border-b border-border transition-colors hover:bg-muted/30">
                                    <td className="p-4 px-6 align-middle font-medium text-foreground whitespace-nowrap">
                                        {cat.label}
                                    </td>
                                    {years.map(year => (
                                        <td key={`${cat.key}-${year}`} className="p-4 px-6 align-middle text-right text-foreground/80 whitespace-nowrap">
                                            {new Intl.NumberFormat('tr-TR').format(data[year][cat.key] || 0)}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
