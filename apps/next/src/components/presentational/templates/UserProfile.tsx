import { FC } from 'react';
import { IconButton, GridTemplate, GridItem, GridItemWithPic } from '@next/ui';
import { MailIcon, PhoneIcon } from '@heroicons/react/outline';

type Org = {
  id: string;
  orgName?: string;
};

type UserProfileProps = {
  userName: string;
  image: string;
  icon: string;
  description: string;
  orgs: Org[];
};

export const UserProfile: FC<UserProfileProps> = ({ userName, image, icon, description, orgs }) => {
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
                src={image || '/hands_mid-reso.jpg'}
                alt="ユーザーイメージ"
              />
              <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="-mt-12 sm:-mt-16 sm:flex sm:items-end sm:space-x-5">
                  <div className="flex">
                    <img
                      className="h-24 w-24 rounded-full ring-4 ring-white sm:h-32 sm:w-32 bg-yellow-100"
                      src={icon || '/asian_man1.jpg'}
                      alt="ユーザーアイコン"
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
                  <h1 className="text-2xl font-bold text-gray-900 truncate">{userName}</h1>
                </div>
              </div>
            </div>

            <div className="mt-6 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
              <GridTemplate>
                <GridItem label="自己紹介" content={description} colSpan="col-span-2" />
              </GridTemplate>
            </div>

            <div className="mt-8 max-w-5xl mx-auto px-4 pb-12 sm:px-6 lg:px-8">
              <h2 className="text-sm font-medium text-gray-500">所属団体</h2>
              <GridTemplate>
                {orgs
                  ? orgs.map((org) => {
                      return (
                        <div key={org.id.toString()}>
                          <GridItemWithPic name={org.orgName} description={org.id} />
                        </div>
                      );
                    })
                  : null}
              </GridTemplate>
            </div>
          </article>
        </main>
      </div>
    </div>
  );
};
