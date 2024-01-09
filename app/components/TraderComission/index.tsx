const TraderCMS = [
    'F1 - 0.8%',
    'F2 - 0.5%',
    'F3 - 0.2%',
    'F4 - 0.1%',
    'F5 - 0.075%',
    'F6 - 0.06%',
    'F7 - 0.04%',
    'F8 - 0.03%',
    'F9, F10 - 0.01%'
]

const TraderComission = () =>{
    return(
        <div>
            <div className="mx-auto max-w-7xl mt-16 px-6 mb-20 relative">
                <h2 className="diff-title">
                    HOA HỒNG GIAO DỊCH TỪ CÁC TRADER
                </h2>
                <div className="grid grid-cols-6 gap-8">
                    {
                        TraderCMS.map((t, i) => (
                            <div className="px-4" key={i}>
                                <p className="text-white cms-trader-title">{t}</p>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default TraderComission