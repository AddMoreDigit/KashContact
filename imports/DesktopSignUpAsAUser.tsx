import svgPaths from "./svg-8s6wmen05o";

function Frame() {
  return (
    <div className="absolute bg-[#8363f2] box-border content-stretch flex gap-[13px] items-center justify-center left-1/2 pb-[12px] pt-[13px] px-[10px] rounded-[6px] top-[851px] translate-x-[-50%] w-[420px]">
      <p className="font-['Nunito_Sans:ExtraBold',sans-serif] font-extrabold leading-[normal] relative shrink-0 text-[18px] text-nowrap text-white whitespace-pre" style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}>
        Explore Dashboard
      </p>
    </div>
  );
}

function TaskAlt() {
  return (
    <div className="relative shrink-0 size-[134px]" data-name="task_alt">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 134 134">
        <g id="task_alt">
          <mask height="134" id="mask0_85_274" maskUnits="userSpaceOnUse" style={{ maskType: "alpha" }} width="134" x="0" y="0">
            <rect fill="var(--fill-0, #D9D9D9)" height="134" id="Bounding box" width="134" />
          </mask>
          <g mask="url(#mask0_85_274)">
            <path d={svgPaths.p11619f00} fill="var(--fill-0, #2AF518)" id="task_alt_2" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Frame1() {
  return (
    <div className="absolute bg-white box-border content-stretch flex gap-[10px] h-[187px] items-center left-[calc(50%-9px)] p-[26px] rounded-[93.5px] top-[160px] translate-x-[-50%]">
      <div aria-hidden="true" className="absolute border-[6px] border-solid border-white inset-0 pointer-events-none rounded-[93.5px]" />
      <TaskAlt />
    </div>
  );
}

export default function DesktopSignUpAsAUser() {
  return (
    <div className="bg-white relative size-full" data-name="Desktop sign up as a user">
      <div className="absolute bg-white h-[1024px] left-[calc(50%-11.5px)] top-0 translate-x-[-50%] w-[1463px]">
        <div aria-hidden="true" className="absolute border border-[#8363f2] border-solid inset-0 pointer-events-none" />
      </div>
      <Frame />
      <div className="absolute bg-black h-[538px] left-0 top-0 w-[1440px]" />
      <p className="absolute font-['Be_Vietnam_Pro:Medium',sans-serif] leading-[21px] left-[calc(50%-125px)] not-italic text-[32px] text-white top-[387px] tracking-[-0.32px] w-[707px]">Congratulation</p>
      <Frame1 />
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[21px] left-[502px] not-italic text-[24px] text-nowrap text-white top-[448px] tracking-[-0.32px] whitespace-pre">Your account is set up and ready to go.</p>
      <div className="absolute font-['Be_Vietnam_Pro:Regular',sans-serif] h-[384px] leading-[0] left-[calc(50%-290px)] not-italic text-[24px] text-black top-[577px] tracking-[-0.32px] w-[777px]">
        <p className="leading-[45px] mb-0">You can now:</p>
        <ul className="list-disc">
          <li className="mb-0 ms-[36px]">
            <span className="leading-[45px]">Join or create savings campaigns</span>
          </li>
          <li className="mb-0 ms-[36px]">
            <span className="leading-[45px]">Track your progress toward your goals</span>
          </li>
          <li className="mb-0 ms-[36px]">
            <span className="leading-[45px]">Access vendor services and exclusive vouchers</span>
          </li>
          <li className="ms-[36px]">
            <span className="leading-[45px]">Connect with your community — stress-free</span>
          </li>
        </ul>
      </div>
    </div>
  );
}