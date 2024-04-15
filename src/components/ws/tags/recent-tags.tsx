import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TagCard } from "./card";
import { TagType } from "@/lib/types";

type RecentTagsListProps = {
  tags?: TagType[];
};

export const RecentTagsList: React.FC<RecentTagsListProps> = ({ tags }) => {
  return (
    <Card className="border-none shadow-none">
      <CardHeader>
        <CardTitle className=" text-sm text-muted-foreground">
          {tags?.length} tags récemment créés
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
          {tags?.map((tag) => (
            <TagCard key={tag.id} tag={tag} withActions className="border"/>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
