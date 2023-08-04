describe('Testing my greeting App' , function(){

    describe("Testing name and language error", function(){
    it("Should return please enter you name and select language when greet button is pressed with no prior inputs" , function(){

        let greeting = Greet()
        greeting.nameAndRadioError()

        assert.equal("Please enter your name and select a language!", greeting.getNameAndRadioError());
    
    });

    })
    describe('Testing name error' , function(){
    it("should return please enter your name when radio is selected and greet is pressed" , function(){
        let greeting = Greet()
        greeting.nameError()

        assert.equal("Please enter your name!", greeting.getNameError());

    });
    })

    describe("Testing radio error", function(){
     it("should return please select a language when no radio is selected", function(){
        let greeting = Greet()
        greeting.radioError()

        assert.equal("Please select a language!", greeting.getRadioError())
     })   
    })

    describe("Testing name already exist error", function(){
        it("should return name already exist when a name has been greeted before", function(){
           let greeting = Greet()
           greeting.nameAlreadyExist()
   
           assert.equal("Name is already greeted!", greeting.getNameAlreadyExist())
        })   
       })

       describe("Testing name not allowed error", function(){
        it("should return name is not allowed if name has numbers or special characters", function(){
           let greeting = Greet()
           greeting.nameNotAllowed()
   
           assert.equal("Numbers and special characters are not allowed!", greeting.getNameNotAllowed())
        })   
       })

        describe("Testing the counter", function(){
        it("should return 2 when two different names are greeted", function(){
           let greeting = Greet()
           greeting.greetings("Zola", "isiXhosa")
           greeting.greetings("Yanga", "English")
   
           assert.equal(2 , greeting.getCounter())
        })  
        })

       describe("Testing greeting functionality", function(){
        it("should return 'Molo, Thabo' when Thabo is entered and isiXhosa is selected", function(){
           let greeting = Greet()
           greeting.greetings("Thabo", "isiXhosa")
   
           assert.equal("Molo, Thabo", greeting.getGreeting())
        }) 
        it("should return 'Hello, Huey' when Huey is entered and English is selected", function(){
            let greeting = Greet()
            greeting.greetings("Huey", "English")
    
            assert.equal("Hello, Huey", greeting.getGreeting())
         })  
        it("should return 'Hallo, Tristian' when Tristian is entered and Afrikaans is selected", function(){
            let greeting = Greet()
            greeting.greetings("Tristian", "Afrikaans")
    
            assert.equal("Hallo, Tristian", greeting.getGreeting())
         })  
        })

       describe("Testing the counter", function(){
        it("should return 9 when four more names are greeted", function(){
           let greeting = Greet()
           greeting.greetings("Zozi", "isiXhosa")
           greeting.greetings("Yona", "English")
           greeting.greetings("Zizo", "isiXhosa")
           greeting.greetings("Nomsa", "English")

           
           assert.equal(9, greeting.getCounter())
        })  
        })
        describe("Testing A greeted name", function(){
            it("should return 9 when a name is greeted again", function(){
               let greeting = Greet()
               greeting.greetings("Zozi", "isiXhosa")
               greeting.greetings("Yona", "English")
               greeting.greetings("Zizo", "isiXhosa")
               assert.equal(9, greeting.getCounter())
            }) 

        })

        describe("Testing the reset button", function(){
            it("should return 0 when the reset button is clicked", function(){
               let greeting = Greet()

               greeting.clearCounter()
               assert.equal(0, greeting.getClearedCounter2())
            }) 
            it("should return you have cleared the counter when the reset button is clicked", function(){
                let greeting = Greet()
 
                greeting.clearedCounter()
                assert.equal("You have cleared the counter!", greeting.getClearedCounter())
             }) 

        })

        describe("Testing greeting after clearing", function(){
            it("should return 1 when a name is greeted", function(){
               let greeting = Greet()
               greeting.greetings("Zozi", "isiXhosa")
               assert.equal(1, greeting.getCounter())
            }) 

            it("should return 5 when 4 more names are greeted", function(){
                let greeting = Greet()
                greeting.greetings("lisa", "isiXhosa")
                greeting.greetings("loyiso", "isiXhosa")
                greeting.greetings("dinga", "isiXhosa")
                greeting.greetings("bonga", "isiXhosa")
                assert.equal(5, greeting.getCounter())
             }) 
        })

})