const BottomSheet = () => {
  return (
    <div className="flex flex-col justify-start items-start overflow-hidden rounded-tl-2xl rounded-tr-2xl">
      <div className="flex flex-col justify-start items-start flex-grow-0 flex-shrink-0">
        <div className="flex justify-center items-center flex-grow-0 flex-shrink-0 w-[360px] relative gap-0.5 p-4 bg-white">
          <p className="flex-grow-0 flex-shrink-0 text-base font-bold text-left text-black">
            카드 꾸미기
          </p>
        </div>
        <div className="flex justify-start items-start flex-grow-0 flex-shrink-0 w-[360px] gap-2 px-4 bg-white">
          <div className="flex flex-col justify-start items-start self-stretch flex-grow-0 flex-shrink-0 w-[328px] relative gap-4 p-6 rounded-xl bg-white border border-[#e3e3e3]">
            <div className="flex flex-col justify-start items-start self-stretch flex-grow-0 flex-shrink-0 relative gap-3">
              <div className="flex justify-start items-start flex-grow-0 flex-shrink-0 relative gap-0.5">
                <p className="flex-grow-0 flex-shrink-0 text-[13px] font-medium text-left text-[#666]">
                  소설
                </p>
              </div>
              <p className="flex-grow-0 flex-shrink-0 text-base font-bold text-left text-[#353535]">
                나는 나로 살기로 했다
              </p>
            </div>
            <pre>
              Failed to transform TEXT Ich bitte die Kinder um Verzeihung, daß
              ich dieses Buch einem Erwachsenen widme. Ich habe eine ernstliche
              Entschu ldigung dsdafür: Dieser Erwa
            </pre>
            <div className="flex justify-start items-start self-stretch flex-grow-0 flex-shrink-0 relative gap-2.5">
              <p className="self-stretch flex-grow-0 flex-shrink-0 w-[280px] text-[11px] font-light text-left text-[#666]">
                - 앙투안 드 생텍쥐페리
              </p>
            </div>
          </div>
        </div>
        <div className="flex justify-start items-start flex-grow-0 flex-shrink-0 w-[360px] h-[164px] overflow-hidden gap-2 p-4 bg-white border-t-0 border-r-0 border-b border-l-0 border-[#e3e3e3]">
          <div className="flex justify-start items-start flex-grow-0 flex-shrink-0 w-[328px] relative gap-2">
            <div className="flex-grow-0 flex-shrink-0 w-[60px] h-[60px] rounded-lg bg-white border-[3px] border-[#515151]" />
            <div className="flex-grow-0 flex-shrink-0 w-[60px] h-[60px] rounded-lg bg-[#fff1f1]" />
            <div className="flex-grow-0 flex-shrink-0 w-[58px] h-[60px] rounded-lg bg-[#e1f3e2]" />
            <div className="flex-grow-0 flex-shrink-0 w-[60px] h-[60px] rounded-lg bg-[#f4f4f4]" />
            <div className="flex-grow-0 flex-shrink-0 w-[58px] h-[60px] rounded-lg bg-[#fdfdd0]" />
            <div className="flex-grow-0 flex-shrink-0 w-[60px] h-[60px] rounded-lg bg-[#f4f0ff]" />
            <div className="flex-grow-0 flex-shrink-0 w-[60px] h-[60px] rounded-lg bg-[#e6f8fc]" />
          </div>
        </div>
      </div>
      <div className="flex justify-start items-start flex-grow-0 flex-shrink-0 w-[360px] overflow-hidden gap-2 px-4 py-3 bg-white border-t-0 border-r-0 border-b border-l-0 border-[#e3e3e3]">
        <div className="flex justify-center items-center flex-grow-0 flex-shrink-0 w-32 relative gap-1 p-4 rounded-lg border border-[#afafaf]">
          <p className="flex-grow-0 flex-shrink-0 text-[15px] font-bold text-left text-[#6d6d6d]">
            취소
          </p>
        </div>
        <div className="flex justify-center items-center flex-grow relative gap-1 p-4 rounded-lg bg-[#6d6d6d]">
          <p className="flex-grow-0 flex-shrink-0 text-[15px] font-bold text-left text-white">
            적용하기
          </p>
        </div>
      </div>
    </div>
  );
};

export default BottomSheet;
