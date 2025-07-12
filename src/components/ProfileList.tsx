import { Link } from "react-router-dom";
import useResumeStore from "@/hooks/useResumeStore";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

const ProfileList = () => {
  const profiles = useResumeStore((state) => state.profiles);

  return (
    <div className="container mx-auto p-4 md:p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Mis Perfiles de CV</h1>
        <p className="text-muted-foreground">Selecciona un perfil para ver, editar o exportar.</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
        {profiles.map((profile) => (
          <Link to={`/profile/${profile.id}`} key={profile.id} className="block hover:no-underline group">
            <Card className="h-full flex flex-col border-2 border-slate-200/80 dark:border-slate-800 group-hover:border-blue-700 dark:group-hover:border-blue-600 group-hover:shadow-xl transition-all duration-300 transform group-hover:-translate-y-1">
              <CardHeader>
                <CardTitle className="text-lg font-semibold tracking-tight">{profile.name}</CardTitle>
                <CardDescription>{profile.data.basics.label}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-sm text-muted-foreground line-clamp-3">
                  {profile.data.basics.summary}
                </p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ProfileList;