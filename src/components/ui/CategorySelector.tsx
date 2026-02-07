import { 
  Construction, 
  Droplets, 
  Zap, 
  Trash2, 
  TreePine, 
  TrafficCone,
  Lightbulb,
  Building,
  AlertTriangle,
  HelpCircle
} from "lucide-react";

interface Category {
  id: string;
  name: string;
  icon: React.ReactNode;
  description: string;
}

const categories: Category[] = [
  {
    id: "roads",
    name: "Roads & Potholes",
    icon: <Construction className="w-8 h-8" />,
    description: "Damaged roads, potholes, road repairs"
  },
  {
    id: "water",
    name: "Water Supply",
    icon: <Droplets className="w-8 h-8" />,
    description: "Water shortage, leakage, contamination"
  },
  {
    id: "electricity",
    name: "Electricity",
    icon: <Zap className="w-8 h-8" />,
    description: "Power outages, faulty wiring, transformers"
  },
  {
    id: "sanitation",
    name: "Sanitation",
    icon: <Trash2 className="w-8 h-8" />,
    description: "Garbage collection, drainage, sewage"
  },
  {
    id: "streetlights",
    name: "Street Lights",
    icon: <Lightbulb className="w-8 h-8" />,
    description: "Non-working lights, new installation"
  },
  {
    id: "parks",
    name: "Parks & Gardens",
    icon: <TreePine className="w-8 h-8" />,
    description: "Park maintenance, tree trimming"
  },
  {
    id: "traffic",
    name: "Traffic & Signals",
    icon: <TrafficCone className="w-8 h-8" />,
    description: "Signal issues, traffic management"
  },
  {
    id: "buildings",
    name: "Buildings",
    icon: <Building className="w-8 h-8" />,
    description: "Dangerous structures, public buildings"
  },
  {
    id: "hazard",
    name: "Safety Hazard",
    icon: <AlertTriangle className="w-8 h-8" />,
    description: "Any immediate safety concern"
  },
  {
    id: "other",
    name: "Other Issues",
    icon: <HelpCircle className="w-8 h-8" />,
    description: "Any other civic issue"
  }
];

interface CategorySelectorProps {
  selectedCategory: string | null;
  onSelect: (categoryId: string) => void;
}

const CategorySelector = ({ selectedCategory, onSelect }: CategorySelectorProps) => {
  return (
    <div className="space-y-4">
      <div 
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"
        role="radiogroup"
        aria-label="Select issue category"
      >
        {categories.map((category) => (
          <button
            key={category.id}
            type="button"
            onClick={() => onSelect(category.id)}
            className={`
              p-4 rounded-2xl border-2 transition-all text-center
              focus-visible:ring-4 focus-visible:ring-ring focus-visible:ring-offset-2
              ${selectedCategory === category.id
                ? "border-primary bg-accent text-primary"
                : "border-border hover:border-primary/50 hover:bg-muted"
              }
            `}
            role="radio"
            aria-checked={selectedCategory === category.id}
            aria-label={`${category.name}: ${category.description}`}
          >
            <div className={`
              mx-auto mb-3 p-3 rounded-xl w-fit
              ${selectedCategory === category.id ? "bg-primary text-primary-foreground" : "bg-muted"}
            `}>
              {category.icon}
            </div>
            <p className="font-semibold text-base">{category.name}</p>
          </button>
        ))}
      </div>

      {selectedCategory && (
        <p className="text-muted-foreground text-center" aria-live="polite">
          Selected: <span className="font-semibold text-foreground">
            {categories.find(c => c.id === selectedCategory)?.name}
          </span>
        </p>
      )}
    </div>
  );
};

export default CategorySelector;
