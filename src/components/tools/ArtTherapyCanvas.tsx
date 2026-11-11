import React, { useRef, useState, useEffect } from 'react';
import { 
  Palette, 
  RotateCcw, 
  Download, 
  Eraser, 
  Sparkles, 
  Check, 
  Heart,
  Undo2
} from 'lucide-react';

interface ArtTherapyCanvasProps {
  onSaveArtwork?: (dataUrl: string, reflection: string, moodTag: string) => void;
}

const THERAPY_PALETTES = [
  { name: 'Calm', colors: ['#0f766e', '#14b8a6', '#5eead4', '#0284c7', '#38bdf8', '#bae6fd'] },
  { name: 'Warmth', colors: ['#c2410c', '#f97316', '#fb923c', '#d97706', '#fbbf24', '#fef08a'] },
  { name: 'Earth', colors: ['#166534', '#22c55e', '#86efac', '#78350f', '#a16207', '#fde047'] },
  { name: 'Catharsis', colors: ['#581c87', '#9333ea', '#c084fc', '#be185d', '#f43f5e', '#fda4af'] },
  { name: 'Neutrals', colors: ['#0f172a', '#475569', '#94a3b8', '#cbd5e1', '#ffffff', '#e2e8f0'] },
];

export const ArtTherapyCanvas: React.FC<ArtTherapyCanvasProps> = ({ onSaveArtwork }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [selectedColor, setSelectedColor] = useState('#0f766e');
  const [brushSize, setBrushSize] = useState(6);
  const [isEraser, setIsEraser] = useState(false);
  const [isDrawing, setIsDrawing] = useState(false);
  const [history, setHistory] = useState<ImageData[]>([]);
  const [activePaletteIndex, setActivePaletteIndex] = useState(0);
  const [reflection, setReflection] = useState('');
  const [selectedMood, setSelectedMood] = useState('Peaceful');
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set high-dpi canvas resolution
    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    // Initial white background
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, rect.width, rect.height);

    // Save initial state to history
    const initialData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    setHistory([initialData]);
  }, []);

  const saveState = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const data = ctx.getImageData(0, 0, canvas.width, canvas.height);
    setHistory(prev => [...prev.slice(-15), data]);
  };

  const undo = () => {
    if (history.length <= 1) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const newHistory = [...history];
    newHistory.pop(); // Remove current
    const previousState = newHistory[newHistory.length - 1];
    ctx.putImageData(previousState, 0, 0);
    setHistory(newHistory);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const rect = canvas.getBoundingClientRect();
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, rect.width, rect.height);
    saveState();
  };

  const getCoordinates = (e: React.MouseEvent | React.TouchEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();

    if ('touches' in e && e.touches.length > 0) {
      return {
        x: e.touches[0].clientX - rect.left,
        y: e.touches[0].clientY - rect.top,
      };
    } else if ('clientX' in e) {
      return {
        x: (e as React.MouseEvent).clientX - rect.left,
        y: (e as React.MouseEvent).clientY - rect.top,
      };
    }
    return { x: 0, y: 0 };
  };

  const startDrawing = (e: React.MouseEvent | React.TouchEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { x, y } = getCoordinates(e);
    setIsDrawing(true);
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.lineWidth = brushSize;
    ctx.strokeStyle = isEraser ? '#ffffff' : selectedColor;
  };

  const draw = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { x, y } = getCoordinates(e);
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    if (isDrawing) {
      setIsDrawing(false);
      saveState();
    }
  };

  const downloadArtwork = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement('a');
    link.download = `Asha-ArtTherapy-${Date.now()}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  const handleSaveWithReflection = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dataUrl = canvas.toDataURL('image/png');
    if (onSaveArtwork) {
      onSaveArtwork(dataUrl, reflection, selectedMood);
    }
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="bg-white rounded-3xl p-4 shadow-sm border border-slate-100 flex flex-col space-y-4">
      {/* Header Info */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center space-x-1.5">
            <Sparkles className="w-4 h-4 text-teal-600" />
            <h3 className="font-semibold text-slate-800 text-base">Digital Art Sanctuary</h3>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Let your feelings guide your strokes. There are no mistakes in art therapy.
          </p>
        </div>
        <button
          onClick={downloadArtwork}
          title="Download Artwork"
          className="p-2 bg-teal-50 hover:bg-teal-100 text-teal-700 rounded-full transition-colors active:scale-95"
        >
          <Download className="w-4 h-4" />
        </button>
      </div>

      {/* Drawing Canvas Container */}
      <div className="relative w-full aspect-[4/3] bg-slate-50 rounded-2xl overflow-hidden border border-slate-200 shadow-inner touch-none">
        <canvas
          ref={canvasRef}
          className="w-full h-full cursor-crosshair"
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          onTouchStart={startDrawing}
          onTouchMove={draw}
          onTouchEnd={stopDrawing}
        />
        {/* Subtle Watermark */}
        <div className="absolute bottom-2 right-2.5 pointer-events-none text-[10px] text-slate-300 font-medium">
          Asha The Hope • Expressive Canvas
        </div>
      </div>

      {/* Tool Controls Bar */}
      <div className="space-y-3">
        {/* Palette Selector Pills */}
        <div className="flex items-center space-x-1.5 overflow-x-auto no-scrollbar py-0.5">
          <Palette className="w-3.5 h-3.5 text-slate-400 shrink-0 mr-1" />
          {THERAPY_PALETTES.map((p, idx) => (
            <button
              key={p.name}
              onClick={() => {
                setActivePaletteIndex(idx);
                setSelectedColor(p.colors[0]);
                setIsEraser(false);
              }}
              className={`text-xs px-2.5 py-1 rounded-full whitespace-nowrap font-medium transition-all ${
                activePaletteIndex === idx
                  ? 'bg-teal-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {p.name}
            </button>
          ))}
        </div>

        {/* Color Swatches */}
        <div className="flex items-center justify-between gap-1 overflow-x-auto py-1">
          <div className="flex items-center space-x-1.5">
            {THERAPY_PALETTES[activePaletteIndex].colors.map((color) => (
              <button
                key={color}
                onClick={() => {
                  setSelectedColor(color);
                  setIsEraser(false);
                }}
                className={`w-7 h-7 rounded-full transition-transform border ${
                  !isEraser && selectedColor === color
                    ? 'scale-115 ring-2 ring-teal-500 ring-offset-2 border-transparent'
                    : 'border-slate-200 hover:scale-105'
                }`}
                style={{ backgroundColor: color }}
              />
            ))}
          </div>

          {/* Action Tools: Eraser, Undo, Clear */}
          <div className="flex items-center space-x-1 border-l border-slate-200 pl-2">
            <button
              onClick={() => setIsEraser(!isEraser)}
              title="Eraser"
              className={`p-2 rounded-xl transition-colors ${
                isEraser
                  ? 'bg-amber-100 text-amber-800 ring-1 ring-amber-400'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              <Eraser className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={undo}
              disabled={history.length <= 1}
              title="Undo stroke"
              className="p-2 bg-slate-100 hover:bg-slate-200 disabled:opacity-40 text-slate-600 rounded-xl transition-colors"
            >
              <Undo2 className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={clearCanvas}
              title="Reset Canvas"
              className="p-2 bg-slate-100 hover:bg-rose-50 hover:text-rose-600 text-slate-600 rounded-xl transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Brush Size Slider */}
        <div className="flex items-center space-x-3 bg-slate-50 px-3 py-2 rounded-2xl">
          <span className="text-xs text-slate-500 font-medium">Stroke</span>
          <input
            type="range"
            min="2"
            max="30"
            value={brushSize}
            onChange={(e) => setBrushSize(Number(e.target.value))}
            className="w-full accent-teal-600 h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer"
          />
          <div
            className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 border border-slate-200"
            style={{ backgroundColor: isEraser ? '#fff' : selectedColor }}
          >
            <div
              className="rounded-full bg-slate-700"
              style={{ width: `${Math.min(brushSize, 14)}px`, height: `${Math.min(brushSize, 14)}px` }}
            />
          </div>
        </div>
      </div>

      {/* Emotional Reflection Journal Area */}
      <div className="pt-2 border-t border-slate-100 space-y-2">
        <label className="text-xs font-semibold text-slate-700 flex items-center justify-between">
          <span>Emotional Reflection Note</span>
          <span className="text-[10px] text-teal-600 font-normal">Private & Healing</span>
        </label>
        
        {/* Mood Tag Selector */}
        <div className="flex flex-wrap gap-1.5">
          {['Peaceful', 'Hopeful', 'Vulnerable', 'Relieved', 'Grateful', 'Transforming'].map((mood) => (
            <button
              key={mood}
              onClick={() => setSelectedMood(mood)}
              className={`text-[11px] px-2.5 py-0.5 rounded-full border transition-all ${
                selectedMood === mood
                  ? 'bg-teal-50 border-teal-500 text-teal-800 font-medium'
                  : 'border-slate-200 text-slate-500 hover:border-slate-300'
              }`}
            >
              {mood}
            </button>
          ))}
        </div>

        <textarea
          value={reflection}
          onChange={(e) => setReflection(e.target.value)}
          placeholder="What feelings, memories, or sensations came alive during this drawing?"
          rows={2}
          className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-teal-500 text-slate-800 resize-none placeholder:text-slate-400"
        />

        <button
          onClick={handleSaveWithReflection}
          className="w-full py-2.5 bg-gradient-to-r from-teal-700 to-teal-800 hover:from-teal-800 hover:to-teal-900 text-white font-medium text-xs rounded-xl shadow-xs flex items-center justify-center space-x-1.5 transition-all active:scale-[0.99]"
        >
          {savedSuccess ? (
            <>
              <Check className="w-4 h-4 text-teal-200" />
              <span>Artwork Saved to Wellness Log!</span>
            </>
          ) : (
            <>
              <Heart className="w-4 h-4 text-teal-200" />
              <span>Save Artwork & Reflection to Journal</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
