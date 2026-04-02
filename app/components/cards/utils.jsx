import EditableText from '../EditableText';

export function getField(card, key) {
 const face = card.faces?.[0];
 const el = face?.elements?.find((e) => e.key === key);
 return el?.value?.text ?? '';
}

export function getFieldJson(card, key) {
 const face = card.faces?.[0];
 const el = face?.elements?.find((e) => e.key === key);
 return el?.value ?? null;
}

export function getDifficulty(card) {
 return card.metadata?.difficulty ?? 1;
}

export function DifficultyStars({ level }) {
 return (
  <div className="flex gap-0.5">
   {Array.from({ length: 4 }).map((_, i) => (
    <span
     key={i}
     className={i < level ? 'opacity-100' : 'opacity-20'}
    >
     ⭐
    </span>
   ))}
  </div>
 );
}

export function Field({ fields, fieldKey, editable, onFieldChange, className, tag }) {
 const value = fields?.[fieldKey] ?? '';

 if (editable) {
  return (
   <EditableText
    value={value}
    fieldKey={fieldKey}
    onSave={onFieldChange}
    className={className}
    tag={tag || 'span'}
   />
  );
 }

 const Tag = tag || 'span';
 return <Tag className={className}>{value}</Tag>;
}

export function ChallengeHeader({ card }) {
 const num = card.metadata?.challengeNumber ?? '';
 const label = card.metadata?.challengeLabel ?? '';
 const difficulty = getDifficulty(card);

 return (
  <div className="flex items-center justify-between px-4 py-2 bg-indigo-950/80 backdrop-blur">
   <div className="flex items-center gap-2">
    <span className="bg-white/20 text-[10px] font-mono font-bold px-2 py-0.5 rounded">{num}</span>
    <span className="text-sm font-semibold text-white">{label}</span>
   </div>
   <DifficultyStars level={difficulty} />
  </div>
 );
}

export function buildFieldsFromCard(card) {
 const face = card.faces?.[0];
 const fields = {};
 face?.elements?.forEach((el) => {
  fields[el.key] = el.value?.text ?? (typeof el.value === 'object' ? JSON.stringify(el.value) : '');
 });
 return fields;
}
