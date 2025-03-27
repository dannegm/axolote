import { useEffect, useState } from 'react';
import { useLocation } from 'wouter';
import { useMutation } from '@tanstack/react-query';
import { ArrowRight, Loader2 } from 'lucide-react';
import { REGEXP_ONLY_DIGITS } from 'input-otp';

import { randomPick } from '@/modules/core/helpers/arrays';

import useLocalStorage from '@/modules/core/hooks/use-local-storage';
import Loader from '@/modules/core/components/common/loader';

import { Button } from '@/modules/shadcn/ui/button';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/modules/shadcn/ui/input-otp';
import { Alert, AlertDescription } from '@/modules/shadcn/ui/alert';

const SECRET_TOKEN = import.meta.env.NEXT_PUBLIC_SECRET_TOKEN;

const HOSTNAME = 'https://endpoints.hckr.mx/quotes/krystel';

const loginAction = async ({ code }) => {
    const url = `${HOSTNAME}/auth/token`;
    const resp = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-dnn-tracker': SECRET_TOKEN,
        },
        body: JSON.stringify({ code }),
    });

    if (!resp.ok) {
        throw new Error('Error logging in');
    }

    return resp.json();
};

const useLoginAction = options => {
    const mutation = useMutation({
        mutationFn: loginAction,
        ...options,
    });

    return mutation;
};

const hints = [
    'Constraseña de la caja fuerte en Mazatlán.',
    'El año en el que nos conocimos.',
    'Junta las edades que teníamos cuando nos conocimos.',
    'Ultimos 4 dígitos de mi teléfono.',
];

export default function LoginForm() {
    const inputOtpSlotClassname = 'size-16 text-xl';

    const [, navigate] = useLocation();
    const [, setToken] = useLocalStorage('app:tracker', null);

    const [code, setCode] = useState('');
    const [hint, setHint] = useState(randomPick(hints));

    const { mutate, isPending, isError, isSuccess } = useLoginAction({
        onSuccess: data => {
            setToken(data?.token);
            navigate('/krystel');
        },
    });

    const handleLogin = () => {
        mutate({ code });
    };

    useEffect(() => {
        if (!isPending && isError) {
            setCode('');
            setHint(randomPick(hints));
        }
    }, [isPending, isError]);

    return (
        <main className='w-full h-screen flex-center flex-col gap-6'>
            {isSuccess && <Loader className='z-max bg-white/60 backdrop-blur-xs' />}

            <h1 className='font-pacifico text-2xl -mt-32 mb-12 text-center'>Krystel</h1>

            <div>
                <InputOTP
                    maxLength={4}
                    value={code}
                    pattern={REGEXP_ONLY_DIGITS}
                    onChange={setCode}
                    onComplete={handleLogin}
                >
                    <InputOTPGroup>
                        <InputOTPSlot className={inputOtpSlotClassname} index={0} />
                        <InputOTPSlot className={inputOtpSlotClassname} index={1} />
                        <InputOTPSlot className={inputOtpSlotClassname} index={2} />
                        <InputOTPSlot className={inputOtpSlotClassname} index={3} />
                    </InputOTPGroup>
                </InputOTP>
            </div>

            {isError && (
                <Alert className='max-w-72' variant='destructive'>
                    <AlertDescription>Intenta de nuevo con otra contraseña.</AlertDescription>
                </Alert>
            )}

            <p className='max-w-56 py-0.5 px-1 font-mono text-sm text-center rounded-md'>{hint}</p>

            {isPending && (
                <Button size='lg' disabled>
                    <Loader2 className='animate-spin' />
                    Iniciando
                </Button>
            )}

            {!isPending && (
                <Button size='lg' disabled={!code} onClick={handleLogin}>
                    <ArrowRight />
                    Ingresar
                </Button>
            )}
        </main>
    );
}
