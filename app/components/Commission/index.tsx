import Image from "next/image"
import React from "react"

const CMS = [
    {
        imgUrl: '/images/Commission/cms-1.png',
        text: 'Thưởng 8% trực tiếp'
    },
    {
        imgUrl: '/images/Commission/cms-2.png',
        text: '30% F1|20% F2|15% F3|10% F4|6% F5-F7|3% F8-F12'
    },
    {
        imgUrl: '/images/Commission/cms-3.png',
        text: 'Thưởng 5% F2'
    },
    {
        imgUrl: '/images/Commission/cms-4.png',
        text: 'Max - 300%'
    }
]

const Commission = () =>{
    return(
        <div>
            <div className="mx-auto max-w-7xl mt-16 px-6 mb-20 relative">
                <h2 className="diff-title">
                    Thưởng hoa hồng khi tham gia cùng Bot
                </h2>
                <div className="grid grid-cols-2 gap-8">
                    {
                        CMS.map((c, i) => (
                            <div className="flex gap-4" key={i}>
                                <h1 className="text-8xl text-white italic cms-title-sd">{i + 1}</h1>
                                {/* <Image src={c.imgUrl} alt="/" width={120} height={150} /> */}
                                <p className="text-white pt-4 text-2xl">
                                    {
                                        c.text.split('|').map((t, j) => (
                                            <React.Fragment key={j}>
                                                {t}
                                                {
                                                    j !== c.text.split('|').length ? <br /> : <></>
                                                }
                                            </React.Fragment>
                                        ))
                                    }
                                </p>
                            </div>
                        ))
                    }
                    {/* <div className="flex gap-4">
                        <Image src='/images/Commission/cms-2.png' alt="/" width={120} height={150} />
                        <p className="text-white pt-4 text-2xl">
                        30%F1 <br />
                        20%F2 <br />
                        15% F3 <br />
                        10% F4 <br />
                        6% F5-F7 <br />
                        3% F8-F12
                        </p>
                    </div> */}
                </div>
            </div>
        </div>
    )
}

export default Commission