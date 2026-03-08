import { useState } from 'react';
import { prayers, availableDecadePrayers, availableClosingPrayers, type Prayer } from '../data/prayers';

interface CustomizeModalProps {
  isOpen: boolean;
  onClose: () => void;
  decadePrayers: string[];
  closingPrayers: string[];
  customPrayers: Prayer[];
  onUpdateDecadePrayers: (prayers: string[]) => void;
  onUpdateClosingPrayers: (prayers: string[]) => void;
  onAddCustomPrayer: (prayer: Prayer) => void;
  onRemoveCustomPrayer: (id: string) => void;
}

export default function CustomizeModal({
  isOpen,
  onClose,
  decadePrayers,
  closingPrayers,
  customPrayers,
  onUpdateDecadePrayers,
  onUpdateClosingPrayers,
  onAddCustomPrayer,
  onRemoveCustomPrayer,
}: CustomizeModalProps) {
  const [activeTab, setActiveTab] = useState<'decade' | 'closing' | 'custom'>('decade');
  const [newPrayerTitle, setNewPrayerTitle] = useState('');
  const [newPrayerText, setNewPrayerText] = useState('');
  const [addTarget, setAddTarget] = useState<'decade' | 'closing'>('decade');

  if (!isOpen) return null;

  const toggleDecadePrayer = (id: string) => {
    if (decadePrayers.includes(id)) {
      onUpdateDecadePrayers(decadePrayers.filter((p) => p !== id));
    } else {
      onUpdateDecadePrayers([...decadePrayers, id]);
    }
  };

  const toggleClosingPrayer = (id: string) => {
    if (closingPrayers.includes(id)) {
      onUpdateClosingPrayers(closingPrayers.filter((p) => p !== id));
    } else {
      onUpdateClosingPrayers([...closingPrayers, id]);
    }
  };

  const handleAddCustomPrayer = () => {
    if (!newPrayerTitle.trim() || !newPrayerText.trim()) return;
    const id = `custom_${Date.now()}`;
    const prayer: Prayer = { id, title: newPrayerTitle.trim(), text: newPrayerText.trim() };
    onAddCustomPrayer(prayer);
    if (addTarget === 'decade') {
      onUpdateDecadePrayers([...decadePrayers, id]);
    } else {
      onUpdateClosingPrayers([...closingPrayers, id]);
    }
    setNewPrayerTitle('');
    setNewPrayerText('');
  };

  const handleRemoveCustom = (id: string) => {
    onRemoveCustomPrayer(id);
    onUpdateDecadePrayers(decadePrayers.filter((p) => p !== id));
    onUpdateClosingPrayers(closingPrayers.filter((p) => p !== id));
  };

  const moveUp = (list: string[], index: number, updater: (l: string[]) => void) => {
    if (index <= 0) return;
    const newList = [...list];
    [newList[index - 1], newList[index]] = [newList[index], newList[index - 1]];
    updater(newList);
  };

  const moveDown = (list: string[], index: number, updater: (l: string[]) => void) => {
    if (index >= list.length - 1) return;
    const newList = [...list];
    [newList[index], newList[index + 1]] = [newList[index + 1], newList[index]];
    updater(newList);
  };

  const getPrayerTitle = (id: string) => {
    if (prayers[id]) return prayers[id].title;
    const custom = customPrayers.find((p) => p.id === id);
    return custom?.title || id;
  };

  const allDecadeOptions = [...availableDecadePrayers, ...customPrayers.map((p) => p.id)];
  const allClosingOptions = [...availableClosingPrayers, ...customPrayers.map((p) => p.id)];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
      <div
        className="relative w-full max-w-lg max-h-[85vh] overflow-hidden rounded-2xl bg-gradient-to-b from-[#2a1f3d] to-[#1a1025] border border-purple-500/20 shadow-2xl animate-fade-in flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b border-purple-500/20 flex-shrink-0">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-gold-300">✨ Customize Rosary</h2>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full flex items-center justify-center text-purple-300 hover:bg-purple-500/20 transition"
            >
              ✕
            </button>
          </div>

          {/* Tabs */}
          <div className="flex gap-1 mt-4 bg-purple-900/30 rounded-lg p-1">
            {(['decade', 'closing', 'custom'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition ${
                  activeTab === tab
                    ? 'bg-purple-600/50 text-gold-200 shadow-sm'
                    : 'text-purple-300 hover:text-white'
                }`}
              >
                {tab === 'decade' ? '📿 Decades' : tab === 'closing' ? '🙏 Closing' : '✏️ Custom'}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-5 scroll-hide">
          {activeTab === 'decade' && (
            <div className="space-y-3">
              <p className="text-purple-300 text-sm mb-4">
                Select prayers to say after the Glory Be at the end of each decade.
              </p>

              {/* Currently Active - Reorderable */}
              {decadePrayers.length > 0 && (
                <div className="mb-4">
                  <h3 className="text-gold-400 text-xs font-semibold uppercase tracking-wider mb-2">Active (drag to reorder)</h3>
                  <div className="space-y-2">
                    {decadePrayers.map((id, index) => (
                      <div
                        key={id}
                        className="flex items-center gap-2 bg-purple-800/30 rounded-lg p-3 border border-purple-500/20"
                      >
                        <span className="text-gold-300 text-sm font-medium flex-1">
                          {getPrayerTitle(id)}
                        </span>
                        <div className="flex gap-1">
                          <button
                            onClick={() => moveUp(decadePrayers, index, onUpdateDecadePrayers)}
                            className="w-7 h-7 rounded flex items-center justify-center text-purple-400 hover:text-white hover:bg-purple-600/30 text-xs"
                            disabled={index === 0}
                          >
                            ▲
                          </button>
                          <button
                            onClick={() => moveDown(decadePrayers, index, onUpdateDecadePrayers)}
                            className="w-7 h-7 rounded flex items-center justify-center text-purple-400 hover:text-white hover:bg-purple-600/30 text-xs"
                            disabled={index === decadePrayers.length - 1}
                          >
                            ▼
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* All options as toggles */}
              <h3 className="text-gold-400 text-xs font-semibold uppercase tracking-wider mb-2">Available Prayers</h3>
              {allDecadeOptions.map((id) => {
                const isActive = decadePrayers.includes(id);
                return (
                  <button
                    key={id}
                    onClick={() => toggleDecadePrayer(id)}
                    className={`w-full flex items-center gap-3 p-3 rounded-lg border transition ${
                      isActive
                        ? 'border-gold-500/40 bg-gold-900/20'
                        : 'border-purple-500/20 bg-purple-900/20 hover:bg-purple-800/30'
                    }`}
                  >
                    <div
                      className={`w-5 h-5 rounded flex items-center justify-center text-xs border ${
                        isActive
                          ? 'bg-gold-500 border-gold-400 text-black'
                          : 'border-purple-500/40 text-transparent'
                      }`}
                    >
                      ✓
                    </div>
                    <span className={`text-sm ${isActive ? 'text-gold-200' : 'text-purple-200'}`}>
                      {getPrayerTitle(id)}
                    </span>
                  </button>
                );
              })}
            </div>
          )}

          {activeTab === 'closing' && (
            <div className="space-y-3">
              <p className="text-purple-300 text-sm mb-4">
                Select prayers to say after all five decades, in the closing of the Rosary.
              </p>

              {/* Currently Active - Reorderable */}
              {closingPrayers.length > 0 && (
                <div className="mb-4">
                  <h3 className="text-gold-400 text-xs font-semibold uppercase tracking-wider mb-2">Active (reorder)</h3>
                  <div className="space-y-2">
                    {closingPrayers.map((id, index) => (
                      <div
                        key={id}
                        className="flex items-center gap-2 bg-purple-800/30 rounded-lg p-3 border border-purple-500/20"
                      >
                        <span className="text-gold-300 text-sm font-medium flex-1">
                          {getPrayerTitle(id)}
                        </span>
                        <div className="flex gap-1">
                          <button
                            onClick={() => moveUp(closingPrayers, index, onUpdateClosingPrayers)}
                            className="w-7 h-7 rounded flex items-center justify-center text-purple-400 hover:text-white hover:bg-purple-600/30 text-xs"
                            disabled={index === 0}
                          >
                            ▲
                          </button>
                          <button
                            onClick={() => moveDown(closingPrayers, index, onUpdateClosingPrayers)}
                            className="w-7 h-7 rounded flex items-center justify-center text-purple-400 hover:text-white hover:bg-purple-600/30 text-xs"
                            disabled={index === closingPrayers.length - 1}
                          >
                            ▼
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <h3 className="text-gold-400 text-xs font-semibold uppercase tracking-wider mb-2">Available Prayers</h3>
              {allClosingOptions.map((id) => {
                const isActive = closingPrayers.includes(id);
                return (
                  <button
                    key={id}
                    onClick={() => toggleClosingPrayer(id)}
                    className={`w-full flex items-center gap-3 p-3 rounded-lg border transition ${
                      isActive
                        ? 'border-gold-500/40 bg-gold-900/20'
                        : 'border-purple-500/20 bg-purple-900/20 hover:bg-purple-800/30'
                    }`}
                  >
                    <div
                      className={`w-5 h-5 rounded flex items-center justify-center text-xs border ${
                        isActive
                          ? 'bg-gold-500 border-gold-400 text-black'
                          : 'border-purple-500/40 text-transparent'
                      }`}
                    >
                      ✓
                    </div>
                    <span className={`text-sm ${isActive ? 'text-gold-200' : 'text-purple-200'}`}>
                      {getPrayerTitle(id)}
                    </span>
                  </button>
                );
              })}
            </div>
          )}

          {activeTab === 'custom' && (
            <div className="space-y-4">
              <p className="text-purple-300 text-sm">
                Create your own custom prayers to add to the decades or closing section.
              </p>

              {/* Existing Custom Prayers */}
              {customPrayers.length > 0 && (
                <div className="space-y-2 mb-4">
                  <h3 className="text-gold-400 text-xs font-semibold uppercase tracking-wider">Your Custom Prayers</h3>
                  {customPrayers.map((prayer) => (
                    <div
                      key={prayer.id}
                      className="flex items-start gap-3 bg-purple-800/30 rounded-lg p-3 border border-purple-500/20"
                    >
                      <div className="flex-1">
                        <h4 className="text-gold-200 text-sm font-medium">{prayer.title}</h4>
                        <p className="text-purple-300 text-xs mt-1 line-clamp-2">{prayer.text}</p>
                      </div>
                      <button
                        onClick={() => handleRemoveCustom(prayer.id)}
                        className="w-7 h-7 rounded flex items-center justify-center text-red-400 hover:text-red-300 hover:bg-red-900/30 text-sm flex-shrink-0"
                      >
                        🗑
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {/* Add New */}
              <div className="bg-purple-900/30 rounded-xl p-4 border border-purple-500/20">
                <h3 className="text-gold-300 text-sm font-semibold mb-3">Add New Prayer</h3>
                <input
                  type="text"
                  value={newPrayerTitle}
                  onChange={(e) => setNewPrayerTitle(e.target.value)}
                  placeholder="Prayer title..."
                  className="w-full bg-purple-900/50 text-white placeholder-purple-400 border border-purple-500/30 rounded-lg px-3 py-2 text-sm mb-3 focus:outline-none focus:border-gold-500/50"
                />
                <textarea
                  value={newPrayerText}
                  onChange={(e) => setNewPrayerText(e.target.value)}
                  placeholder="Prayer text..."
                  rows={4}
                  className="w-full bg-purple-900/50 text-white placeholder-purple-400 border border-purple-500/30 rounded-lg px-3 py-2 text-sm mb-3 resize-none focus:outline-none focus:border-gold-500/50"
                />
                <div className="flex items-center gap-3">
                  <label className="text-purple-300 text-xs">Add to:</label>
                  <select
                    value={addTarget}
                    onChange={(e) => setAddTarget(e.target.value as 'decade' | 'closing')}
                    className="bg-purple-900/50 text-white border border-purple-500/30 rounded-lg px-2 py-1 text-sm focus:outline-none"
                  >
                    <option value="decade">Decade Prayers</option>
                    <option value="closing">Closing Prayers</option>
                  </select>
                  <button
                    onClick={handleAddCustomPrayer}
                    disabled={!newPrayerTitle.trim() || !newPrayerText.trim()}
                    className="ml-auto bg-gold-500 text-black px-4 py-1.5 rounded-lg text-sm font-semibold disabled:opacity-40 hover:bg-gold-400 transition"
                  >
                    Add Prayer
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-purple-500/20 flex-shrink-0">
          <button
            onClick={onClose}
            className="w-full py-2.5 bg-purple-600/40 hover:bg-purple-600/60 text-white rounded-lg font-medium transition"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
