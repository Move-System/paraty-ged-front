// src/components/ui/UserAvatar.tsx
type UserAvatarProps = {
  name: string;
};

export function UserAvatar({ name }: UserAvatarProps) {
  const initial = name?.charAt(0).toUpperCase() || '?';

  return (
    <div className="flex items-center gap-2">
      <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-sm font-medium text-slate-700 shadow">
        {initial}
      </div>
      <span className="text-sm font-medium text-slate-900">{name}</span>
    </div>
  );
}
