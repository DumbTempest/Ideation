import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

export default function ProjectCard({
  name,
  description,
  domain,
  techStack,
  label,
  difficulty,
}) {
  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>{name}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">

        <div className="flex justify-between">
          <div>
            <p className="text-sm font-semibold">Domain:</p>
            <p className="text-sm text-muted-foreground">
              {Array.isArray(domain) ? domain.join(", ") : domain}
            </p>
          </div>

          <div className="text-right">
            <p className="text-sm font-semibold">Difficulty:</p>
            <p className="text-sm text-muted-foreground">{difficulty}</p>
          </div>
        </div>

        <div className="flex justify-between">
          <div>
            <p className="text-sm font-semibold">Tech Stack:</p>
            <p className="text-sm text-muted-foreground">
              {techStack?.join(", ")}
            </p>
          </div>

          <div className="text-right">
            <p className="text-sm font-semibold">Label:</p>
            <p className="text-sm text-muted-foreground">{label}</p>
          </div>
        </div>

      </CardContent>
    </Card>
  );
}
