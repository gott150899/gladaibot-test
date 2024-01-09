import Image from "next/image"

const diffs = [
    {
        order: 1,
        text: 'Nền tảng giao dịch minh bạch nhất thế giới',
        orderBgColor: 'bg-[#5f9ea0]',
        textColor: 'text-deepskyblue'
    },
    {
        order: 2,
        text: 'Nền tảng duy nhất trung lập với tin tức thị trường',
        orderBgColor: 'bg-cornflowerblue',
        textColor: 'text-mediumslateblue'
    },
    {
        order: 3,
        text: 'Không có sự can thiệp đến từ con người',
        orderBgColor: 'bg-giant',
        textColor: 'text-rosequartzpink'
    },
    {
        order: 4,
        text: 'Thanh khoản nhanh, bảo mật & đồng bộ mọi thiết bị',
        orderBgColor: 'bg-brilliantazure',
        textColor: 'text-freshair'
    }
]

const ListDiff = () =>{
    return (
        <div>
            <div className="mx-auto max-w-7xl mt-16 px-6 mb-20 relative">
                <div className="flex">
                    <div className="w-2/4 flex flex-col items-center">
                        <h2 className="diff-title">
                            SỰ KHÁC BIỆT ĐẾN TỪ <span className="text-aqua">SỨC MẠNH CỦA BLOCKCHAIN</span>
                        </h2>
                        <p className="text-lightblue2 mt-4">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maiores quod reiciendis labore explicabo, fugiat, modi dolorum sit nam eos magni enim architecto iste, laborum tempora! Deserunt expedita quo quia architecto.</p>
                        <Image src="/images/Banner/pp-1-v2.png" alt="nothing" width={555} height={555} />
                    </div>
                    <div className="w-2/4">
                        <div className="flex flex-wrap">
                            {
                                diffs.map((diff, i) => (
                                    <div className={`w-2/4 p-2 ${i % 2 === 0 ? 'pt-20' : ''}`} key={i}>
                                        <h3 className={`center-items text-white text-3xl m-auto w-[60px] h-[60px] rounded-full ${diff.orderBgColor}`}>
                                            {diff.order}
                                        </h3>
                                        <p className={`text-lg mt-4 ${diff.textColor}`}>{diff.text}</p>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ListDiff