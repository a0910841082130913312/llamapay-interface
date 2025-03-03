import { useNetworkProvider } from 'hooks';
import { useTranslations } from 'next-intl';
import { useAccount } from 'wagmi';

interface FallbackProps {
  isLoading?: boolean;
  isError: boolean;
  noData: boolean;
  type: 'streams' | 'history' | 'balances' | 'payeesList';
}

const Fallback = ({ isLoading, isError, noData, type }: FallbackProps) => {
  const [{ data: accountData }] = useAccount();

  const { unsupported } = useNetworkProvider();
  const t0 = useTranslations('Common');
  const t1 = useTranslations('Balances');
  const t2 = useTranslations('Streams');
  const t3 = useTranslations('History');
  const t4 = useTranslations('Payees');

  let errorMessage = t0('error');
  let emptyDataMessage = '';
  let defaultMessage: string | null = null;

  switch (type) {
    case 'balances':
      errorMessage = t1('error');
      emptyDataMessage = t1('noData');
      defaultMessage = !accountData ? t1('connectWallet') : unsupported ? t0('networkNotSupported') : null;
      break;
    case 'streams':
      errorMessage = t2('error');
      emptyDataMessage = t2('noData');
      defaultMessage = !accountData ? t2('connectWallet') : unsupported ? t0('networkNotSupported') : null;
      break;
    case 'history':
      errorMessage = t3('error');
      emptyDataMessage = t3('noData');
      defaultMessage = !accountData ? t3('connectWallet') : unsupported ? t0('networkNotSupported') : null;
      break;
    case 'payeesList':
      errorMessage = t4('error');
      emptyDataMessage = t4('noData');
      defaultMessage = !accountData ? t4('connectWallet') : unsupported ? t0('networkNotSupported') : null;
      break;
  }

  return (
    <div className="flex h-14 w-full items-center justify-center rounded border border-dashed border-[#626262] text-xs font-semibold">
      {defaultMessage ||
        (isLoading ? null : isError ? <p>{errorMessage}</p> : noData ? <p>{emptyDataMessage}</p> : null)}
    </div>
  );
};

export default Fallback;
