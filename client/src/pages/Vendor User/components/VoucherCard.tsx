import { ImageWithFallback } from "@/components/ui/ImageWithFallback";

interface VoucherCardProps {
  image: string;
  title: string;
  date: string;
  claimedBy: string;
}

export function VoucherCard({ image, title, date, claimedBy }: VoucherCardProps) {
  return (
    <div className="flex items-start gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
      <ImageWithFallback
        src={image}
        alt={title}
        className="w-16 h-16 rounded-lg object-cover"
      />
      <div className="flex-1">
        <h4 className="text-gray-900">{title}</h4>
        <p className="text-gray-500 text-sm">{date}</p>
        <p className="text-gray-400 text-xs">Claimed by: {claimedBy}</p>
      </div>
    </div>
  );
}
