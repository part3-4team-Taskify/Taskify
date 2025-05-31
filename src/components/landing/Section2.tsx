import Image from "next/image";

export default function Section2() {
  return (
    <section className="w-full flex flex-col items-center px-4">
      <div className="w-full max-w-[1200px] flex flex-col gap-[60px] sm:gap-[80px]">
        {/* 카드 1 */}
        <div className="h-[600px] bg-black2 rounded-lg relative flex flex-col md:flex-row gap-[40px] overflow-hidden">
          {/* 왼쪽 텍스트 */}
          <div className="w-full md:w-1/2 flex flex-col justify-center px-[40px] text-center md:text-left z-10">
            <p className="text-[16px] md:text-[22px] text-gray2 mb-[40px] md:mb-[100px] md:mt-0 mt-[50px]">
              Point 1
            </p>
            <div className="text-[32px] md:text-[48px] font-bold leading-[44px] md:leading-[64px] text-white">
              <p>일의 우선순위를</p>
              <p>관리하세요</p>
            </div>
          </div>

          {/* 오른쪽 이미지 */}
          <div className="w-full md:w-1/2 h-full relative flex items-end justify-end">
            <Image
              src="/images/landing1.png"
              alt="우선순위 관리 예시"
              width={594}
              height={497}
              className="w-auto max-h-[480px] object-contain"
            />
          </div>
        </div>

        {/* 카드 2 */}
        <div className="h-[600px] bg-black2 rounded-lg relative flex flex-col md:flex-row-reverse gap-[40px] overflow-hidden">
          {/* 왼쪽 텍스트 */}
          <div className="w-full md:w-1/2 flex flex-col justify-center px-[40px] text-center md:text-left z-10">
            <p className="text-[14px] md:text-[16px] text-gray2 mb-[40px] md:mb-[100px] md:mt-0 mt-[50px]">
              Point 2
            </p>
            <div className="text-[32px] md:text-[48px] font-bold leading-[44px] md:leading-[64px] text-white">
              <p>해야 할 일을</p>
              <p>등록하세요</p>
            </div>
          </div>

          {/* 오른쪽 이미지 */}
          <div className="w-full md:w-1/2 h-full relative flex items-end justify-end">
            <Image
              src="/images/landing2.png"
              alt="할 일 등록 예시"
              width={436}
              height={502}
              className="w-auto max-h-[480px] object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
