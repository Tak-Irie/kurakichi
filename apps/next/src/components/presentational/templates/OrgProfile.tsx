import { FC, ReactElement } from 'react';
import { SideParts, IconButton, GridTemplate, GridItem, GridItemWithPic } from '@next/ui';
import { MailIcon, PhoneIcon } from '@heroicons/react/outline';
import Image from 'next/image';

type Member = {
  id: string;
  userName?: string;
};

type OrgProfileProps = {
  orgName?: string;
  email?: string;
  phoneNumber?: string;
  location?: string;
  image?: string;
  icon?: string;
  homePage?: string;
  description?: string;
  members?: Member[];
};

const OrgProfile: FC<OrgProfileProps> = (props) => {
  const {
    orgName,
    image,
    icon,
    email,
    phoneNumber,
    location,
    homePage,
    description,
    members,
  } = props;
  return (
    <div className="bg-white">
      <div className="flex-1 relative z-0 flex overflow-hidden">
        <main
          className="flex-1 relative z-0 overflow-y-auto focus:outline-none xl:order-last"
          tabIndex={0}
        >
          <article className="bg-gray-100">
            <div>
              <img
                className="h-32 w-full object-cover lg:h-56"
                src={image || 'hands_mid-reso.jpg'}
                alt="団体イメージ"
              />
              <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="-mt-12 sm:-mt-16 sm:flex sm:items-end sm:space-x-5">
                  <div className="flex">
                    <img
                      className="h-24 w-24 rounded-full ring-4 ring-white sm:h-32 sm:w-32 bg-yellow-100"
                      src={icon || '/logo_temp.png'}
                      alt="団体アイコン"
                    />
                  </div>
                  <div className="mt-6 sm:flex-1 sm:min-w-0 sm:flex sm:items-center sm:justify-end sm:space-x-6 sm:pb-1">
                    <div className="mt-6 flex flex-col justify-stretch space-y-3 sm:flex-row sm:space-y-0 sm:space-x-4">
                      <IconButton label="Message" svgIcon={<MailIcon />} />
                      <IconButton label="Phone" svgIcon={<PhoneIcon />} />
                    </div>
                  </div>
                </div>
                <div className="sm:block mt-6 min-w-0 flex-1">
                  <h1 className="text-2xl font-bold text-gray-900 truncate">{orgName}</h1>
                </div>
              </div>
            </div>

            <div className="mt-6 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
              <GridTemplate>
                <GridItem label="メールアドレス" content={email} />
                <GridItem label="電話番号" content={phoneNumber} />
                <GridItem label="所在地" content={location} />
                <GridItem label="ホームページ" content={homePage} />
                <GridItem label="私達について" content={description} colSpan="col-span-2" />
              </GridTemplate>
            </div>

            <div className="mt-8 max-w-5xl mx-auto px-4 pb-12 sm:px-6 lg:px-8">
              <h2 className="text-sm font-medium text-gray-500">Team members</h2>
              <GridTemplate>
                {members ? (
                  members.map((member) => {
                    return (
                      <div key={member.id.toString()}>
                        <GridItemWithPic name={member.userName} description={member.id} />
                      </div>
                    );
                  })
                ) : (
                  <>
                    <GridItemWithPic name="its name" description="its description" />
                    <GridItemWithPic
                      name="its name"
                      description="its description"
                      imgSrc="https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixqx=bYR969hCec&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    />
                    <GridItemWithPic
                      name="its name"
                      description="its description"
                      imgSrc="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixqx=bYR969hCec&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    />
                    <GridItemWithPic
                      name="its name"
                      description="its description"
                      imgSrc="https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixqx=bYR969hCec&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    />
                  </>
                )}
              </GridTemplate>
            </div>
          </article>
        </main>
      </div>
    </div>
  );
};

export { OrgProfile };
