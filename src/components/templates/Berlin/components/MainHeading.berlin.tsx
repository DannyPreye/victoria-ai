interface Props {
    username: string;
    professionalTitle: string;
    profilePicture: string;
    color: string;
    addProfilePicture: boolean;
    professionalSummary?: string;
}
const MainHeading = ({
    username,
    professionalTitle,
    profilePicture,
    professionalSummary,
}: Props) => {
    return (
        <div className='absolute top-[5%] gap-8 grid w-full'>
            <div className=' gap-3 grid place-items-center uppercase border-b-[3px] py-7 bg-white border-t-[3px] border-black w-full '>
                <h1 className='font-bold text-6xl'>{username}</h1>
                <p className='tracking-widest uppercase mx-auto '>
                    {professionalTitle}
                </p>
            </div>
            {professionalSummary && (
                <p className='mx-auto w-[70%] bg-gray-200 p-4 text-justify'>
                    {professionalSummary}
                </p>
            )}
        </div>
    );
};

export default MainHeading;
