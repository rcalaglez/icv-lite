import useResumeStore from "@/hooks/useResumeStore";

interface Step1_SelectProfileProps {
  onProfileSelected: (profileId: string) => void;
}

export const Step1_SelectProfile = ({
  onProfileSelected,
}: Step1_SelectProfileProps) => {
  const profiles = useResumeStore((state) => state.profiles);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">
        Paso 1: Elige el perfil que quieres evaluar
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {Object.values(profiles).map((profile) => (
          <div
            key={profile.id}
            onClick={() => onProfileSelected(profile.id)}
            className="p-4 border rounded-lg cursor-pointer hover:bg-secondary"
          >
            <h3 className="text-lg font-semibold">{profile.name}</h3>
            <p className="text-sm text-muted-foreground">
              {profile.data.basics.label}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
