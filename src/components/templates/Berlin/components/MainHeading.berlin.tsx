interface Props {
    username: string;
    professionalTitle: string;
    profilePicture: string;
    color: string;
    addProfilePicture: boolean;
}
const MainHeading = ({
    username,
    professionalTitle,
    profilePicture,
}: Props) => {
    return (
        <div className='absolute top-[5%] w-full'>
            <div className=' gap-3 grid place-items-center uppercase border-b-[3px] py-7 bg-white border-t-[3px] border-black w-full '>
                <h1 className='font-bold text-6xl'>{username}</h1>
                <p className='tracking-widest uppercase'>{professionalTitle}</p>
            </div>
        </div>
    );
};
