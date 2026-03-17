export default function Indicator() {
  return (
    <div className="absolute bottom-0 h-[14px] left-0 right-0" data-name="Indicator">
      <div className="absolute bg-[#C61932] bottom-0 h-[3px] left-[2px] right-[2px] rounded-tl-[100px] rounded-tr-[100px]" data-name="Shape" />
    </div>
  );
}

function TabContents() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[4px] items-center justify-center min-h-px min-w-px overflow-clip py-[14px] relative" data-name="Tab Contents">
      <div className="flex flex-col font-['Roboto:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#C61932] text-[14px] text-center tracking-[0.1px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[20px]">New Case +</p>
      </div>
      <Indicator />
    </div>
  );
}

function StateLayer() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-full" data-name="State-layer">
      <div className="flex flex-col items-center justify-end overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-center justify-end px-[16px] relative size-full">
          <TabContents />
        </div>
      </div>
    </div>
  );
}

function Tab() {
  return (
    <div className="bg-white content-stretch flex flex-[1_0_0] flex-col h-full items-center justify-end min-h-px min-w-px overflow-clip relative" data-name="Tab 1">
      <StateLayer />
    </div>
  );
}

function TabContents1() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[4px] items-center justify-center min-h-px min-w-px overflow-clip py-[14px] relative" data-name="Tab Contents">
      <div className="flex flex-col font-['Roboto:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#49454f] text-[14px] text-center tracking-[0.1px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[20px]">My Cases</p>
      </div>
    </div>
  );
}

function StateLayer1() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-full" data-name="State-layer">
      <div className="flex flex-col items-center justify-end overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-center justify-end px-[16px] relative size-full">
          <TabContents1 />
        </div>
      </div>
    </div>
  );
}

function Tab1() {
  return (
    <div className="bg-white content-stretch flex flex-[1_0_0] flex-col h-full items-center justify-end min-h-px min-w-px overflow-clip relative" data-name="Tab 2">
      <StateLayer1 />
    </div>
  );
}

function TabContents2() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[4px] items-center justify-center min-h-px min-w-px overflow-clip py-[14px] relative" data-name="Tab Contents">
      <div className="flex flex-col font-['Roboto:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#49454f] text-[14px] text-center tracking-[0.1px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[20px]">Settings</p>
      </div>
    </div>
  );
}

function StateLayer2() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-full" data-name="State-layer">
      <div className="flex flex-col items-center justify-end overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-center justify-end px-[16px] relative size-full">
          <TabContents2 />
        </div>
      </div>
    </div>
  );
}

function Tab2() {
  return (
    <div className="bg-white content-stretch flex flex-[1_0_0] flex-col h-full items-center justify-end min-h-px min-w-px overflow-clip relative" data-name="Tab 3">
      <StateLayer2 />
    </div>
  );
}

function TabGroup() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-start min-h-px min-w-px relative w-full" data-name="Tab group">
      <Tab />
      <Tab1 />
      <Tab2 />
    </div>
  );
}

function Divider() {
  return (
    <div className="h-px relative shrink-0 w-full" data-name="Divider">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 402 1.00004">
        <g id="Divider">
          <line id="Divider_2" stroke="var(--stroke-0, #CAC4D0)" x1="4.37114e-08" x2="402" y1="0.500035" y2="0.5" />
        </g>
      </svg>
    </div>
  );
}

function Tabs() {
  return (
    <div className="absolute bg-white content-stretch flex flex-col h-[70px] items-start left-[-1px] top-[803px] w-[402px]" data-name="Tabs">
      <TabGroup />
      <Divider />
    </div>
  );
}

function Frame() {
  return <div className="absolute bg-[rgba(0,0,0,0.12)] h-[4px] left-[-1px] top-[799px] w-[402px]" />;
}

function Frame2() {
  return (
    <div className="bg-white h-[164px] overflow-clip relative shrink-0 w-[326px]">
      <div className="-translate-x-1/2 -translate-y-1/2 absolute flex flex-col font-['Imprima:Regular',sans-serif] h-[36px] justify-center leading-[0] left-[82.5px] not-italic text-[13px] text-[rgba(0,0,0,0.2)] text-center top-[27px] w-[147px]">
        <p className="leading-[normal] whitespace-pre-wrap">Describe the problem...</p>
      </div>
    </div>
  );
}

function ButtonContentArea() {
  return (
    <div className="content-stretch flex gap-[4px] h-[40px] items-center justify-center px-[14px] py-[7px] relative rounded-[1000px] shrink-0 w-[174px]" data-name="Button - Content Area">
      <div className="absolute bg-[#08f] inset-0 opacity-40 rounded-[1000px]" data-name="BG" />
      <p className="font-['SF_Pro:Regular',sans-serif] font-normal leading-[20px] relative shrink-0 text-[15px] text-[rgba(255,255,255,0.3)] tracking-[-0.23px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        Generate Ticket
      </p>
    </div>
  );
}

function Frame1() {
  return (
    <div className="absolute bg-[#f3f3f3] content-stretch flex flex-col gap-[10px] h-[736px] items-center left-[-1px] overflow-clip p-[10px] top-[63px] w-[402px]">
      <div className="flex flex-col font-['Imprima:Regular',sans-serif] h-[102px] justify-center leading-[0] not-italic relative shrink-0 text-[32px] text-black text-center w-full">
        <p className="leading-[normal] whitespace-pre-wrap">What is the problem?</p>
      </div>
      <Frame2 />
      <ButtonContentArea />
    </div>
  );
}

export default function IPhone() {
  return (
    <div className="bg-white border border-black border-solid relative shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] size-full" data-name="iPhone 17 - 1">
      <Tabs />
      <Frame />
      <Frame1 />
    </div>
  );
}