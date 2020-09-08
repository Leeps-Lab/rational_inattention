from otree.api import Currency as c, currency_range
from ._builtin import Page, WaitPage
from .models import Constants
from .models import Group
from .models import parse_config
from . import parser as parser_py


class MainPage(Page):
    form_model = 'player'
    form_fields = ['width', 'cost', 'm_low', 'm_high', 'low_val', 'high_val', 'bid_price', 'ask_price', 'bought', 'sold', 'round_payoff']

    # called 2-3 times per round
    def is_displayed(self):
        # print('is_displayed', self.subsession.config)
        # Finish -> self.subsession.config is None, 
        # if self.subsession.config is None:
        #     print('finished all rounds! calling parser.py:')
        #     msg = parser_py.test()
        #     print('pages.py: ', msg)
        return self.subsession.config is not None

    def vars_for_template(self):
        return {
            'round_num': self.subsession.config.get('round'),
            'g': self.subsession.get_g(),
            'k': self.subsession.get_k(),
            'm': self.subsession.get_m(),
            'y': self.subsession.get_y(),
            'q': self.subsession.get_q(),
            'expected_value': self.subsession.get_expected_value(),
            'default': self.subsession.get_default(),
            'buy_option': self.subsession.get_buy_option(),
            'sell_option': self.subsession.get_sell_option(),
        }

class ResultsWaitPage(WaitPage):
    pass


class Results(Page):
    def vars_for_template(self):
        pass

page_sequence = [MainPage]
