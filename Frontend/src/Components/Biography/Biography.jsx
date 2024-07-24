import React from "react"

export const Biography = ({ imageUrl }) => {
    return (
        <>
            <section className="container-biography w-full h-auto flex">

                <div className="banner w-1/2 flex justify-center items-center">
                    <img src={imageUrl} alt="whoever" className="h-[500px]" />
                </div>

                <div className="banner w-1/2 px-6">
                    <p>Biography</p>
                    <h3 className="font-semibold text-xl mt-1 mb-1">Who We Are</h3>
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus
                        blanditiis sequi aperiam. Debitis fugiat harum ex maxime illo
                        consequatur mollitia voluptatem omnis nihil nesciunt beatae esse
                        ipsam, sapiente totam aspernatur porro ducimus aperiam nisi. Ex
                        magnam voluptatum consectetur reprehenderit fugiat recusandae aut
                        similique illum natus velit, praesentium nostrum nesciunt. Deleniti,
                        nesciunt laboriosam totam iusto!
                    </p>
                    <p>We are all in 2024!</p>
                    <p>We are working on a MEARN STACK PROJECT.</p>
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores
                        assumenda exercitationem accusamus sit repellendus quo optio dolorum
                        corporis corrupti. Quas similique vel minima veniam tenetur
                        obcaecati atque magni suscipit laboriosam! Veniam vitae minus nihil
                        cupiditate natus provident. Ex illum quasi pariatur odit nisi
                        voluptas illo qui ipsum mollitia. Libero, assumenda?
                    </p>
                    <p>Lorem ipsum dolor sit amet!</p>
                    <p>Coding is fun!</p>
                </div>

            </section>
        </>
    );
};
