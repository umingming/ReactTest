import { useState } from "react";

type AdventureItem = {
    dataId: string;
    dataNm: string;
    dataDc: string | null;
    previewFileInfo: FileInfo[];
    fileInfo: FileInfo[];
    dataTm: string;
    dataInfo: Record<string, any>;
    txtInfo: Record<string, any>;
    linkInfo: Record<string, any>;
};
type FileInfo = {
    fileNm: string;
    fileSize: number;
    requestId: string;
    fileTy: string;
    rgstNo: number;
    fileId: string;
};

function SelAdventuresVideoCard({ item }: { item: AdventureItem }) {
    return <div>{item.dataTm}</div>;
}

interface SelAdventuresVideoListProps {
    items: AdventureItem[];
}

function SelAdventuresVideoList({ items }: SelAdventuresVideoListProps) {
    return (
        <div>
            {items.map((item: AdventureItem) => (
                <SelAdventuresVideoCard key={item.dataId} item={item} />
            ))}
        </div>
    );
}

export function SelAdventuresPage() {
    const [items, setItems] = useState<AdventureItem[]>([]);

    return (
        <div>
            <SelAdventuresVideoList items={items} />
        </div>
    );
}

export default function StudentSelAdventuresPage() {}
