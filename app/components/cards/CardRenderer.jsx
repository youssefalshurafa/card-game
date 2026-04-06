'use client';

import BreakingNewsCard from './BreakingNewsCard1_4';
import FacebookLiveCard from './FacebookLiveCard2';
import SocialPostCard from './SocialPostCard3';
import WeeklyReportCard from './WeeklyReportCard5';
import PressReleaseCard from './PressReleaseCard6';
import HotlineCallCard from './HotlineCallCard7';
import EmailAlertCard from './EmailAlertCard8';
import ChatUpdateCard from './ChatUpdateCard9';
import BulletinCard from './BulletinCard10';

const CARD_COMPONENTS = {
 'breaking-news': BreakingNewsCard,
 'facebook-live': FacebookLiveCard,
 'social-post': SocialPostCard,
 'weekly-report': WeeklyReportCard,
 'press-release': PressReleaseCard,
 'hotline-call': HotlineCallCard,
 'email-alert': EmailAlertCard,
 'chat-update': ChatUpdateCard,
 bulletin: BulletinCard,
};

export default function CardRenderer({ card, fields, editable = false, onFieldChange }) {
 const cardType = card.metadata?.cardType || card.metadata?.sourceKind || 'breaking-news';
 const Component = CARD_COMPONENTS[cardType];

 if (!Component) {
  return <div className="flex h-full items-center justify-center rounded-2xl bg-slate-800 p-4 text-sm text-slate-400">Unknown card type: {cardType}</div>;
 }

 return (
  <Component
   card={card}
   fields={fields}
   editable={editable}
   onFieldChange={onFieldChange}
  />
 );
}
