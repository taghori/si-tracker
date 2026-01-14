import React from 'react';
import { GameSettings, ExpansionId, Spirit, Adversary, Scenario } from '../types';
import { EXPANSIONS, SPIRITS, ADVERSARIES, SCENARIOS } from '../constants';
import { X, Check, Play, Map as MapIcon } from 'lucide-react';
import { useI18n } from '../services/i18n';

interface SettingsDialogProps {
  settings: GameSettings;
  onSave: (settings: GameSettings) => void;
  onClose: () => void;
  isInitialSetup?: boolean;
}

const SettingsDialog: React.FC<SettingsDialogProps> = ({ settings, onSave, onClose, isInitialSetup = false }) => {
  const { t } = useI18n();
  const [localSettings, setLocalSettings] = React.useState<GameSettings>(settings);

  const toggleExpansion = (id: ExpansionId) => {
    setLocalSettings(prev => {
      const exists = prev.expansions.includes(id);
      let newExpansions = exists
        ? prev.expansions.filter(e => e !== id)
        : [...prev.expansions, id];

      // Ensure Base is always there
      if (!newExpansions.includes(ExpansionId.BASE)) {
        newExpansions.push(ExpansionId.BASE);
      }
      return { ...prev, expansions: newExpansions };
    });
  };

  const toggleSpirit = (spirit: Spirit) => {
    setLocalSettings(prev => {
      const exists = prev.selectedSpirits.some(s => s.id === spirit.id);
      if (exists) {
        return { ...prev, selectedSpirits: prev.selectedSpirits.filter(s => s.id !== spirit.id) };
      } else {
        if (prev.selectedSpirits.length < prev.playerCount) {
          return { ...prev, selectedSpirits: [...prev.selectedSpirits, spirit] };
        }
        return prev;
      }
    });
  };

  const setPlayerCount = (num: number) => {
    setLocalSettings(prev => ({
      ...prev,
      playerCount: num,
      selectedSpirits: prev.selectedSpirits.slice(0, num)
    }));
  };

  const availableSpirits = SPIRITS.filter(s =>
    localSettings.expansions.includes(s.expansionId) || s.expansionId === ExpansionId.BASE
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-900/40 backdrop-blur-md p-4 animate-fade-in">
      <div className="bg-parchment-100 border border-stone-300 rounded-2xl w-full max-w-2xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden relative">

        {/* Paper Texture Overlay */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/paper.png')] opacity-40 mix-blend-multiply pointer-events-none" />

        {/* Header */}
        <div className="relative flex items-center justify-between p-6 bg-parchment-200/80 border-b border-stone-300 z-10">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white rounded-lg border border-stone-200 shadow-sm">
              <MapIcon className="w-6 h-6 text-amber-600" />
            </div>
            <h2 className="text-2xl font-serif font-bold text-stone-800">
              {isInitialSetup ? t('settings.title') : t('header.settings')}
            </h2>
          </div>
          {!isInitialSetup && (
            <button onClick={onClose} className="text-stone-500 hover:text-stone-800 transition-colors">
              <X className="w-6 h-6" />
            </button>
          )}
        </div>

        {/* Content */}
        <div className="relative overflow-y-auto flex-1 p-6 space-y-8 z-10 custom-scrollbar">

          {/* Player Count */}
          <section>
            <h3 className="text-stone-500 font-bold uppercase tracking-wider text-xs mb-3 flex items-center gap-2">
              <span className="flex-1 h-px bg-stone-300"></span>
              <span className="whitespace-nowrap">{t('settings.player_count')}</span>
              <span className="flex-1 h-px bg-stone-300"></span>
            </h3>
            <div className="flex gap-2 flex-wrap justify-center">
              {[1, 2, 3, 4, 5, 6].map(num => (
                <button
                  key={num}
                  onClick={() => setPlayerCount(num)}
                  className={`w-12 h-12 rounded-xl font-serif text-xl border-2 transition-all ${localSettings.playerCount === num
                    ? 'bg-teal-600 border-teal-600 text-white shadow-md scale-105'
                    : 'bg-white border-stone-200 text-stone-500 hover:border-teal-400 hover:text-teal-600'
                    }`}
                >
                  {num}
                </button>
              ))}
            </div>
          </section>

          {/* Expansions */}
          <section>
            <h3 className="text-stone-500 font-bold uppercase tracking-wider text-xs mb-3 flex items-center gap-2">
              <span className="flex-1 h-px bg-stone-300"></span>
              <span className="whitespace-nowrap">{t('settings.expansions')}</span>
              <span className="flex-1 h-px bg-stone-300"></span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {EXPANSIONS.map(exp => (
                <button
                  key={exp.id}
                  onClick={() => toggleExpansion(exp.id)}
                  disabled={exp.id === ExpansionId.BASE}
                  className={`flex items-center justify-between p-3 rounded-xl border text-left transition-all shadow-sm ${localSettings.expansions.includes(exp.id)
                    ? 'bg-amber-50 border-amber-300 text-amber-900 ring-1 ring-amber-300'
                    : 'bg-white border-stone-200 text-stone-500 hover:bg-stone-50'
                    } ${exp.id === ExpansionId.BASE ? 'opacity-70 cursor-not-allowed bg-stone-100' : ''}`}
                >
                  <span className="font-medium">{t(`expansions.${exp.id}`)}</span>
                  {localSettings.expansions.includes(exp.id) && <Check className="w-4 h-4 text-amber-600" />}
                </button>
              ))}
            </div>
          </section>

          {/* Spirits */}
          <section>
            <h3 className="text-stone-500 font-bold uppercase tracking-wider text-xs mb-3 flex items-center gap-2">
              <span className="flex-1 h-px bg-stone-300"></span>
              <span className="whitespace-nowrap">
                {t('settings.select_spirits')} <span className="text-teal-600">({localSettings.selectedSpirits.length} / {localSettings.playerCount})</span>
              </span>
              <span className="flex-1 h-px bg-stone-300"></span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {availableSpirits.map(spirit => (
                <button
                  key={spirit.id}
                  onClick={() => toggleSpirit(spirit)}
                  disabled={!localSettings.selectedSpirits.some(s => s.id === spirit.id) && localSettings.selectedSpirits.length >= localSettings.playerCount}
                  className={`text-sm p-3 rounded-lg border text-left transition-all shadow-sm ${localSettings.selectedSpirits.some(s => s.id === spirit.id)
                    ? 'bg-emerald-50 border-emerald-300 text-emerald-900 font-bold'
                    : 'bg-white border-stone-200 text-stone-500 hover:border-emerald-300 hover:text-emerald-700'
                    } ${!localSettings.selectedSpirits.some(s => s.id === spirit.id) && localSettings.selectedSpirits.length >= localSettings.playerCount ? 'opacity-50 grayscale cursor-not-allowed' : ''}`}
                >
                  {t(`spirits.${spirit.id}`)}
                </button>
              ))}
            </div>
          </section>

          {/* Adversary */}
          <section>
            <h3 className="text-stone-500 font-bold uppercase tracking-wider text-xs mb-3 flex items-center gap-2">
              <span className="flex-1 h-px bg-stone-300"></span>
              <span className="whitespace-nowrap">{t('settings.adversary')}</span>
              <span className="flex-1 h-px bg-stone-300"></span>
            </h3>
            <div className="space-y-4">
              <select
                title={t('settings.adversary')}
                className="w-full p-3 rounded-xl border border-stone-200 bg-white shadow-sm"
                value={localSettings.adversary?.id || ''}
                onChange={(e) => {
                  const id = e.target.value;
                  if (!id) {
                    setLocalSettings(prev => ({ ...prev, adversary: undefined }));
                  } else {
                    setLocalSettings(prev => ({ ...prev, adversary: { id, level: 0 } }));
                  }
                }}
              >
                <option value="">{t('settings.none')}</option>
                {ADVERSARIES.filter(a => localSettings.expansions.includes(a.expansionId) || a.expansionId === ExpansionId.BASE).map(a => (
                  <option key={a.id} value={a.id}>{t(`adversaries.${a.id}`)}</option>
                ))}
              </select>

              {localSettings.adversary && (
                <div className="flex flex-wrap gap-2 justify-center">
                  {[0, 1, 2, 3, 4, 5, 6].map(lvl => (
                    <button
                      key={lvl}
                      onClick={() => setLocalSettings(prev => ({ ...prev, adversary: { ...prev.adversary!, level: lvl } }))}
                      className={`w-10 h-10 rounded-lg font-serif border-2 transition-all ${localSettings.adversary?.level === lvl
                        ? 'bg-amber-600 border-amber-600 text-white'
                        : 'bg-white border-stone-200 text-stone-500 hover:border-amber-400'
                        }`}
                    >
                      {lvl}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </section>

          {/* Scenario */}
          <section>
            <h3 className="text-stone-500 font-bold uppercase tracking-wider text-xs mb-3 flex items-center gap-2">
              <span className="flex-1 h-px bg-stone-300"></span>
              <span className="whitespace-nowrap">{t('settings.scenario')}</span>
              <span className="flex-1 h-px bg-stone-300"></span>
            </h3>
            <select
              title={t('settings.scenario')}
              className="w-full p-3 rounded-xl border border-stone-200 bg-white shadow-sm"
              value={localSettings.scenario || ''}
              onChange={(e) => setLocalSettings(prev => ({ ...prev, scenario: e.target.value || undefined }))}
            >
              <option value="">{t('settings.none')}</option>
              {SCENARIOS.filter(s => localSettings.expansions.includes(s.expansionId) || s.expansionId === ExpansionId.BASE).map(s => (
                <option key={s.id} value={s.id}>{t(`scenarios.${s.id}`)}</option>
              ))}
            </select>
          </section>
        </div>

        {/* Footer */}
        <div className="relative p-6 border-t border-stone-300 bg-parchment-200/50 flex justify-end gap-3 z-10">
          {!isInitialSetup && (
            <button
              onClick={onClose}
              className="px-5 py-2 rounded-lg text-stone-500 hover:text-stone-800 hover:bg-stone-200/50 transition-colors font-bold"
            >
              {t('common.cancel')}
            </button>
          )}
          <button
            onClick={() => onSave(localSettings)}
            disabled={localSettings.selectedSpirits.length !== localSettings.playerCount}
            className={`px-8 py-3 rounded-full font-bold shadow-lg transition-all active:scale-95 flex items-center gap-2 ${isInitialSetup
              ? 'bg-gradient-to-r from-amber-600 to-amber-500 text-white hover:shadow-amber-900/20 w-full sm:w-auto justify-center'
              : 'bg-stone-800 text-white hover:bg-stone-700'
              } ${localSettings.selectedSpirits.length !== localSettings.playerCount ? 'opacity-50 cursor-not-allowed grayscale' : ''}`}
          >
            {isInitialSetup ? (
              <>
                <Play className="w-5 h-5 fill-current" />
                {t('common.start_game')}
              </>
            ) : (
              t('common.save')
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsDialog;