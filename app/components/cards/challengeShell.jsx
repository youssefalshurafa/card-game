import { Baloo_2, Patrick_Hand } from 'next/font/google';
import { getDifficulty } from './utils';

export const challengeDisplayFont = Baloo_2({
 subsets: ['latin'],
 weight: ['700', '800'],
});

export const challengeHandFont = Patrick_Hand({
 subsets: ['latin'],
 weight: '400',
});

const THEMES = {
 '1A': {
  frameColor: '#2e3c48',
  shellColor: '#d7d8dc',
  headerColor: '#1b8f95',
  starCapsuleColor: '#70757c',
 },
 '2A': {
  frameColor: '#a7b388',
  shellColor: '#d7d8dc',
  headerColor: '#587864',
  starCapsuleColor: '#b9c48d',
 },
 '3A': {
  frameColor: '#2d3943',
  shellColor: '#d7d8dc',
  headerColor: '#5c7f70',
  starCapsuleColor: '#2f3b46',
 },
 '4A': {
  frameColor: '#0f8ea3',
  shellColor: '#d7d8dc',
  headerColor: '#0ea3aa',
  starCapsuleColor: '#168ba2',
 },
 '5A': {
  frameColor: '#a8b286',
  shellColor: '#d7d8dc',
  headerColor: '#335f29',
  starCapsuleColor: '#b8c48a',
 },
 '6A': {
  frameColor: '#0e7aa4',
  shellColor: '#d7d8dc',
  headerColor: '#09a2a6',
  starCapsuleColor: '#177d93',
 },
};

function HeaderStars({ level }) {
 return (
  <div className="flex items-center gap-1 text-[22px] leading-none text-[#ffd24a] [text-shadow:0_1px_0_rgba(0,0,0,0.18)]">
   {Array.from({ length: level }).map((_, index) => (
    <span key={index}>★</span>
   ))}
  </div>
 );
}

export function getChallengeShellTheme(card) {
 const challengeNumber = card.metadata?.challengeNumber ?? '';
 return THEMES[challengeNumber] ?? THEMES['1A'];
}

export function ChallengePdfShell({ card, children, className = '' }) {
 const difficulty = getDifficulty(card);
 const theme = getChallengeShellTheme(card);

 return (
  <div
   className={`relative flex h-full flex-col overflow-hidden rounded-[22px] border-4 text-slate-900 shadow-[0_10px_30px_rgba(15,23,42,0.28)] ${className}`}
   style={{
    backgroundColor: theme.shellColor,
    borderColor: theme.frameColor,
   }}
  >
   <div className="absolute inset-0 overflow-hidden">
    <div className="absolute -left-10 top-20 h-80 w-24 rotate-30 bg-white/20" />
    <div className="absolute left-16 top-0 h-full w-px bg-white/15" />
    <div className="absolute left-1/2 top-8 h-[85%] w-24 -translate-x-1/2 rotate-30 bg-white/18" />
    <div className="absolute right-12 top-14 h-24 w-24 rounded-full bg-[#f5d8d8]/28" />
    <div className="absolute right-4 top-52 h-14 w-14 rounded-full bg-[#f1c3cb]/22" />
    <div className="absolute left-4 top-28 h-56 w-56 rounded-full border border-[#bad6bf]/18" />
   </div>

   <div className="relative px-3 pt-3">
    <div
     className="relative overflow-hidden rounded-tl-[14px] rounded-tr-[10px] rounded-br-none rounded-bl-[54px] px-5 pb-3 pt-2"
     style={{ backgroundColor: theme.headerColor }}
    >
     <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.1),transparent_60%)]" />
     <div className="relative flex items-start justify-between gap-3">
      <div className="pt-2 text-white">
       <p className={`${challengeDisplayFont.className} text-[37px] font-extrabold leading-none tracking-[0.01em] [text-shadow:0_2px_0_rgba(255,255,255,0.14)]`}>
        {card.metadata?.challengeLabel ?? ''}
       </p>
      </div>

      <div className="flex flex-col items-end gap-1">
       <div
        className="rounded-full px-4 py-1.5"
        style={{ backgroundColor: theme.starCapsuleColor }}
       >
        <HeaderStars level={difficulty} />
       </div>
       <span className={`${challengeDisplayFont.className} text-[27px] font-extrabold leading-none text-white`}>{card.metadata?.challengeNumber ?? ''}</span>
      </div>
     </div>
    </div>
   </div>

   <div className="relative flex-1">{children}</div>
  </div>
 );
}
