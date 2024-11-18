import React from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';

// Define a mapping of meal types to icons and colors
const mealIcons = {
  'Continental Breakfast': { icon: 'fa-coffee', color: 'bg-gradient-to-r from-blue-500 to-blue-400' },
  'Buffet Breakfast': { icon: 'fa-bacon', color: 'bg-gradient-to-r from-green-500 to-green-400' },
  'By the Menu': { icon: 'fa-utensils', color: 'bg-gradient-to-r from-yellow-500 to-yellow-400' },
  'Half Board': { icon: 'fa-concierge-bell', color: 'bg-gradient-to-r from-orange-500 to-orange-400' },
  'All-Inclusive': { icon: 'fa-glass-cheers', color: 'bg-gradient-to-r from-red-500 to-red-400' },
};

const aggregateMealsData = (data) => {
  const aggregatedData = data.reduce((acc, current) => {
    const existingMeal = acc.find(item => item.Meal === current.Meal);
    if (existingMeal) {
      existingMeal.total_room_revenue += current.total_room_revenue;
    } else {
      acc.push({ ...current });
    }
    return acc;
  }, []);
  
  return aggregatedData;
};

const MealsSpendCard = ({ darkMode, mealsData }) => {
  const aggregatedMealsData = aggregateMealsData(mealsData);
  const maxRevenue = Math.max(...aggregatedMealsData.map(meal => meal.total_room_revenue));

  return (
    <div className={`p-4 rounded-lg shadow-xl transition-all transform hover:scale-105 h-80 ${darkMode ? 'bg-gray-800 text-gray-200' : 'bg-white text-gray-900'} overflow-hidden`}>
      <div className="flex items-center mb-4">
        <i className={`fas fa-utensils mr-2 text-xl ${darkMode ? 'text-white' : 'text-gray-700'}`}></i>
        <span className="text-lg font-semibold">Spend by Meal Type</span>
        <span className="ml-auto text-xs font-light text-gray-500">{'Dec 2024'}</span>
      </div>
      <div className="space-y-3">
        {aggregatedMealsData.map((meal) => {
          const percentageWidth = (meal.total_room_revenue / maxRevenue) * 100;
          const { icon, color } = mealIcons[meal.Meal] || { icon: 'fa-utensils', color: 'bg-gradient-to-r from-gray-500 to-gray-400' };

          return (
            <div key={meal.Meal} className="flex items-center justify-between">
              <div className="flex items-center w-1/3">
                <div className={`w-7 h-7 rounded-full flex items-center justify-center ${color} shadow-md`}>
                  <i className={`fas ${icon} text-white text-sm`}></i>
                </div>
                <span className="ml-3 text-xs font-medium">{meal.Meal}</span>
              </div>
              <div className="flex items-center w-2/3">
                <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden mr-2 ml-2">
                  <div className={`h-full ${color} rounded-full transition-all duration-500`} style={{ width: `${percentageWidth}%` }}></div>
                </div>
                <span className="text-sm font-semibold">{meal.total_room_revenue.toFixed(2)}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MealsSpendCard;
