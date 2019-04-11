const Koa = require('koa');
const app = new Koa();

const knex = require('knex')({
    client: 'mysql',
    connection: {
      host : '127.0.0.1',
      user : 'root',
      password : '1',
      database : 'ltd'
    }
});

const findUser = async (context, next) => {

    if(!context.query.name){
        context.body = "khong nhap du lieu la an dam khong truot phat nao"
    }else {
        await next(); 
    }
    
}

const run = async (context) => {
    const result = await knex.select('*').from('thongtin').where('name', 'like', '%'+context.query.name+'%');
    context.body = result || {message: 'not found'};
}


app.use(findUser);
app.use(run);
app.listen(1704);