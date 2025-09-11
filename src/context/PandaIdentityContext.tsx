import React, {
  createContext as createPandaContext,
  useState as usePandaState,
  useEffect as usePandaEffect,
  useMemo as usePandaMemo,
  type ReactNode
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Тип користувацького профілю
type TPandaIdentity = Record<string, unknown> | null;

interface IPandaIdentityCtx {
  pandaIdentity: TPandaIdentity;
  updatePandaIdentity: (data: TPandaIdentity) => Promise<void>;
  resetPandaIdentity: () => Promise<void>;
}

// Контекст за замовчуванням
export const PandaIdentityContext = createPandaContext<IPandaIdentityCtx>({
  pandaIdentity: null,
  updatePandaIdentity: async () => {},
  resetPandaIdentity: async () => {},
});

type TPandaProviderProps = { children: ReactNode };

export function PandaIdentityProvider({ children }: TPandaProviderProps) {
  const [pandaIdentityData, setPandaIdentityData] = usePandaState<TPandaIdentity>(null);

  // При монтуванні підтягуємо збережену ідентичність
  usePandaEffect(() => {
    let isDisposed = false;

    const fetchPandaIdentity = async () => {
      try {
        const storedValue = await AsyncStorage.getItem('panda_identity_key');
        if (!isDisposed && storedValue) {
          setPandaIdentityData(JSON.parse(storedValue));
        }
      } catch (err) {
        if (__DEV__) console.warn('PandaIdentityContext: load error', err);
      }
    };

    fetchPandaIdentity();
    return () => { isDisposed = true; };
  }, []);

  // Функція збереження/видалення
  const persistPandaIdentity = async (payload: TPandaIdentity) => {
    setPandaIdentityData(payload);
    try {
      if (payload) {
        await AsyncStorage.setItem('panda_identity_key', JSON.stringify(payload));
      } else {
        await AsyncStorage.removeItem('panda_identity_key');
      }
    } catch (err) {
      if (__DEV__) console.warn('PandaIdentityContext: save error', err);
    }
  };

  // Оновлення
  const updatePandaIdentity = async (newData: TPandaIdentity) => {
    await persistPandaIdentity(newData);
  };

  // Скидання
  const resetPandaIdentity = async () => {
    await persistPandaIdentity(null);
  };

  // Значення контексту
  const pandaCtxValue = usePandaMemo(() => ({
    pandaIdentity: pandaIdentityData,
    updatePandaIdentity,
    resetPandaIdentity,
  }), [pandaIdentityData]);

  return (
    <PandaIdentityContext.Provider value={pandaCtxValue}>
      {children}
    </PandaIdentityContext.Provider>
  );
}
