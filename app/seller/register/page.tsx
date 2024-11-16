import { RegistrationForm } from './_components/registration-form'

const SellerRegister = () => {
    return (
        <div className='w-full max-w-screen-md mx-auto py-6 space-y-6 px-3 md:px-0'>
            <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
                <div className='p-3 space-y-2'>
                    <h2 className="text-2xl sm:text-3xl font-extrabold">
                        Become a Seller Today!
                    </h2>
                    <p className="text-lg sm:text-xl">
                        Join our marketplace and start selling your books all over the country.
                    </p>
                </div>
            </div>

            <RegistrationForm />
        </div>
    )
}

export default SellerRegister
