"use client"
import Image from 'next/image';

interface workdata {
    imgSrc: string;
    heading: string;
    subheading: string;
    hiddenpara: string;
}

const workdata: workdata[] = [
    {
        imgSrc: '/images/Work/icon-one.svg',
        heading: 'GLADAIBOT',
        subheading: `Xu hướng tài chính hiện tại và tương lai đang chuyển đổi theo hướng đổi mới công nghệ và ứng dụng mới, trong đó có sự phát triển bùng nổ của GAME FI DeFi, AI, METAFI,... sự phát triển của tiền điện tử và quá trình chuyển đổi đến các hình thức thanh toán online.`,
        hiddenpara: `Những công nghệ này đang đóng vai trò quan trọng trong việc tạo ra cái mới, các sản phẩm dịch vụ tài chính và cung cấp đầu tư cơ hội cho người dùng.`,
    },
    {
        imgSrc: '/images/Work/icon-two.svg',
        heading: 'Gamefi là gì?',
        subheading: `GameFi là một thuật ngữ chỉ sự kết hợp của "Game" và "Finance" - đề cập đến các trò chơi dựa trên blockchain cho phép người chơi nhận được các lợi ích tài chính trong thế giới thực; đó là sự kết hợp của game, tài chính phi tập trung (DeFi), NFT và mô hình play-to-earn (P2E).`,
        hiddenpara: `GameFi có nhiều mức độ phức tạp - từ các trò chơi xổ số đơn giản đến các MMOPRG hoàn chỉnh. Cho dù thông qua nhiệm vụ, giao dịch hoặc bất cứ cơ chế nào, GameFi cũng cho phép người chơi kiếm được tài sản tiền điện tử cho những nỗ lực của họ trong game.`,
    },
    {
        imgSrc: '/images/Work/icon-three.svg',
        heading: ' GLADAIBOT là gì?',
        subheading: `GLADAIBOT kết hợp sức mạnh của trí tuệ nhân tạo (AI), siêu dữ liệu (Metadata) và tài chính phi tập trung (DEFI) số game thậm chí còn cho phép người chơi tạo thu nhập thụ động mà không cần phải chơi game thông qua liquidity farming hoặc cho người chơi khác mượn tài sản chơi game của họ. Việc giới thiệu những khả năng như thế không chỉ giúp phân cấp game mà còn cho phép người chơi tác động đến sự phát triển thực sự của game thông qua các DAO.`,
        hiddenpara: `Dự án được phát triển từ đội ngũ có trụ sở tại Vương Quốc Anh`,
    },
    {
        imgSrc: '/images/Work/icon-three.svg',
        heading: 'Sứ mệnh',
        subheading: `GLADAIBOT - Giúp người dùng  sử dụng AI để tạo ra thế giới số  (Open Metaworld) là nền tảng giao dịch tài chính, cho  phép người giao dịch kiếm ra lợi nhuận bằng  AIBOT sẽ giúp người chơi chiến thắng dễ dàng hơn chúng tôi mong muốn và từ đó toàn quyền khai thác lợi nhuận từ tài sản số của các sàn giúp người chơi trong game dễ dàng  tạo ra nguồn lợi nhuận khủng`,
        hiddenpara: ``,
    },
    {
        imgSrc: '/images/Work/icon-three.svg',
        heading: 'Tầm nhìn',
        subheading: `GLADAIBOT xây dựng nên nền tảng BOTAI  ứng dụng phi tập trung được sở hữu bởi cộng đồng thu hút được những nhà phát triển game & người chơi tham gia xây dựng cộng đồng trong thế giới gamefi`,
        hiddenpara: ``,
    },
]

const Work = () => {
    return (
        <div>
            <div className='mx-auto max-w-7xl mt-16 px-6 mb-20 relative'>
                {/* <div className="radial-bgone hidden lg:block"></div> */}
                <div className='text-center mb-14'>
                    <h3 className='text-offwhite text-3xl md:text-5xl font-bold mb-3'>How it work</h3>
                    <p className='text-bluish md:text-lg font-normal leading-8'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. <br /> Lorem Ipsum has been the industry standard dummy text ever.</p>
                </div>
                <div className='flex flex-col gap-y-20 gap-x-5 mt-32'>
                    {workdata.map((items, i) => (
                        <div className={`card-b p-4 w-full md:w-4/5 md:p-8 ${i % 2 !== 0 ? 'ml-auto bg-navyblue' : 'bg-black'}`} key={i}>
                            <div className='work-img-bg rounded-full flex justify-center absolute p-6'>
                                <Image src={items.imgSrc} alt={items.imgSrc} width={44} height={44} />
                            </div>
                            <div>
                                <Image src={'/images/Work/bg-arrow.svg'} alt="arrow-bg" width={85} height={35} className={i % 2 !== 0 ? 'rotate-180 ml-auto' : ''} />
                            </div>
                            <h3 className='text-2xl text-offwhite font-semibold text-center mt-8'>{items.heading}</h3>
                            <p className='text-base font-normal text-bluish mt-2'>{items.subheading}</p>
                            {
                                items.hiddenpara && <p className="text-base font-normal mt-4 text-bluish">{items.hiddenpara}</p>
                            }
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Work;
