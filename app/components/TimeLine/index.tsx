const TimeLines = [
    {
        title: 'BOTAI - 7 ngày',
        borderColor: 'border-aqua',
        min: '$20 - $100',
        profit: '0.3 - 1%/ Ngày'
    },
    {
        title: 'BOTAI - 15 ngày',
        borderColor: 'border-cornflowerblue',
        min: '$101 - $300',
        profit: '0.4 - 1.2%/ Ngày'
    },
    {
        title: 'BOTAI - 30 ngày',
        borderColor: 'border-mediumslateblue',
        min: '$301 - $1.000',
        profit: '0.5 - 1.5%/ Ngày'
    },
    {
        title: 'BOTAI - 45 ngày',
        borderColor: 'border-giant',
        min: '$1.001 - $5000',
        profit: '0.6 - 1.7%/ Ngày'
    },
    {
        title: 'BOTAI - 60 ngày',
        borderColor: 'border-rosequartzpink',
        min: '$5.001 - $10.000',
        profit: '0.8 - 2%/ Ngày'
    },
    {
        title: 'BOTAI - 90 ngày',
        borderColor: 'border-deepskyblue',
        min: '$10.000',
        profit: '1% - 3%/ Ngày'
    }
]

const TimeLine = () =>{
    return(
        <div>
            <div className="mx-auto max-w-7xl mt-16 px-6 mb-20 relative">
                <h2 className="diff-title">
                    KHỞI ĐỘNG CÙNG BOT
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {
                        TimeLines.map((tl, i) => (
                            <div className={`pl-8 border-l-4 border-solid ${tl.borderColor}`} key={i}>
                                <div className="text-white">
                                    <h3 className="text-deepskyblue text-xl">{tl.title}</h3>
                                    <div >
                                        <p>Min: <span className="text-[#69ddcb]">{tl.min}</span></p>
                                        <p>Lợi nhuận: <span className="text-[#fae184]">{tl.profit}</span></p>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default TimeLine