import { Content } from '../layout/Content/Content.tsx';
import { CreatorSummaryTable } from './CreatorSummaryTable.tsx';
import { CreatorSummaryForm } from './CreatorSummaryForm.tsx';
import { useState } from 'react';

export const CreatorSummary = () => {
  const [save, setSave] = useState<boolean>(false);

  return (
    <Content
      title={
        save
          ? 'Dziękujemy za skorzystanie z konfiguratora!'
          : 'Kreator Konfiguracji'
      }
      subtitle={
        save ? 'Zamówienie zostało zapisane' : 'Podsumowanie konfiguracji'
      }
    >
      {save ? (
        <div className={'summary--save'}>
          <p>
            Dziękujemy za skorzystanie z naszego konfiguratora. Mamy nadzieję,
            że proces konfiguracji był intuicyjny i spełnił Twoje oczekiwania.
            Twoje zamówienie zostało pomyślnie zapisane, co pozwala nam
            przystąpić do jego realizacji.
          </p>
          <p>
            Jeśli masz dodatkowe pytania lub chciałbyś wprowadzić zmiany w
            zamówieniu, skontaktuj się z nami. Jesteśmy tutaj, aby pomóc i
            zapewnić, że wszystko zostanie zrealizowane zgodnie z Twoimi
            potrzebami.
          </p>
        </div>
      ) : (
        <>
          <CreatorSummaryForm setSave={setSave} />
          <CreatorSummaryTable />
        </>
      )}
    </Content>
  );
};
