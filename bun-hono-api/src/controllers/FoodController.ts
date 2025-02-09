//import context
import { Context } from 'hono'

//import prisma client
import prisma from "../../prisma/client";

/**
 * Getting all foods
 */
export const getFood = async (c: Context) => {
    try {
        //get all foods
        const food = await prisma.food.findMany({ orderBy: { id: 'desc' } });

        //return JSON
        return c.json({
            statusCode : 200,
            message: 'List Data Food!',
            data: food
        });

    } catch (e: unknown) {
        console.error(`Error getting foods: ${e}`);
    }
}

export async function createFood(c: Context) {
  try {

    //get body request
    const body = await c.req.json();

    //check if title and content is string
    const name   = typeof body['name'] === 'string' ? body['name'] : '';
    const theOriginOfFood = typeof body['theOriginOfFood'] === 'string' ? body['theOriginOfFood'] : '';
    const flavour = typeof body['flavour'] === 'string' ? body['flavour'] : '';

  
    const food = await prisma.food.create({
      data: {
        name: name,
        theOriginOfFood: theOriginOfFood,
        flavour: flavour
      }
    });

    //return JSON
    return c.json({
      statusCode : 201,
      message: 'food Created Successfully!',
      data: food
    });

  } catch (e: unknown) {
    console.error(`Error creating food: ${e}`);
  }
}

export async function getFoodById(c: Context) {
  try {

      // Konversi tipe id menjadi number
      const foodId = parseInt(c.req.param('id'));

      //get food by id
      const food = await prisma.food.findMany({
          where: { id: foodId },
      });

      console.log('Data Of Food: ', food)

      //if food not found
      if (!food) {
          //return JSON
          return c.json({
              statusCode : 404,
              message: 'ID Food Not Found!',
          });
      }

       //return JSON
       return c.json({
        statusCode : 200,
        message: `Detail Data Food By ID : ${foodId}`,
        data: food
        });
  } catch (e: unknown) {
      console.error(`Error finding food: ${e}`);
  }
}

export async function updateFood(c: Context) {
  try {

      // Konversi tipe id menjadi number
      const foodId = parseInt(c.req.param('id'));

      //get body request
      const body = await c.req.json();

      //check if title and content is string
      const name   = typeof body['name'] === 'string' ? body['name'] : '';
      const theOriginOfFood = typeof body['theOriginOfFood'] === 'string' ? body['theOriginOfFood'] : '';
      const flavour = typeof body['flavour'] === 'string' ? body['flavour'] : '';

      //update food with prisma
      const food = await prisma.food.update({
          where: { id: foodId },
          data: {
            name: name,
            theOriginOfFood: theOriginOfFood,
            flavour: flavour
          },
      });

      //return JSON
      return c.json({
          statusCode : 200,
          message: 'food Updated Successfully!',
          data: food
      });

  } catch (e: unknown) {
      console.error(`Error updating food: ${e}`);
  }
}

export async function deleteFood(c: Context) {
  try {

      // Konversi tipe id menjadi number
      const foodId = parseInt(c.req.param('id'));

      //delete food with prisma
      await prisma.food.delete({
          where: { id: foodId },
      });

      //return JSON
      return c.json({
          statusCode : 200,
          message: 'Food Deleted Successfully!',
      });

  } catch (e: unknown) {
      console.error(`Error deleting food: ${e}`);
  }
}