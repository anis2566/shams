"use client"

import { useState } from "react"

import {
    InputOTP,
    InputOTPGroup,
    InputOTPSeparator,
    InputOTPSlot,
} from "@/components/ui/input-otp"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { useVerifyForgotPasswordMutation } from "../../mutation";

interface Props {
    id: string;
}

export const VerifyForm = ({ id }: Props) => {
    const [value, setValue] = useState<string>("")

    const { mutate: verifyForgotPassword, isPending } = useVerifyForgotPasswordMutation();

    const handleComplete = () => {
        verifyForgotPassword({ id, code: value });
    }

    return (
        <Card className="mx-auto max-w-sm">
            <CardHeader className="space-y-1 text-center">
                <CardTitle className="text-2xl font-bold">Verify</CardTitle>
                <CardDescription>Enter the verification code sent to your email.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-2 mx-auto flex justify-center">
                    <InputOTP
                        maxLength={6}
                        value={value}
                        onChange={(value: string) => setValue(value)}
                        onComplete={handleComplete}
                        disabled={isPending}
                        autoFocus
                    >
                        <InputOTPGroup>
                            <InputOTPSlot index={0} />
                            <InputOTPSlot index={1} />
                            <InputOTPSeparator />
                            <InputOTPSlot index={2} />
                            <InputOTPSlot index={3} />
                            <InputOTPSeparator />
                            <InputOTPSlot index={4} />
                            <InputOTPSlot index={5} />
                        </InputOTPGroup>
                    </InputOTP>
                </div>
            </CardContent>
        </Card>
    )
}