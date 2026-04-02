'use client';

import BreakingNewsCard from './BreakingNewsCard';
import FacebookLiveCard from './FacebookLiveCard';
import SocialPostCard from './SocialPostCard';
import WeeklyReportCard from './WeeklyReportCard';
import PressReleaseCard from './PressReleaseCard';
import HotlineCallCard from './HotlineCallCard';
import EmailAlertCard from './EmailAlertCard';
import ChatUpdateCard from './ChatUpdateCard';
import BulletinCard from './BulletinCard';

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
