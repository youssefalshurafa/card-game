import EditableText from '../EditableText';
import EditableImage from '../EditableImage';

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

export function ImageField({ fields, fieldKey, editable, onFieldChange, className, imageClassName, placeholder }) {
 const value = fields?.[fieldKey] ?? '';

 if (editable) {
  return (
   <EditableImage
    value={value}
    fieldKey={fieldKey}
    onSave={onFieldChange}
    className={className}
    imageClassName={imageClassName}
    placeholder={placeholder || 'Click to add image'}
   />
  );
 }

 const hasImage = value && value !== '' && !value.startsWith('{');
 if (hasImage) {
  return (
   <img
    src={value}
    alt=""
    className={`${className || ''} object-cover ${imageClassName || ''}`}
   />
  );
 }
 return <div className={`${className || ''} flex items-center justify-center bg-slate-700/50 text-[8px] text-slate-400`}>{placeholder || 'No image'}</div>;
}

export function ChallengeHeader({ card }) {
 const num = card.metadata?.challengeNumber ?? '';
 const label = card.metadata?.challengeLabel ?? '';
 const difficulty = getDifficulty(card);

 return (
  <div className="relative overflow-hidden bg-gradient-to-r from-teal-700 via-teal-600 to-teal-700 px-4 py-2.5">
   {/* Orange diagonal accent stripes */}
   <div className="absolute -left-3 -top-3 h-16 w-16 rotate-45 bg-amber-500/30" />
   <div className="absolute -right-3 -top-3 h-16 w-16 rotate-45 bg-amber-500/30" />

   <div className="relative flex items-center justify-between">
    <p className="text-lg font-extrabold tracking-tight text-white drop-shadow">{label}</p>
    <div className="flex items-center gap-2">
     <DifficultyStars level={difficulty} />
     <span className="rounded-md bg-teal-900/70 px-2 py-0.5 text-[10px] font-mono font-bold text-teal-200">{num}</span>
    </div>
   </div>
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
