import Image from "next/image"

const WCS = [
    {
        imgUrl: '/images/WhyChooseUs/wcs-1.png',
        text: 'Giao dịch đơn giản và nhanh chóng  hơn so với sàn giao dịch truyền thống',
        textColor: 'text-[#a98fff]'
    },
    {
        imgUrl: '/images/WhyChooseUs/wcs-2.png',
        text: 'Dễ dàng cho  mọi giao dịch',
        textColor: 'text-[#72bdff]'
    },
    {
        imgUrl: '/images/WhyChooseUs/wcs-3.png',
        text: 'Liên tục tăng  trưởng theo thị  trường',
        textColor: 'text-[#c5ff9a]'
    },
    {
        imgUrl: '/images/WhyChooseUs/wcs-4.png',
        text: 'Không cần phân tích chuyên sâu vào thị trường tài chính',
        textColor: 'text-[#ff9f9f]'
    },
    {
        imgUrl: '/images/WhyChooseUs/wcs-5.png',
        text: 'Khi dự đoán chính xác,  nhà giao dịch sẽ nhận được lợi  nhuận lên đến  95% trên số tiền giao dịch.',
        textColor: 'text-[#ffab80]'
    },
    // {
    //     imgUrl: '/images/WhyChooseUs/wcs-6.png',
    //     text: 'Giao dịch đơn giản và nhanh chóng  hơn so với sàn giao dịch truyền thống',
    //     textColor: 'text-[#ff6bd8]'
    // }
]
const WCSDesc = [
    '✓ Giao diện thân thiện',
    '✓ Dễ sử dụng, thao tác',
    '✓ Đăng ký tài khoản đơn giản, dễ dàng giao dịch',
    '✓ Thích hợp cho từng loại Smartphone',
    '✓ Thu lợi nhuận không ngờ',
]

const WhyChooseUs = () =>{
    return(
        <div>
            <div className="mx-auto max-w-7xl mt-16 px-6 mb-20 relative">
                <h2 className="diff-title">
                    TẠI SAO LẠI CHỌN <span className="text-deepskyblue">GLADAIBOT</span> 
                </h2>
                <p className="text-offwhite text-sm mt-4">
                    <span className="text-deepskyblue">GLADAIBOT</span> ra mắt với sứ mệnh cung cấp cho các nhà giao dịch và nhà đầu tư những trải nghiệm mới trong thị trường Games Ưu tiên của chúng tôi là cung cấp các dịch vụ  và hỗ trợ chất lượng cao nhất, bao gồm hoa  hồng hấp dẫn nhất từ Chương trình giới thiệu <span className="text-deepskyblue">GLADAIBOT</span>, các dịch vụ phân tích và hỗ trợ  khách hàng.
                </p>
                <div className="grid grid-cols-3 gap-8 mt-8">
                    {
                        WCS.map((w, i) => (
                            <div className="flex items-center gap-4 min-h-[72px]" key={i}>
                                <Image src={w.imgUrl} alt="/" width={60} height={60} />
                                <p className={w.textColor}>{w.text}</p>
                            </div>
                        ))
                    }
                </div>
                <div className="flex flex-wrap justify-center gap-4 mt-8">
                    {
                        WCSDesc.map((d, i) => (
                            <p className="text-[#e68aff]" key={i}>{d}</p>
                        ))
                    }
                </div>
            </div> 
        </div>
    )
}

export default WhyChooseUs