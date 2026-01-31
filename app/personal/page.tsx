import PhotoWall from "app/components/PhotoWall";

const kitchenPhotos = [
  { 
    src: "/kitchen/table.jpg", 
    title: "Ingredients for Italian Cuisine", 
    introduction: "Turn up the stove and let's do Hell's kitchen!" 
  },
  { 
    src: "/kitchen/IMG_7425.JPG", 
    title: "First time baking Scone", 
    introduction: "Doesn't even resemble but tastes good." 
  },
  {
    src: "/kitchen/steak1.jpg",
    title: "Steak & Doubled Eggs", 
    introduction: "It's all about protein, mate!" 
  },
  { 
    src: "/kitchen/bruschetta.jpg", 
    title: "Fried Octopus, mashed potatoes & bruschetta", 
    introduction: "The plating should look better next time..." 
  },
  {
    src: "/kitchen/pasta.jpg",
    title: "Authentic Carbonara", 
    introduction: "NO CREAM for the sauce!!! Just yolk & Parmesan." 
  },
  { 
    src: "/kitchen/steak2.jpg", 
    title: "The Dining Setup", 
    introduction: "I love mushroom & asparagus!" 
  },
];

const StjohnPhotos = [
  { 
    src: "/stjohn/duty.jpg", 
    title: "Duty Photos", 
    introduction: "" 
  },
  { 
    src: "/stjohn/passingout1.JPEG", 
    title: "Passing-out Parade", 
    introduction: "Attending 2024 Passing-out Parade after completing new members' basic training course. Ready to serve the community!" 
  },
  {
    src: "/stjohn/remembance.JPG",
    title: "Lest We Forget", 
    introduction: "Attending 2025 Remembrance Day Service at the St. John's Memorial, Hong Kong Island. In memory of all commonwealth soldiers who bravely defended Hong Kong during WWII and the sacrificed St. John Ambulance veterans." 
  },
  { 
    src: "/stjohn/duty2.jpg", 
    title: "Duty Photos", 
    introduction: "" 
  },
  {
    src: "/stjohn/training1.jpg",
    title: "Training Moments", 
    introduction: "" 
  },
  { 
    src: "/stjohn/training2.jpg", 
    title: "Training Moments", 
    introduction: "" 
  },
];


export default function PersonalPage() {
  return (
    <section className="mx-auto mt-6 max-w-6xl px-6 md:px-[50px] pb-24">
      
      {/* --- Melvin's Kitchen Section --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 mb-24 items-stretch">
        {/* 左侧文字：决定高度的主导方 */}
        <div className="flex flex-col justify-start">
          <div className="mb-6">
            <h2 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
              Melvin's kitchen
            </h2>
            <div className="h-1 w-12 bg-[#41e0e2] mt-2"></div>
          </div>
          <div className="text-gray-600 dark:text-gray-400 leading-relaxed space-y-4">
            <p>
              Cooking and experimenting with new recipies is my way of unwinding after a long day of coding!
            </p>
            <p>
              I'm especially obsessed with Italian and French cuisine, as well as British food & desserts. 
              I occasionally cook my hometown signature - Sichuan hotpot when treating new neighbors and friends.

              From perfecting the emulsion of a traditional Carbonara to testing the limits of the oven with homemade scones, the kitchen is my secondary lab.
            </p>
            <p className="hidden md:block">
              As the quote says: "Nothing here is vegetarian." Bon appétit!
            </p>
          </div>
        </div>

        {/* 右侧图片墙：高度跟随者 */}
        <div className="w-full h-full min-h-[200px] mt-8 md:mt-0">
          <PhotoWall photos={kitchenPhotos} />
        </div>
      </div>

      {/* --- Social Responsibilities Section --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-stretch">
        {/* 左侧文字 */}
        <div className="flex flex-col justify-start">
          <div className="mb-6">
            <h2 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
              Commitments in First Aid
            </h2>
            <div className="h-1 w-12 bg-[#41e0e2] mt-2"></div>
          </div>
          <div className="text-gray-600 dark:text-gray-400 leading-relaxed space-y-4">
            <p>
              Since 2024, I have been a member of the Hong Kong St. John Ambulance 
              Brigade. It's more than just a volunteer role; it's a commitment 
              to the well-being of our society.
            </p>
            <p>
              During my service, I take the compulsory annual re-examinations for first aid & AED provider examinations held by Hong Kong St. John Ambulance. 
              I was also trained with other courses provided, including Prehospital Trauma Life Support (PHTLS) and home nursing.
              Additionally, the foot drill training has taught me the value of discipline, as well as the importance of preserving the long-standing traditions.
            </p>
          </div>
        </div>

        {/* 右侧图片墙 */}
        <div className="w-full h-full min-h-[200px] mt-8 md:mt-0">
          <PhotoWall photos={StjohnPhotos} />
        </div>
      </div>

    </section>
  );
}